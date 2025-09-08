/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { usePostDetailQuery } from "../../../../querys/post/usePostDetailQuery";
import { getQuillContent } from "../../../../utils/getQuillContent";
import PostComment from "../../../../components/post/PostComment/PostComment";
import { useQueryClient } from "@tanstack/react-query";
import { reqPostDislike, reqPostLike } from "../../../../api/postApi";
import usePrincipalQuery from "../../../../querys/auth/usePrincipalQuery";
import Swal from "sweetalert2";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import DOMPurify from "dompurify";

function PostDetail(props) {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [html, setHtml] = useState("");

  const queryClient = useQueryClient();
  const userInfo = usePrincipalQuery().data?.data?.body?.user;

  const boardKey = pathname.split("/")[2];
  const postId = pathname.split("/")[3];

  const postDetailQuery = usePostDetailQuery(boardKey, postId);
  const postDetail = postDetailQuery.data?.data?.body;

  useEffect(() => {
    if (!!postDetail?.postContent) {
      const delta = JSON.parse(
        getQuillContent(postDetail.postContent, postDetail.postImgs)
      );

      const converter = new QuillDeltaToHtmlConverter(delta, {});
      const html = converter.convert();
      const cleanHtml = DOMPurify.sanitize(html); //XSS 공격 방지 라이브러리

      setHtml(cleanHtml);
    }
  }, [postDetail]);

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
        title: error?.response?.data?.body,
        text: error?.response?.data?.message,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  const handleEditOnClick = (e) => {
    navigate(`/board/edit/${postDetail.postId}?boardKey=${boardKey}`);
  };

  const handleDeleteOnClick = (e) => {};

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
                dangerouslySetInnerHTML={{ __html: html }}
              ></div>
            </div>
            {postDetail.user.userId === userInfo.userId && (
              <div css={s.editContainer}>
                <div css={s.editButton} onClick={handleEditOnClick}>
                  수정
                </div>
                <div css={s.deleteButton} onClick={handleDeleteOnClick}>
                  삭제
                </div>
              </div>
            )}
            <div css={s.postCommentContainer}>
              <PostComment
                postId={postId}
                isLike={postDetail.isLike}
                handleLikeOnClick={handleLikeOnClick}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PostDetail;
