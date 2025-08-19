/** @jsxImportSource @emotion/react */
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import * as s from "./styles";
import React from "react";
import { usePerformanceListQuery } from "../../querys/performance/usePerformanceListQuery";
import { getDateDotForm } from "../../utils/getDateForm";

function PerformanceCard({ performanceList }) {
  return (
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
              <div css={s.performanceCard}>
                <div css={s.posterContainer}>
                  <img src={performance.performancePosterUrl} />
                  <div css={s.dateBox}>
                    {performance.performanceStartDate === // 시작 날짜와 끝나는 날짜가 같으면 하나만 출력
                    performance.performanceEndDate ? (
                      <p>
                        {getDateDotForm(performance.performanceStartDate).slice(
                          -5
                        )}
                      </p>
                    ) : (
                      <p>
                        {getDateDotForm(performance.performanceStartDate).slice(
                          -5
                        )}{" "}
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
  );
}

export default PerformanceCard;
