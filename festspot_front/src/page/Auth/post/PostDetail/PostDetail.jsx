/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePostDetailQuery } from "../../../../querys/post/usePostDetailQuery";
import { getQuillContent } from "../../../../utils/getQuillContent";
import {
  FaHeart,
  FaRegHeart,
  FaRegEye,
  FaRegCommentDots,
  FaRegComments,
} from "react-icons/fa";
import PostComment from "../../../../components/post/PostComment/PostComment";
import { useQueryClient } from "@tanstack/react-query";
import { reqPostDislike, reqPostLike } from "../../../../api/postApi";
import usePrincipalQuery from "../../../../querys/auth/usePrincipalQuery";
<<<<<<< HEAD
import Swal from "sweetalert2";
=======
import { useAllPostCommentQuery } from "../../../../querys/post/useAllPostCommentQuery";
import { usePostCommentUpdateQuery } from "../../../../querys/post/usePostCommentUpdateQuery";
import { usePostCommentDeleteQuery } from "../../../../querys/post/usePostCommentDelete";
import { usePostCommentAddQuery } from "../../../../querys/post/usePostCommentAddQuery";
>>>>>>> ea22c0b60afac2259fb4a217824cd6c2052c3ff2

function PostDetail2(props) {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userInfo = usePrincipalQuery().data?.data?.body?.user;

  const boardKey = pathname.split("/")[2];
  const postId = pathname.split("/")[3];

  const postDetailQuery = usePostDetailQuery(boardKey, postId);
  const postDetail = postDetailQuery.data?.data?.body;

  const postContent = !!postDetail
    ? getQuillContent(postDetail.postContent, postDetail.postImgs)
    : "<p><br></p>";

  console.log(postDetail, userInfo.userId);

  const handleLikeOnClick = async (e) => {
    try {
      !!postDetail.isLike
        ? (await reqPostDislike(postId),
          queryClient.setQueryData(["post", boardKey, postId], (prev) => ({
            ...prev,
            data: {
              ...prev.data,
              body: {
                ...prev.data.body,
                likeCount: prev.data.body.likeCount - 1,
                isLike: false,
              },
            },
          })))
        : (await reqPostLike(postId),
          queryClient.setQueryData(["post", boardKey, postId], (prev) => ({
            ...prev,
            data: {
              ...prev.data,
              body: {
                ...prev.data.body,
                likeCount: prev.data.body.likeCount + 1,
                isLike: true,
              },
            },
          })));
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: error.response.data.body,
        text: error.response.data.message,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  const handleRewriteOnClick = (e) => {
    navigate("/board/write", {
      state: {
        rewritePostId: postDetail.postId,
        retitle: postDetail.postTitle,
        rewriteContents: postContent,
      },
    });
  };

<<<<<<< HEAD
  const handleDeleteOnClick = (e) => {};
=======
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
>>>>>>> ea22c0b60afac2259fb4a217824cd6c2052c3ff2

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
    <>
      {!!postDetail && (
        <>
          <div css={s.postDetailLayout}>
            <div css={s.titleContainer}>
              <h2>{postDetail.postTitle}</h2>
              <div css={s.postInfoContainer}>
                <div css={s.profileContainer}>
                  <div css={s.profileImg}>
                    <img src={postDetail.user.userProfileImgUrl} alt="" />
                  </div>
                  <div css={s.leftContainer}>
                    <div css={s.nickName}>{postDetail.user.userNickName}</div>
                    <div css={s.time}>
                      {new Date(postDetail.createdAt).toLocaleDateString()}
                      {new Date(postDetail.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <div css={s.countContainer}>
                  <span>조회수 {postDetail.viewCount}</span>
                  <div css={s.verticalDivider} />
                  <span>좋아요 {postDetail.likeCount}</span>
                  <div css={s.verticalDivider} />
                  <span>댓글 {postDetail.commentCount}</span>
                </div>
              </div>
            </div>
            <div css={s.horizontalDivider} />
            <div css={s.contentContainer}>
              <div
                css={s.content}
                dangerouslySetInnerHTML={{ __html: postContent }}
              ></div>
            </div>
            {postDetail.user.userId === userInfo.userId && (
              <div css={s.rewriteContainer}>
                <div css={s.rewriteButton} onClick={handleRewriteOnClick}>
                  수정
                </div>
                <div css={s.deleteButton} onClick={handleDeleteOnClick}>
                  삭제
                </div>
              </div>
            )}
            <div css={s.postCommentContainer}>
              <PostComment
                boardKey={boardKey}
                postId={postId}
                isLike={postDetail.isLike}
                handleLikeOnClick={handleLikeOnClick}
              />
            </div>
          </div>
<<<<<<< HEAD
=======

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
>>>>>>> ea22c0b60afac2259fb4a217824cd6c2052c3ff2
        </>
      )}
    </>
  );
}

export default PostDetail2;
