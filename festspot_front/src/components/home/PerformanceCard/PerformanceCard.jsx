/** @jsxImportSource @emotion/react */
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import * as s from "./styles";
import React, { useRef, useState } from "react";
import { usePerformanceListQuery } from "../../../querys/performance/usePerformanceListQuery";
import { getDateDotForm } from "../../../utils/getDateForm";
import PerformanceDetailModal from "../performanceDetailModal/PerformanceDetailModal";
import Modal from "@mui/material/Modal";

function PerformanceCard({ performanceList }) {
  const [open, setOpen] = useState(false);
  const [clickedPerformance, setClickedPerformance] = useState({});
  const handlePerformanceCardOnClick = (e, performance) => {
    setClickedPerformance(performance);
    setOpen(true);
  };

  return (
    <>
      <ResponsiveMasonry
        style={{
          display: "-webkit-box",
          display: "-ms-flexbox",
          justifyContent: "center",
          alignContent: "center",
          width: "100%",
        }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        columnsCountBreakPoints={{
          1: 3,
          768: 4,
          1024: 3, // 반응형
        }}
      >
        <Masonry
          itemStyle={{
            backgroundClip: "padding-box",
            marginTop: "5px",
          }}
          style={{}}
        >
          {!!performanceList.length &&
            performanceList.map((performance) => (
              <>
                <div
                  key={performance.performanceId}
                  css={s.performanceCard}
                  onClick={(e) => handlePerformanceCardOnClick(e, performance)}
                >
                  <div css={s.posterContainer}>
                    <img src={performance.performancePosterUrl} />
                    <div css={s.dateBox}>
                      {performance.performanceStartDate === // 시작 날짜와 끝나는 날짜가 같으면 하나만 출력
                      performance.performanceEndDate ? (
                        <p>
                          {getDateDotForm(
                            performance.performanceStartDate
                          ).slice(-5)}
                        </p>
                      ) : (
                        <p>
                          {getDateDotForm(
                            performance.performanceStartDate
                          ).slice(-5)}{" "}
                          ~
                          {getDateDotForm(performance.performanceEndDate).slice(
                            -5
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                  <div css={s.content}>
                    <div>{performance.performanceVenue}</div>
                    <div>
                      <h3>{performance.performanceTitle}</h3>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </Masonry>
      </ResponsiveMasonry>
      <PerformanceDetailModal
        isOpen={open}
        setOpen={setOpen}
        performance={clickedPerformance}
      />
    </>
  );
}

export default PerformanceCard;
