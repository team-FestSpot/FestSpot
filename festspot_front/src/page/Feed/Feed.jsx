import React, { useEffect, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import Button from "@mui/material/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePerformanceCommentRegisterMutation } from "../../querys/performance/usePerformanceCommentRegisterMutation";
import { usePerformanceCommentListQuery } from "../../querys/performance/usePerformanceCommentListQuery";
import usePrincipalQuery from "../../querys/auth/usePrincipalQuery";
import Swal from "sweetalert2";
import { usePerformanceCommentDeleteMutation } from "../../querys/performance/usePerformanceCommentDeleteMutation";
import { usePerformanceListQuery } from "../../querys/performance/usePerformanceListQuery";
import { USER_PROFILE_IMG_PATH } from "../../constants/userProfileImgPath";

function Feed(props) {
  const navigate = useNavigate(); // 비로그인 상태로 댓글 작성하려고 할 시 로그인 창으로 보냄
  const principalQuery = usePrincipalQuery(); // principal 쿼리
  const principal = principalQuery?.data?.data?.body?.user;
  const [searchParams, setSearchParams] = useSearchParams(); // 주소창 params에서 공연 id 가져옴

  const performanceListQuery = usePerformanceListQuery(); // 공연 목록 query
  const performanceList = performanceListQuery?.data?.data?.body;
  // params의 performanceId와 일치하는 공연 상세정보 객체
  const performanceDetail = performanceList?.find(
    (performance) =>
      performance?.performanceId === parseInt(searchParams.get("performanceId"))
  );

  const [value, setValue] = useState(""); // 댓글 입력값 저장
  const textareaRef = useRef(); // 댓글 입력창에 사용하는 Ref(드래그로 크기 조절하는거 막음)
  const commentRegisterMutation = usePerformanceCommentRegisterMutation(); // 댓글 등록 / 수정 mutation
  const commentQuery = usePerformanceCommentListQuery(
    // db에서 특정 공연 id의 공연 정보에 달린 댓글 목록 가져오는 쿼리
    searchParams.get("performanceId")
  );
  const comments = commentQuery?.data?.data?.body;

  const [isModify, setIsModify] = useState(-1); // 수정 버튼 누른 댓글 id 저장 (저장된 id와 일치하는 댓글은 입력창으로 바뀜) -1 = 댓글 수정을 안 눌렀거나 수정 취소
  const [modifyValue, setModifyValue] = useState(""); // 수정 버튼 누른(isModify에 id가 저장된) 댓글의 입력값
  const commentDeleteMutation = usePerformanceCommentDeleteMutation(); // 댓글 삭제 Mutation

  const [currentIdx, setCurrentIdx] = useState(-1);
  const [prev, setPrev] = useState(-1);
  const [next, setNext] = useState(-1);

  // const modules = { // quill 버려서 안쓸듯
  //   toolbar: false, // 댓글창 위 툴바 표시 안함
  // };

  // 댓글 입력값 변경 시 상태에 저장, ref로 높이 자동조절
  const handleCommentInputOnChange = (e) => {
    setValue(e.target.value);
    textareaRef.current.style.height = "auto"; // 높이 초기화
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";

    // 입력창이 늘어날 때 입력창이 위로 밀리지 않고 아래로 확장
    textareaRef.current.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  };

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

  // 댓글 등록 버튼 눌러서 댓글 입력
  const handlePerformanceCommentRegisterButtonOnClick = async () => {
    if (!principal || !principal?.userId) {
      await Swal.fire({
        title: "사용자 정보가 없습니다.\n로그인 화면으로 이동합니다.",
        icon: "error",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/auth/login");
      return;
    }

    if (!value || value.length < 1) {
      await Swal.fire({
        title: "댓글을 입력하세요.",
        icon: "error",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const commentData = {
      performanceId: performanceDetail?.performanceId,
      content: value,
    };

    try {
      await commentRegisterMutation.mutateAsync(commentData);
      setValue("");
    } catch (error) {
      return;
    }
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

  // 이전, 다음 버튼
  const handlePageMoveButtonOnClick = async (performanceId) => {
    setSearchParams({ performanceId: performanceId });
    window.location.reload();
  };

  useEffect(() => {
    if (performanceListQuery.isFetched) {
      const currentIndex = performanceList?.findIndex(
        (performance) =>
          performance?.performanceId === performanceDetail?.performanceId
      );

      setCurrentIdx(currentIndex);

      const prevIndex = currentIndex > -1 ? currentIndex - 1 : null;
      const nextIndex =
        currentIndex < performanceList.length ? currentIndex + 1 : null;

      const prevId =
        prevIndex > -1 ? performanceList[prevIndex]?.performanceId : null;
      const nextId =
        nextIndex < performanceList?.length
          ? performanceList[nextIndex]?.performanceId
          : null;
      setPrev(prevId);
      setNext(nextId);
    }
  }, [performanceListQuery.isFetched]);

  return (
    <div css={s.feedLayout}>
      <div css={s.contentsContainer}>
        <header css={s.header}>
          <div>{performanceDetail?.performanceTitle}</div>
          <div>
            {performanceDetail?.isForeign ? "내한" : "국내"}{" "}
            {performanceDetail?.isFestival ? "페스티벌" : "공연"}
          </div>
        </header>
        <main css={s.main}>
          {!!performanceDetail?.performancePosterUrl && (
            <div css={s.posterContainer}>
              <img src={performanceDetail?.performancePosterUrl} alt="" />
            </div>
          )}
          <div css={s.feedContentContainer}>
            <div css={s.feedContents}>
              <div>
                <p>공연 지역</p>
                <p>{performanceDetail?.performanceRegion?.regionName}</p>
              </div>
              <div>
                <p>공연 장소</p>
                <p>{performanceDetail?.performanceVenue}</p>
              </div>
              <div>
                <p>공연 일자</p>
                <p>
                  {performanceDetail?.performanceStartDate}
                  {" ~ "}
                  {performanceDetail?.performanceEndDate}
                </p>
              </div>
              <div>
                <p>공연 상태</p>
                <p>{performanceDetail?.performanceState?.performanceState}</p>
              </div>
              {performanceDetail?.performanceCast.length > 0 && (
                <div>
                  <p>출연진</p>
                  <p>{performanceDetail?.performanceCast}</p>
                </div>
              )}
            </div>
            <div css={s.ticketings}>
              {performanceDetail?.ticketingUrls.map((ticketingUrl, index) => (
                <div key={index}>
                  <p>{ticketingUrl.ticketingAgencyName}</p>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#ef5a39" }}
                    onClick={() => window.open(ticketingUrl.ticketingUrl)}
                  >
                    이동
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div css={s.feedCommentContainer}>
            <div css={s.commentInputContainer}>
              <textarea
                onChange={handleCommentInputOnChange}
                placeholder="댓글 입력"
                ref={textareaRef}
                value={value}
              />
              <Button
                variant="outline"
                sx={{
                  border: "1px solid #ef5a39",
                  width: "4rem",
                }}
                onClick={handlePerformanceCommentRegisterButtonOnClick}
              >
                작성
              </Button>
            </div>
            <div css={s.commentCountContainer}>
              <p>
                댓글 {comments?.filter((comment) => !comment?.deletedAt).length}
                개
              </p>
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
                            <p>{comment?.user?.userNickName}</p>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: comment?.content,
                              }}
                            ></p>
                            <p>{comment?.createdAt}</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
          </div>
          <div css={s.pageMoveButtonsContainer}>
            <div css={s.prevNextButtonsContainer}>
              <div>
                {!!prev && currentIdx > 0 && (
                  <>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#ef5a39", width: "4rem" }}
                      onClick={() => handlePageMoveButtonOnClick(prev)}
                    >
                      이전
                    </Button>
                    <div>
                      {performanceList[currentIdx - 1]?.performanceTitle}
                    </div>
                  </>
                )}
              </div>
              <div>
                {!!next && currentIdx < performanceList?.length && (
                  <>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#ef5a39", width: "4rem" }}
                      onClick={() => handlePageMoveButtonOnClick(next)}
                    >
                      다음
                    </Button>
                    <div>
                      {performanceList[currentIdx + 1]?.performanceTitle}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#ef5a39" }}
                onClick={() => navigate("/performance")}
              >
                공연 목록
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Feed;
