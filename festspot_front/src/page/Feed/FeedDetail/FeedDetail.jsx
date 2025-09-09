import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import Button from "@mui/material/Button";
import { useSearchParams } from "react-router-dom";
import { usePerformanceCommentListQuery } from "../../../querys/performance/usePerformanceCommentListQuery";
import { usePerformanceListQuery } from "../../../querys/performance/usePerformanceListQuery";
import FeedCommentList from "../../../components/feed/FeedCommentList/FeedCommentList";
import FeedCommentSubmit from "../../../components/feed/FeedCommentSubmit/FeedCommentSubmit";

function FeedDetail(props) {
  const [searchParams, setSearchParams] = useSearchParams(); // 주소창 params에서 공연 id 가져옴

  const performanceListQuery = usePerformanceListQuery(); // 공연 목록 query
  const performanceList = performanceListQuery?.data?.data?.body;
  // params의 performanceId와 일치하는 공연 상세정보 객체
  const performanceDetail = performanceList?.find(
    (performance) =>
      performance?.performanceId === parseInt(searchParams.get("performanceId"))
  );

  const commentQuery = usePerformanceCommentListQuery(
    // db에서 특정 공연 id의 공연 정보에 달린 댓글 목록 가져오는 쿼리
    searchParams.get("performanceId")
  );
  const comments = commentQuery?.data?.data?.body;

  const [currentIdx, setCurrentIdx] = useState(-1);
  const [prev, setPrev] = useState(-1);
  const [next, setNext] = useState(-1);

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
    <>
      <div css={s.feedLayout}>
        <header css={s.header}>
          <h2>{performanceDetail?.performanceTitle}</h2>
          <div css={s.headerPerformanceInfoContainer}>
            <div>
              <p>
                {!!performanceDetail?.isForeign ? "내한" : "국내"}{" "}
                {!!performanceDetail?.isFestival ? "페스티벌" : "공연"}
              </p>
            </div>
            <div>
              <p>
                댓글 {comments?.filter((comment) => !comment?.deletedAt).length}
              </p>
            </div>
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
            {!!comments && (
              <FeedCommentList performanceDetail={performanceDetail} />
            )}
          </div>
          <div css={s.feedCommentSubmitContainer}>
            <FeedCommentSubmit />
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
    </>
  );
}

export default FeedDetail;
