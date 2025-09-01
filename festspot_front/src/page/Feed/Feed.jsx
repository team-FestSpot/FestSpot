import React, { useEffect, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import Button from "@mui/material/Button";
import { useSearchParams } from "react-router-dom";
import { usePerformanceDetailQuery } from "../../querys/performance/usePerformanceDetailQuery";
import { usePerformanceCommentRegisterMutation } from "../../querys/performance/usePerformanceCommentRegisterMutation";
import { usePerformanceCommentListQuery } from "../../querys/performance/usePerformanceCommentListQuery";
import usePrincipalQuery from "../../querys/auth/usePrincipalQuery";

function Feed(props) {
  const principalQuery = usePrincipalQuery();
  const principal = principalQuery?.data?.data?.body?.user;
  const [searchParams, setSearchParams] = useSearchParams();
  const detailQuery = usePerformanceDetailQuery(
    searchParams.get("performanceId")
  );
  const performanceDetail = detailQuery?.data?.data?.body;
  const [value, setValue] = useState("");
  const textareaRef = useRef();
  const commentRegisterMutation = usePerformanceCommentRegisterMutation();
  const commentQuery = usePerformanceCommentListQuery(
    searchParams.get("performanceId")
  );
  const comments = commentQuery?.data?.data?.body;
  const [isModify, setIsModify] = useState(-1);

  // const modules = { // quill 버려서 안쓸듯
  //   toolbar: false, // 댓글창 위 툴바 표시 안함
  // };

  const handleCommentInputOnChange = (e) => {
    setValue(e.target.value);
    textareaRef.current.style.height = "auto"; // 높이 초기화
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  };

  const handlePerformanceCommentRegisterButtonOnClick = async () => {
    if (!principal || !principal?.userId) {
      return;
    }

    if (!value || value.length < 1) {
      return;
    }

    const commentData = {
      performanceId: performanceDetail?.performanceId,
      content: value,
    };
    await commentRegisterMutation.mutateAsync(commentData);
    setValue("");
  };

  const handleCommentModifyButtonOnClick = (e, id) => {
    console.log(id);
    setIsModify(id);
  };

  const handleCommentDeleteButtonOnClick = (e, id) => {
    console.log(id);
  };

  return (
    <div css={s.feedLayout}>
      <div css={s.contentsContainer}>
        <header css={s.header}>
          <div>{performanceDetail?.performanceTitle}</div>
          <div>
            {!!performanceDetail?.isForeign ? "내한" : "국내"}{" "}
            {!!performanceDetail?.isFestival ? "페스티벌" : "공연"}
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
              {performanceDetail?.ticketingUrls.map((ticketingUrl, index) => {
                return (
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
                );
              })}
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
                  width: "8rem",
                }}
                onClick={handlePerformanceCommentRegisterButtonOnClick}
              >
                댓글 작성
              </Button>
            </div>
            {!!comments &&
              comments?.map((comment, index) => {
                return (
                  <div key={index} css={s.commentContainer}>
                    {comment?.user?.userId === principal?.userId && (
                      <div css={s.commentModifyButtonsContainer}>
                        <p
                          onClick={(e) =>
                            handleCommentModifyButtonOnClick(
                              e,
                              comment?.performanceCommentId
                            )
                          }
                        >
                          수정
                        </p>
                        <p
                          onClick={(e) =>
                            handleCommentDeleteButtonOnClick(
                              e,
                              comment?.performanceCommentId
                            )
                          }
                        >
                          삭제
                        </p>
                      </div>
                    )}
                    <div css={s.commentContentsContainer}>
                      <p>{comment?.user?.userNickName}</p>
                      <p>{comment?.content}</p>
                      <p>{comment?.createdAt}</p>
                    </div>
                  </div>
                );
              })}
          </div>
          <div css={s.prevNextButtonsContainer}>
            <Button variant="contained" sx={{ backgroundColor: "#ef5a39" }}>
              이전 공연
            </Button>
            <Button variant="contained" sx={{ backgroundColor: "#ef5a39" }}>
              공연 목록
            </Button>
            <Button variant="contained" sx={{ backgroundColor: "#ef5a39" }}>
              다음 공연
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Feed;
