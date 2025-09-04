/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import React, { useMemo, useState } from "react";
import { usePostDetailQuery } from "../../../../querys/post/usePostDetailQuery";
import { useParams } from "react-router-dom";
import usePrincipalQuery from "../../../../querys/auth/usePrincipalQuery";
import { useAllPostCommentQuery } from "../../../../querys/post/useAllPostCommentQuery";
import { usePostCommentUpdateQuery } from "../../../../querys/post/usePostCommentUpdateQuery";
import { usePostCommentDeleteQuery } from "../../../../querys/post/usePostCommentDelete";
import { usePostCommentAddQuery } from "../../../../querys/post/usePostCommentAddQuery";

// 이미지 url을 한글이든 영어든 띄어쓰기든 요청 가능한 형태로 바꿔줌.
function normalizeUrl(originUrl) {
  let v = originUrl.replace(/^http:\/\/\/+/, "http://");
  try {
    const url = new URL(v);
    url.pathname = url.pathname
      .split("/")
      .map((s) => encodeURIComponent(decodeURIComponent(s)))
      .join("/");
    return url.toString();
  } catch {
    return encodeURI(v);
  }
}

// XSS 피싱 방지
function sanitizeHref(href) {
  try {
    const url = new URL(href, window.location.origin);
    if (url.protocol === "http:") return url.toString();
  } catch {}
  return "#";
}

// content 안의 [img-N]을 <img /> 태그로 치환
function textToNodes(text, imgMap, keyGen) {
  const out = [];
  const re = /(\[img-(\d+)\])/g;

  let last = 0;
  let m;

  while ((m = re.exec(text)) !== null) {
    const before = text.slice(last, m.index);
    if (before) out.push(before); // 문자열은 React가 자동 이스케이프

    const n = Number(m[2]);
    const src = imgMap[n];
    if (src) {
      out.push(
        <img
          key={`img-${keyGen()}`}
          src={normalizeUrl(src)}
          alt={`img-${n}`}
          onError={(e) => {
            const enc = encodeURI(src);
            if (e.currentTarget.src !== enc) e.currentTarget.src = enc;
          }}
          style={{ maxWidth: "100%", display: "block", margin: "12px 0" }} // 선택
        />
      );
    }
    last = re.lastIndex;
  }

  const tail = text.slice(last);
  if (tail) out.push(tail);

  // 매치가 하나도 없으면 원문 텍스트 반환
  return out.length ? out : [text];
}

// HTML 태그를 React Node로 변환
function htmlToReactNodes(html, imgMap) {
  if (!html) return null;

  const allowed = new Set([
    "p",
    "br",
    "strong",
    "em",
    "u",
    "s",
    "blockquote",
    "code",
    "pre",
    "ol",
    "ul",
    "li",
    "h1",
    "h2",
    "h3",
    "span",
    "a",
    "div",
  ]);

  let key = 0;
  const keyGen = () => key++; // 태그마다 고유 번호를 저장해서 -> 꼬이지 않도록

  // 문자열 html을 브라우저의 DOM 트리로 파싱(노드로)
  const doc = new DOMParser().parseFromString(html, "text/html");

  // DOM 트리를 재귀로 순환하는 함수
  const walk = (node) => {
    const T = node.nodeType;

    // 텍스트 노드를 토큰으로 치환
    if (T === Node.TEXT_NODE) {
      return textToNodes(node.nodeValue || "", imgMap, keyGen);
    }

    if (T === Node.ELEMENT_NODE) {
      const tag = node.tagName.toLowerCase();

      // 위 allowed에서 허용하지 않은 자식은 통과
      if (!allowed.has(tag)) {
        const children = Array.from(node.childNodes).flatMap(walk);
        return children;
      }

      // 자식 우선 변환 (최상단붙터 돌려서 리액트 노드 배열 생성)
      const children = Array.from(node.childNodes).flatMap(walk);

      if (tag === "br") return <br key={`br-${keyGen()}`} />;
      if (tag === "a") {
        const href = sanitizeHref(node.getAttribute("href") || "");
        return (
          <a
            key={`a-${keyGen()}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {children}
          </a>
        );
      }

      // 기본 요소
      const props = { key: `${tag}-${keyGen()}` };
      return React.createElement(tag, props, ...children);
    }

    // 기타 다른 노드는 무시
    return null;
  };

  // body 아래 노드들은 walk로 html로 만들어줌.
  return Array.from(doc.body.childNodes).flatMap((n) => walk(n));
}

function PostBody({ content = "", imgs = [] }) {
  const imgMap = useMemo(() => {
    const m = {};
    imgs.forEach((img, i) => {
      const bySeq = typeof img.seq === "number" ? img.seq - 1 : i;
      m[bySeq] = img.postImgUrl;
    });
    return m;
  }, [imgs]);

  const nodes = useMemo(
    () => htmlToReactNodes(content, imgMap),
    [content, imgMap]
  );
  return <>{nodes}</>;
}

function PostDetail(props) {
  const postIds = useParams()["*"] ?? "";
  const boardKey = postIds.split("/")[0];
  const postId = Number(postIds.split("/")[1]);
  const postDetail = usePostDetailQuery(boardKey, postId);
  const post = postDetail.data?.data?.body;

  const principalQuery = usePrincipalQuery();
  const currentUserId = principalQuery.data?.data?.body.user.userId ?? null;

  const [commentInput, setCommentInput] = useState(""); // 댓글 입력값 저장
  const commentQuery = useAllPostCommentQuery(boardKey, postId);
  const comments = commentQuery?.data?.data?.body || [];
  console.log(comments);
  const [isModify, setIsModify] = useState(-1);
  const [modifyInput, setModifyInput] = useState("");
  const { mutateAsync: addCommentQuery, isPaused: isAdding } =
    usePostCommentAddQuery(boardKey, postId);
  const updateCommentQuery = usePostCommentUpdateQuery(boardKey, postId);
  const deleteCommentQuery = usePostCommentDeleteQuery(boardKey, postId);

  // 날짜
  const fmt = (date) => (date ? new Date(date).toLocaleString() : "-");
  if (!post || !postId) return null;

  const handleAddCommentOnClick = async (commentLevel) => {
    const text = commentInput.trim();
    if (!currentUserId) return alert("로그인 후 댓글 작성이 가능합니다.");
    if (!text) return;

    await addCommentQuery({ commentContent: text, commentLevel: commentLevel });
    setCommentInput("");
  };

  const handleAddCommentOnKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleAddCommentOnClick();
    }
  };

  const canEditOrDelete = (e) => {
    const ownerId = e?.user?.userId ?? e?.userId;
    return !!currentUserId && currentUserId === ownerId;
  };

  const handleModifyOnClick = (comment) => {
    setIsModify(comment.postCommentId);
    setModifyInput(comment.commentContent);
  };

  const handleModifySaveOnClick = async (postCommentId) => {
    const text = modifyInput;
    if (!text) return;
    await updateCommentQuery.mutateAsync({ postCommentId, commentContent: text });
    setIsModify(-1);
    setModifyInput("");
  };

  const handleModifyCancelOnClick = () => { 
    setIsModify(-1); 
    setModifyInput(""); 
  };

  // 삭제
  const handleDeleteCommentOnClick = async (postCommentId) => {
    if (!confirm("정말 이 댓글을 삭제할까요?")) return;
    console.log("delete parameter", { boardKey, postId, postCommentId });

    await deleteCommentQuery.mutateAsync({ postCommentId });
  };

  return (
    <div css={[s.container, s.darkMode]}>
      {!!post && (
        <>
          <div css={s.header}>
            <h1 css={s.title}>
              <span css={s.titleText}>{post.postTitle}</span>
            </h1>
            <div css={s.meta}>
              <span>작성자 : {post.user?.userNickName ?? "알 수 없음"}</span>
              <span css={s.dot} />
              <span>작성일 : {fmt(post.createdAt)}</span>
            </div>
            <div css={s.stats}>
              <span css={s.fill}>조회 : {post.viewCount}</span>
              <span css={s.fill}>좋아요 : {post.likeCount}</span>
              <span css={s.fill}>댓글 수 : {post.commentCount}</span>
            </div>
          </div>

          <hr css={s.divider} />

          <section css={[s.content, s.darkMode]}>
            <PostBody content={post.postContent} imgs={post.postImgs || []} />
          </section>

          <hr css={s.divider} />

          {/* 댓글 입력 */}
          <div css={s.commentWriteBox}>
            <textarea
              css={s.commentTextarea}
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              onKeyDown={handleAddCommentOnKeyDown}
              placeholder={
                currentUserId
                  ? "댓글을 입력하세요..."
                  : "로그인 후 댓글 작성 가능"
              }
              disabled={!currentUserId || isAdding}
              rows={3}
              maxLength={1000}
            />
            <div css={s.commentActions}>
              <span css={s.counter}>{commentInput.length}/1000</span>
              <button
                css={s.btnPrimary}
                onClick={() => handleAddCommentOnClick(0)}
                disabled={!currentUserId || !commentInput.trim() || isAdding}
              >
                {isAdding ? "등록중..." : "등록"}
              </button>
            </div>
          </div>

          <ul css={s.commentList}>
            {comments.map((c) => (
              <li key={c.postCommentId} css={s.commentItem}>
                <div css={s.commentHeader}>
                  <span css={s.commentAuthor}>
                    {c.user?.userNickName ?? "익명"}
                  </span>
                  <span css={s.commentDot} />
                  <span css={s.commentDate}>{fmt(c.createdAt)}</span>
                </div>

                {/* 내용 or 수정폼 */}
                {isModify === c.postCommentId ? (
                  <div>
                    <textarea
                      css={s.commentTextarea}
                      value={modifyInput}
                      onChange={(e) => setModifyInput(e.target.value)}
                      rows={3}
                      maxLength={1000}
                    />
                    <div css={s.commentActions}>
                      <button
                        css={s.btnPrimary}
                        onClick={() => handleModifySaveOnClick(c.postCommentId)}
                        disabled={updateCommentQuery.isPending}
                      >
                        {updateCommentQuery.isPending ? "저장중..." : "저장"}
                      </button>
                      <button
                        css={s.btnGhost}
                        onClick={handleModifyCancelOnClick}
                        disabled={updateCommentQuery.isPending}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <p css={s.commentContent}>{c.commentContent}</p>
                )}

                {/* 본인 댓글일 때만 버튼 */}
                {canEditOrDelete(c) && isModify !== c.postCommentId && (
                  <div css={s.commentActions}>
                    <button
                      css={s.btnGhost}
                      onClick={() => handleModifyOnClick(c)}
                    >
                      수정
                    </button>
                    <button
                      css={s.btnDanger}
                      onClick={() =>
                        handleDeleteCommentOnClick(c.postCommentId)
                      }
                      disabled={deleteCommentQuery.isPending}
                    >
                      {deleteCommentQuery.isPending ? "삭제중..." : "삭제"}
                    </button>
                  </div>
                )}
              </li>
            ))}
            {!comments.length && (
              <li css={s.commentEmpty}>아직 댓글이 없어요.</li>
            )}
          </ul>
        </>
      )}
    </div>
  );
}

export default PostDetail;
