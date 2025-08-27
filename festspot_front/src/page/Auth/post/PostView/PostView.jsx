/** @jsxImportSource @emotion/react */
import { usePostsQuery } from "../../../../querys/post/usePostsQuery";
import * as s from "./styles";
import React from "react";

function PostView(props) {
  const { data: post, isLoading, isError, error } = usePostsQuery("free", 10);

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러: {String(error)}</div>;
  if (!post) return <div>게시글이 없습니다.</div>;

  const fmt = (d) => (d ? new Date(d).toLocaleString() : "-");

  return (
    <article>
      <h1>{post.postTitle}</h1>

      <div>
        <span>작성자: {post.user?.userNickName ?? "알 수 없음"}</span>
        {" · "}
        <span>작성일: {fmt(post.createdAt)}</span>
        {" · "}
        <span>조회 {post.viewCount ?? 0}</span>
        {" · "}
        <span>좋아요 {post.likeCount ?? 0}</span>
        {" · "}
        <span>댓글 {post.commentCount ?? 0}</span>
      </div>

      <hr />

      <section>
        {/* 내용이 HTML이면 아래처럼 바꿔서 표시 가능:
           <div dangerouslySetInnerHTML={{ __html: post.postContent }} /> */}
        {(post.postContent || "").split("\n").map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </section>

      {Array.isArray(post.postImgs) && post.postImgs.length > 0 && (
        <>
          <hr />
          <h2>이미지</h2>
          <ul>
            {post.postImgs
              .slice()
              .sort((a, b) => (a.seq ?? 0) - (b.seq ?? 0))
              .map((img) => (
                <li key={img.postImgId ?? img.postImgUrl}>
                  <img src={img.postImgUrl} alt="" />
                </li>
              ))}
          </ul>
        </>
      )}

      {Array.isArray(post.postComments) && post.postComments.length > 0 && (
        <>
          <hr />
          <h2>댓글</h2>
          <ol>
            {post.postComments.map((c) => (
              <li key={c.postCommentId}>
                <div>
                  <strong>{c.user?.userNickName ?? "익명"}</strong>
                  {" · "}
                  <span>{fmt(c.createdAt)}</span>
                </div>
                <div>{c.commentContent}</div>
              </li>
            ))}
          </ol>
        </>
      )}
    </article>
  );
}

export default PostView;
