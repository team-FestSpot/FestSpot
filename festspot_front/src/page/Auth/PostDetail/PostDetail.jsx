/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as s from "./styles";
import {
  MdArrowBack,
  MdFavorite,
  MdFavoriteBorder,
  MdComment,
  MdSend,
  MdEdit,
  MdDelete,
} from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { fetchComments, fetchPostDetail, likePost, unlikePost } from "../../../api/post";


const VIEW_KEY_PREFIX = "viewed_post_";

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isCommenting, setIsCommenting] = useState(false);
  const [user, setUser] = useState(null);

  // ▼ 더보기 상태
  const [page, setPage] = useState(1);
  const size = 20; // 페이지 크기
  const [hasNext, setHasNext] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 언마운트 안전
  const aliveRef = useRef(true);
  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  // 로그인 유저 로드
  useEffect(() => {
    try {
      const userInfo = localStorage.getItem("principal");
      if (userInfo) setUser(JSON.parse(userInfo));
    } catch (e) {
      console.error(e);
    }
  }, []);

  // 댓글 로더
  const loadComments = async (p = 1, replace = false) => {
    if (!postId) return;
    if (p > 1) setIsLoadingMore(true);
    try {
      const data = await fetchComments(postId, p, size);
      const items = Array.isArray(data) ? data : data.items || [];
      const total = !Array.isArray(data) ? data.total : undefined;

      // hasNext 계산: 서버가 hasNext 주면 그걸 사용, 없으면 길이 기반 추정
      const next =
        !Array.isArray(data)
          ? typeof data.hasNext === "boolean"
            ? data.hasNext
            : total != null
            ? p * size < total
            : items.length === size
          : items.length === size;

      setComments((prev) => (replace ? items : [...prev, ...items]));
      setHasNext(next);
      setPage(p);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // 상세 + 첫 페이지 댓글
  useEffect(() => {
    if (!postId) return;
    (async () => {
      try {
        setIsLoading(true);

        const detail = await fetchPostDetail(postId);
        if (!aliveRef.current) return;
        setPost(detail);
        setIsLiked(!!detail.likedByMe);
        setLikeCount(detail.likeCount ?? 0);

        // 조회수 중복 방지(세션당 1회)
        const viewedKey = `${VIEW_KEY_PREFIX}${postId}`;
        if (!sessionStorage.getItem(viewedKey)) {
          await incrementPostView(postId);
          sessionStorage.setItem(viewedKey, "1");
        }

        await loadComments(1, true);
      } catch (e) {
        console.error(e);
      } finally {
        if (aliveRef.current) setIsLoading(false);
      }
    })();
  }, [postId]);

  const isAuthor = user && post && user.id === post.authorId;

  const handleLike = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/auth/login");
      return;
    }
    const prevLiked = isLiked;
    const prevCount = likeCount;
    const nextLiked = !prevLiked;
    const nextCount = nextLiked ? prevCount + 1 : prevCount - 1;

    // 낙관적 업데이트
    setIsLiked(nextLiked);
    setLikeCount(nextCount);

    try {
      if (nextLiked) await likePost(postId);
      else await unlikePost(postId);
    } catch (e) {
      console.error(e);
      // 롤백
      setIsLiked(prevLiked);
      setLikeCount(prevCount);
      if (e?.response?.status === 401) {
        alert("로그인이 필요합니다.");
        navigate("/auth/login");
      } else {
        alert("좋아요 처리 실패");
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/auth/login");
      return;
    }
    if (!newComment.trim()) return;

    setIsCommenting(true);
    try {
      await createComment(postId, newComment.trim());
      setNewComment("");

      await loadComments(1, true);
      setPost((prev) =>
        prev ? { ...prev, commentCount: (prev.commentCount ?? 0) + 1 } : prev
      );
    } catch (e) {
      console.error(e);
      if (e?.response?.status === 401) {
        alert("로그인이 필요합니다.");
        navigate("/auth/login");
      } else {
        alert("댓글 작성 실패");
      }
    } finally {
      setIsCommenting(false);
    }
  };

  if (isLoading) {
    return (
      <div css={s.containerStyle}>
        <div css={s.loadingStyle}>게시글을 불러오는 중...</div>
      </div>
    );
  }
  if (!post) {
    return (
      <div css={s.containerStyle}>
        <div css={s.errorStyle}>게시글을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div css={s.containerStyle}>
      {/* 헤더 */}
      <div css={s.headerStyle}>
        <button css={s.backButtonStyle} onClick={() => navigate(-1)}>
          <MdArrowBack /> 뒤로가기
        </button>
        {isAuthor && (
          <div css={s.authorActionsStyle}>
            <button
              css={s.editButtonStyle}
              onClick={() => navigate(`/board/edit/${postId}`)}
            >
              <MdEdit /> 수정
            </button>
            <button
              css={s.deleteButtonStyle}
              onClick={() => {
                /* 삭제 로직 */
              }}
            >
              <MdDelete /> 삭제
            </button>
          </div>
        )}
      </div>

      {/* 게시글 */}
      <div css={s.postWrapperStyle}>
        <div css={s.postHeaderStyle}>
          <h1 css={s.postTitleStyle}>{post.title}</h1>
          <div css={s.postMetaStyle}>
            <div css={s.authorInfoStyle}>
              <span css={s.authorNameStyle}>{post.authorName}</span>
              <span css={s.postDateStyle}>
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </span>
            </div>
            <div css={s.postStatsStyle}>
              <span css={s.statItemStyle}>
                <AiOutlineEye /> {post.viewCount}
              </span>
              <span css={s.statItemStyle}>
                <MdFavorite /> {likeCount}
              </span>
              <span css={s.statItemStyle}>
                <MdComment /> {post.commentCount ?? comments.length}
              </span>
            </div>
          </div>
        </div>

        {Array.isArray(post.images) && post.images.length > 0 && (
          <div css={s.postImagesStyle}>
            {post.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`게시글 이미지 ${i + 1}`}
                css={s.postImageStyle}
              />
            ))}
          </div>
        )}

        <div
          css={s.postContentStyle}
          dangerouslySetInnerHTML={{
            __html: post.contentHtml || post.content,
          }}
        />

        <div css={s.likeButtonWrapperStyle}>
          <button
            css={[s.likeButtonStyle, isLiked && s.likeButtonActiveStyle]}
            onClick={handleLike}
          >
            {isLiked ? <MdFavorite /> : <MdFavoriteBorder />} 좋아요 {likeCount}
          </button>
        </div>
      </div>

      {/* 댓글 */}
      <div css={s.commentSectionStyle}>
        <h3 css={s.commentHeaderStyle}>
          댓글 {post.commentCount ?? comments.length}개
        </h3>

        {post.allowComments !== false ? (
          <>
            {user ? (
              <form css={s.commentFormStyle} onSubmit={handleCommentSubmit}>
                <div css={s.commentInputWrapperStyle}>
                  <textarea
                    css={s.commentInputStyle}
                    placeholder="댓글을 작성해주세요..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <button
                    type="submit"
                    css={s.commentSubmitStyle}
                    disabled={isCommenting || !newComment.trim()}
                  >
                    <MdSend /> {isCommenting ? "작성 중..." : "등록"}
                  </button>
                </div>
              </form>
            ) : (
              <div css={s.loginPromptStyle}>
                댓글을 작성하려면{" "}
                <button onClick={() => navigate("/auth/login")}>로그인</button>
                이 필요합니다.
              </div>
            )}

            <div css={s.commentListStyle}>
              {comments.map((c) => (
                <div key={c.commentId || c.id} css={s.commentItemStyle}>
                  <div css={s.commentContentStyle}>
                    <div css={s.commentAuthorStyle}>{c.authorName}</div>
                    <div css={s.commentTextStyle}>{c.content}</div>
                    <div css={s.commentDateStyle}>
                      {c.createdAt
                        ? new Date(c.createdAt).toLocaleString("ko-KR", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 더보기 / 모두 읽음 */}
            {hasNext ? (
              <div css={s.loadMoreWrapperStyle}>
                <button
                  css={s.loadMoreBtnStyle}
                  onClick={() => loadComments(page + 1, false)}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? "불러오는 중..." : "더 보기"}
                </button>
              </div>
            ) : comments.length > 0 ? (
              <div css={s.noMoreTextStyle}>모두 읽었어요</div>
            ) : null}
          </>
        ) : (
          <div css={s.commentsDisabledStyle}>
            이 게시글은 댓글이 비활성화되어 있습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
