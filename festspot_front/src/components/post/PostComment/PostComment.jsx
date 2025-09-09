/** @jsxImportSource @emotion/react */
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { usePostCommentsQuery } from "../../../querys/post/usePostCommentsQuery";
import * as s from "./styles";
import React, { useEffect, useState } from "react";
import { PiSiren } from "react-icons/pi";
import usePrincipalQuery from "../../../querys/auth/usePrincipalQuery";
import { FiCornerDownRight } from "react-icons/fi";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import {
  reqCommentRegister,
  reqCommentDelete,
  reqCommentUpdate,
} from "../../../api/postCommentApi";
import { IoCheckmarkSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import { css, Global } from "@emotion/react";

function PostComment({ postId, isLike, handleLikeOnClick }) {
  // 0 = 등록순, 1 = 최신순
  const [sortOption, setSortOption] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [parentCommentId, setParentCommentId] = useState(0);
  const [recommentValue, setRecommentValue] = useState("");
  const [editCommentId, setEditCommentId] = useState(0);
  const [editValue, setEditValue] = useState("");

  const postCommentsQuery = usePostCommentsQuery(postId);
  const postComments = postCommentsQuery.data?.data?.body || [];
  const [postCommentsState, setPostCommentsState] = useState([]);

  useEffect(() => {
    if (postCommentsQuery.isSuccess) {
      setPostCommentsState(postComments);
    }
  }, [postComments]);

  const principalQuery = usePrincipalQuery();
  const userInfo = principalQuery.data?.data?.body?.user || null;

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

  const handleCommentConfirmOnClick = async (e) => {
    await reqCommentRegister({ postId, commentContent: inputValue });
    await postCommentsQuery.refetch();
  };

  const handleRecommentConfirmOnClick = async (e) => {
    await reqCommentRegister({
      postId,
      commentContent: recommentValue,
      parentCommentId,
    });
    setParentCommentId(0);
    setRecommentValue("");
    await postCommentsQuery.refetch();
  };

  const handleEditCommentOnClick = (e, commentId, content) => {
    setEditCommentId(commentId);
    setEditValue(content);
  };

  const handleEditConfirmOnClick = async (e, postCommentId) => {
    await reqCommentUpdate({
      postId,
      commentContent: editValue,
      postCommentId,
    });
    setEditCommentId(0);
    await postCommentsQuery.refetch();
  };

  const handleDeleteOnclick = async (e, postCommentId) => {
    Swal.fire({
      icon: "warning",
      title: "댓글을 삭제 하시겠습니까?",
      text: "삭제하신 댓글은 복구 할 수 없습니다.",
      showConfirmButton: true,
      confirmButtonText: "삭제",
      showCancelButton: true,
      cancelButtonText: "취소",
      customClass: {
        confirmButton: "swalConfirmButton",
        cancelButton: "swalCancelButton",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await reqCommentDelete({ postId, postCommentId });
        await postCommentsQuery.refetch();
      }
    });
  };

  const handleSortOnClick = (sortOption) => {
    setSortOption(sortOption);

    if (sortOption === 0)
      //등록순
      setPostCommentsState((prev) =>
        prev.sort((a, b) => a.orderNumber - b.orderNumber)
      );

    if (sortOption === 1)
      //최신순
      setPostCommentsState((prev) =>
        prev.sort((a, b) => b.orderNumber - a.orderNumber)
      );
  };

  console.log(postCommentsState);

  return (
    <>
      <Global
        styles={css`
          .swal2-modal {
            font-size: 12px;
          }
          .swalConfirmButton {
            background-color: #ff6b4a !important;
            color: white !important;
          }
          .swalCancelButton {
            background-color: #dbdbdb !important;
            color: #888 !important;
          }
        `}
      />
      <div css={s.commentLayout}>
        <div css={s.sort}>
          <span
            onClick={() => handleSortOnClick(0)}
            css={s.sortOption(sortOption === 0)}
          >
            등록순 {sortOption === 0 && <IoCheckmarkSharp />}
          </span>
          <span
            onClick={() => handleSortOnClick(1)}
            css={s.sortOption(sortOption === 1)}
          >
            최신순 {sortOption === 1 && <IoCheckmarkSharp />}
          </span>
        </div>
        <div css={s.commentBox}>
          <div css={s.commentContainer}>
            {postCommentsState.map((comment) => (
              <React.Fragment key={comment.postCommentId}>
                {comment.deleted ? (
                  comment.hasChild ? (
                    <>
                      <div
                        css={s.deletedComment(comment.level, comment.hasChild)}
                      >
                        삭제된 댓글입니다.
                      </div>
                    </>
                  ) : (
                    <></>
                  )
                ) : (
                  <>
                    <div css={s.childContainer}>
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
                              {!!comment.updatedAt ? (
                                <>
                                  {new Date(
                                    comment.updatedAt
                                  ).toLocaleDateString()}
                                  {new Date(
                                    comment.updatedAt
                                  ).toLocaleTimeString()}
                                </>
                              ) : (
                                <>
                                  {new Date(
                                    comment.createdAt
                                  ).toLocaleDateString()}
                                  {new Date(
                                    comment.createdAt
                                  ).toLocaleTimeString()}
                                </>
                              )}
                            </div>
                            <div>{!!comment.updatedAt ? "(수정됨)" : ""}</div>
                            {!!userInfo &&
                            comment.userId === userInfo.userId ? (
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
                                      handleDeleteOnclick(
                                        e,
                                        comment.postCommentId
                                      );
                                    }}
                                  >
                                    삭제
                                  </div>
                                )}
                                {!!editCommentId ? (
                                  <div
                                    css={s.editButton}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditConfirmOnClick(
                                        e,
                                        comment.postCommentId
                                      );
                                    }}
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
                    {!!userInfo &&
                      comment.postCommentId === parentCommentId && (
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
                )}
              </React.Fragment>
            ))}
          </div>
          {!!userInfo && (
            <>
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
                <button
                  css={s.confirmButton}
                  onClick={handleCommentConfirmOnClick}
                >
                  등록
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default PostComment;
