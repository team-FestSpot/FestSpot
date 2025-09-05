/** @jsxImportSource @emotion/react */
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { usePostCommentsQuery } from "../../../querys/post/usePostCommentsQuery";
import * as s from "./styles";
import React, { useEffect, useRef, useState } from "react";
import { PiSiren } from "react-icons/pi";
import usePrincipalQuery from "../../../querys/auth/usePrincipalQuery";
import { FiCornerDownRight } from "react-icons/fi";

function PostComment({ boardKey, postId, isLike, handleLikeOnClick }) {
  const textareaRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [mention, setMention] = useState("");
  const postComments =
    usePostCommentsQuery(boardKey, postId).data?.data?.body || [];
  const userInfo = usePrincipalQuery().data?.data?.body.user;

  // console.log(postComments);

  const handleRecommentOnClick = (userId, userNickName) => {
    setMention(userNickName);
  };

  const handleCommentOnChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div css={s.commentLayout}>
      <div css={s.sort}>
        <span>최신순</span>
        <span>등록순</span>
      </div>
      <div css={s.commentBox}>
        <div css={s.commentContainer}>
          {postComments.map((comment) => (
            <div key={comment.postCommentId} css={s.brace}>
              {!!comment.level ? <FiCornerDownRight /> : <></>}
              <div css={s.comment(comment.level, comment.hasChild)}>
                <div css={s.profileImgContainer}>
                  <img src={comment.userProfileImgUrl} alt="" />
                </div>
                <div css={s.commentDiv}>
                  <div css={s.nickName}>
                    <div>{comment.userNickName}</div>
                    <div>
                      {new Date(comment.createdAt).toLocaleDateString()}
                      {new Date(comment.createdAt).toLocaleTimeString()}
                    </div>
                    <div>{!!comment.updated ? "(수정됨)" : ""}</div>
                    {comment.userId === userInfo.userId ? (
                      <div css={s.rewrtieContainer}>
                        <div css={s.deleteButton}>삭제</div>
                        <div css={s.rewriteButton}>수정</div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div
                    css={s.commentContent}
                    onClick={() =>
                      handleRecommentOnClick(
                        comment.userId,
                        comment.userNickName
                      )
                    }
                  >
                    <div css={s.parent}>
                      {!!comment.parentUserNickName ? (
                        `@${comment.parentUserNickName}`
                      ) : (
                        <></>
                      )}
                    </div>
                    {comment.commentContent}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div css={s.commentWriterContainer}>
          <div>{userInfo.userNickName}</div>
          <div css={s.commentWriter}>
            <div css={s.metion}>{mention}</div>
            <textarea
              type="text"
              ref={textareaRef}
              onChange={handleCommentOnChange}
              value={inputValue}
              placeholder="댓글을 남겨보세요"
            />
          </div>
        </div>
        <div css={s.buttonContainer}>
          <div css={s.reportButton}>
            <PiSiren />
            신고
          </div>
          <div css={s.likeButton} onClick={handleLikeOnClick}>
            {!!isLike ? <FaHeart /> : <FaRegHeart />}
            <span>좋아요</span>
          </div>
          <button css={s.confirmButton}>등록</button>
        </div>
      </div>
    </div>
  );
}

export default PostComment;
