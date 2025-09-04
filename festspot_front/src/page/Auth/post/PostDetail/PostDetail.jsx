/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import React from "react";
import { useLocation } from "react-router-dom";
import { usePostDetailQuery } from "../../../../querys/post/usePostDetailQuery";
import { getQuillContent } from "../../../../utils/getQuillContent";
import {
  FaHeart,
  FaRegHeart,
  FaRegEye,
  FaRegCommentDots,
  FaRegComments,
} from "react-icons/fa";
import { PiSiren } from "react-icons/pi";
import PostComment from "../../../../components/post/PostComment/PostComment";
import { useQueryClient } from "@tanstack/react-query";
import { reqPostDislike, reqPostLike } from "../../../../api/postApi";
import usePrincipalQuery from "../../../../querys/auth/usePrincipalQuery";
import Swal from "sweetalert2";

function PostDetail2(props) {
  const pathname = useLocation().pathname;
  const queryClient = useQueryClient();
  const userInfo = usePrincipalQuery().data?.data?.body?.user;

  const boardKey = pathname.split("/")[2];
  const postId = pathname.split("/")[3];

  const postDetailQuery = usePostDetailQuery(boardKey, postId);
  const postDetail = postDetailQuery.data?.data?.body;

  console.log(postDetail);
  const postContent = !!postDetail
    ? getQuillContent(postDetail.postContent, postDetail.postImgs)
    : "<p><br></p>";

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
            <div css={s.postCommentContainer}>
              <PostComment
                boardKey={boardKey}
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

export default PostDetail2;
