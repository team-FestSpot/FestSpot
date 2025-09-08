/** @jsxImportSource @emotion/react */
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { usePostCommentsQuery } from "../../../querys/post/usePostCommentsQuery";
import * as s from "./styles";
import React, { useEffect, useRef, useState } from "react";
import { PiSiren } from "react-icons/pi";
import usePrincipalQuery from "../../../querys/auth/usePrincipalQuery";
import { FiCornerDownRight } from "react-icons/fi";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import {
  reqCommentRegister,
  reqCommentDelete,
  reqCommentUpdate,
} from "../../../api/postCommentApi";

function PostComment({ postId, isLike, handleLikeOnClick }) {
  const [inputValue, setInputValue] = useState("");
  const [recommentValue, setRecommentValue] = useState("");
  const [parentCommentId, setParentCommentId] = useState(0);

  const [editCommentId, setEditCommentId] = useState(0);
  const [editValue, setEditValue] = useState("");
  const postComments = usePostCommentsQuery(postId).data?.data?.body || [];
  const userInfo = usePrincipalQuery().data?.data?.body.user;

  const handleRecommentOnClick = (commentId) => {
    if (parentCommentId === commentId) setParentCommentId(0);
    else setParentCommentId(commentId);
  };

  const handleCommentOnChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleRecommentOnChange = (e) => {
    setRecommentValue(e.target.value);
  };

  const handleCommentConfirmOnClick = (e) => {
    reqCommentRegister({ postId, commentContent: inputValue });
  };

  const handleRecommentConfirmOnClick = (e) => {
    reqCommentRegister({
      postId,
      commentContent: recommentValue,
      parentCommentId,
    });
  };

  const handleEditCommentOnClick = (e, commentId, content) => {
    setEditCommentId(commentId);
    setEditValue(content);
  };

  const handleEditConfirmOnClick = (e, postCommentId) => {
    reqCommentUpdate({ postId, commentContent: editValue, postCommentId });
  };

  const handleDeleteOnclick = (e, postCommentId) => {
    reqCommentDelete({ postId, postCommentId });
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
            <>
              <div key={comment.postCommentId} css={s.childContainer}>
                {!!comment.level ? <FiCornerDownRight /> : <></>}
                <div css={s.comment(comment.level, comment.hasChild)}>
                  <div css={s.profileImgContainer}>
                    <img src={comment.userProfileImgUrl} alt="" />
                  </div>
                  <div
                    css={s.commentDiv}
                    onClick={(e) =>
                      handleRecommentOnClick(comment.postCommentId)
                    }
                  >
                    <div css={s.nickName}>
                      <div>{comment.userNickName}</div>
                      <div>
                        {new Date(comment.createdAt).toLocaleDateString()}
                        {new Date(comment.createdAt).toLocaleTimeString()}
                      </div>
                      <div>{!!comment.updated ? "(수정됨)" : ""}</div>
                      {comment.userId === userInfo.userId ? (
                        <div css={s.rewrtieContainer}>
                          {!!editCommentId ? (
                            <div
                              css={s.deleteButton}
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditCommentId(0);
                              }}
                            >
                              취소
                            </div>
                          ) : (
                            <div
                              css={s.deleteButton}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteOnclick(e, comment.postCommentId);
                              }}
                            >
                              삭제
                            </div>
                          )}
                          {!!editCommentId ? (
                            <div
                              css={s.editButton}
                              onClick={handleEditConfirmOnClick}
                            >
                              확인
                            </div>
                          ) : (
                            <div
                              css={s.editButton}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditCommentOnClick(
                                  e,
                                  comment.postCommentId,
                                  comment.commentContent
                                );
                              }}
                            >
                              수정
                            </div>
                          )}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div css={s.commentContent}>
                      <div css={s.parent}>
                        {!!comment.parentUserNickName ? (
                          `@${comment.parentUserNickName}`
                        ) : (
                          <></>
                        )}
                      </div>

                      {editCommentId === comment.postCommentId ? (
                        <input
                          css={s.editInput}
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        comment.commentContent
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {comment.postCommentId === parentCommentId && (
                <div css={s.recommentWriterContainer}>
                  <FiCornerDownRight />
                  <div css={s.withoutArrow(comment.level)}>
                    <div css={s.recommentWriter}>
                      <div>{userInfo.userNickName}</div>
                      <div css={s.commentWriter(true)}>
                        <TextareaAutosize
                          type="text"
                          onChange={handleRecommentOnChange}
                          value={recommentValue}
                        />
                      </div>
                    </div>
                    <button
                      css={s.recommentButton}
                      onClick={handleRecommentConfirmOnClick}
                    >
                      등록
                    </button>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
        <div css={s.commentWriterContainer}>
          <div>{userInfo.userNickName}</div>
          <div css={s.commentWriter(false)}>
            <TextareaAutosize
              type="text"
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
          <button css={s.confirmButton} onClick={handleCommentConfirmOnClick}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostComment;
