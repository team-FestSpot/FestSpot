/** @jsxImportSource @emotion/react */
import * as s from "./styles2";
import React from "react";
import { reqPostDetail } from "../../../../api/postApi";
import { useLocation } from "react-router-dom";
import { usePostDetailQuery } from "../../../../querys/post/usePostDetailQuery";
import { getQuillContent } from "../../../../utils/getQuillContent";

function PostDetail2(props) {
  const pathname = useLocation().pathname;

  const boardKey = pathname.split("/")[2];
  const postId = pathname.split("/")[3];

  const postDetailQuery = usePostDetailQuery(boardKey, postId);
  const postDetail = postDetailQuery.data?.data?.body;

  console.log(postDetail);
  const postContent = !!postDetail
    ? getQuillContent(postDetail.postContent, postDetail.postImgs)
    : "<p><br></p>";

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
          </div>
          <div css={s.postCommentContainer}></div>
        </>
      )}
    </>
  );
}

export default PostDetail2;
