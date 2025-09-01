/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import React, { useMemo, useState } from "react";
import { usePostDetailQuery } from "../../../../querys/post/usePostDetailQuery";
import { useParams } from "react-router-dom";
import usePrincipalQuery from "../../../../querys/auth/usePrincipalQuery";

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

  // 날짜
  const fmt = (date) => (date ? new Date(date).toLocaleString() : "-");
  if (!post || !postId) return null;

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
    
        </>
      )}
    </div>
  );
}

export default PostDetail;
