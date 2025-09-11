import React, { useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { usePerformanceCommentRegisterMutation } from "../../../querys/performance/usePerformanceCommentRegisterMutation";
import { usePerformanceCommentListQuery } from "../../../querys/performance/usePerformanceCommentListQuery";
import { usePerformanceCommentDeleteMutation } from "../../../querys/performance/usePerformanceCommentDeleteMutation";
import { useNavigate, useSearchParams } from "react-router-dom";
import usePrincipalQuery from "../../../querys/auth/usePrincipalQuery";
import { USER_PROFILE_IMG_PATH } from "../../../constants/userProfileImgPath";
import TextareaAutosize from "@mui/material/TextareaAutosize";

function FeedCommentList({ performanceDetail }) {
  const navigate = useNavigate(); // 비로그인 상태로 댓글 작성하려고 할 시 로그인 창으로 보냄
  const principalQuery = usePrincipalQuery(); // principal 쿼리
  const principal = principalQuery?.data?.data?.body?.user;
  const [searchParams, setSearchParams] = useSearchParams(); // 주소창 params에서 공연 id 가져옴

  const commentRegisterMutation = usePerformanceCommentRegisterMutation(); // 댓글 등록 / 수정 mutation
  const commentQuery = usePerformanceCommentListQuery(
    // db에서 특정 공연 id의 공연 정보에 달린 댓글 목록 가져오는 쿼리
    searchParams.get("performanceId")
  );
  const comments = commentQuery?.data?.data?.body;

  const [isModify, setIsModify] = useState(-1); // 수정 버튼 누른 댓글 id 저장 (저장된 id와 일치하는 댓글은 입력창으로 바뀜) -1 = 댓글 수정을 안 눌렀거나 수정 취소
  const [modifyValue, setModifyValue] = useState(""); // 수정 버튼 누른(isModify에 id가 저장된) 댓글의 입력값
  const commentDeleteMutation = usePerformanceCommentDeleteMutation(); // 댓글 삭제 Mutation

  const textareaRef = useRef(); // 댓글 입력창에 사용하는 Ref(드래그로 크기 조절하는거 막음)

  // 댓글 수정 입력값 시 상태에 저장, ref로 높이 자동조절
  const handleCommentModifyInputOnChange = (e) => {
    setModifyValue(e.target.value);
    textareaRef.current.style.height = "auto"; // 높이 초기화
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";

    // 입력창이 늘어날 때 입력창이 위로 밀리지 않고 아래로 확장
    textareaRef.current.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  };

  // 댓글 수정 버튼 누르면 댓글 수정 입력창으로 변경, 기존 댓글을 초기값으로 저장
  const handleCommentModifyButtonOnClick = (id, content) => {
    setIsModify(id);
    setModifyValue(content);
  };

  // 댓글 수정 확인 버튼 누르면 댓글 수정
  const handleCommentModifySubmitOnClick = async (
    performanceCommentId,
    content
  ) => {
    if (modifyValue === content) {
      await Swal.fire({
        title: "변경 사항이 없습니다.",
        icon: "error",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const commentModifyData = {
      performanceCommentId: performanceCommentId,
      performanceId: performanceDetail?.performanceId,
      content: modifyValue,
    };

    try {
      await commentRegisterMutation.mutateAsync(commentModifyData);
      setIsModify(-1);
      setModifyValue("");
    } catch (error) {
      alert("댓글 수정 중 오류가 발생했습니다.");
      return;
    }
  };

  // 댓글 수정 취소 버튼 누르면 입력창 사라짐
  const handleCommentModifyCancelOnClick = () => {
    setIsModify(-1);
    setModifyValue("");
  };

  // 댓글 삭제(삭제일(deleted_at)이 추가되고 표시되지 않게 함)
  const handleCommentDeleteButtonOnClick = async (id) => {
    await commentDeleteMutation.mutateAsync(id);
  };

  return (
    <>
      <div css={s.commentListContainer}>
        <div css={s.commentSortButtonsContainer}>
          <p>최신순</p>
          <p>등록순</p>
        </div>
        {!!comments &&
          comments
            ?.filter((comment) => !comment?.deletedAt)
            .map((comment, index) => (
              <div key={index} css={s.commentContainer}>
                {!comment?.deletedAt && (
                  <>
                    {comment?.user?.userId === principal?.userId && (
                      <div css={s.commentModifyButtonsContainer}>
                        {comment?.performanceCommentId === isModify ? (
                          <div>
                            <p
                              onClick={() =>
                                handleCommentModifySubmitOnClick(
                                  comment?.performanceCommentId,
                                  comment?.content
                                )
                              }
                            >
                              확인
                            </p>
                            <p onClick={handleCommentModifyCancelOnClick}>
                              취소
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p
                              onClick={() =>
                                handleCommentModifyButtonOnClick(
                                  comment?.performanceCommentId,
                                  comment?.content
                                )
                              }
                            >
                              수정
                            </p>
                            <p
                              onClick={() =>
                                handleCommentDeleteButtonOnClick(
                                  comment?.performanceCommentId
                                )
                              }
                            >
                              삭제
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    {comment?.performanceCommentId === isModify ? (
                      <div css={s.commentModifyContentsContainer}>
                        <textarea
                          onChange={handleCommentModifyInputOnChange}
                          placeholder="댓글 입력"
                          ref={textareaRef}
                          value={modifyValue}
                        />
                      </div>
                    ) : (
                      <div css={s.commentContentsContainer}>
                        <div css={s.commentUserProfileImg}>
                          <img
                            src={`${USER_PROFILE_IMG_PATH}${comment?.user?.userProfileImgUrl}`}
                            alt=""
                          />
                        </div>
                        <div css={s.commentInfoContainer}>
                          <div>
                            <p css={s.commentNickName}>
                              {comment?.user?.userNickName}
                            </p>
                            <p css={s.commentTime}>
                              {new Date(
                                comment?.createdAt
                              ).toLocaleDateString()}
                              {new Date(
                                comment?.createdAt
                              ).toLocaleTimeString()}
                            </p>
                          </div>
                          <div css={s.comment}>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: comment?.content,
                              }}
                            ></p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
      </div>
    </>
  );
}

export default FeedCommentList;
