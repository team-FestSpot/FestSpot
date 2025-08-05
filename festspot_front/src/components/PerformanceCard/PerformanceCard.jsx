/** @jsxImportSource @emotion/react */
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import * as s from "./styles";
import React from "react";

function PerformanceCard({ performanceList }) {
  console.log(performanceList);
  return (
    <ResponsiveMasonry
      style={{
        display: "-webkit-box" /* Not needed if autoprefixing */,
        display: "-ms-flexbox" /* Not needed if autoprefixing */,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
      }}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
      columnsCountBreakPoints={{
        1: 3,
        767: 4,
        1024: 3,
      }}
    >
      <Masonry
        itemStyle={{
          backgroundClip: "padding-box",
          marginTop: "5px",
        }}
        style={{}}
      >
        {performanceList.map((performance) => (
          <div css={s.cardContainer}>
            <div css={s.performanceDate}>
              {performance.prfpdfrom === performance.prfpdto ? (
                <span>{performance.prfpdfrom.slice(-5)}</span>
              ) : (
                <span>
                  {performance.prfpdfrom.slice(-5)} ~{" "}
                  {performance.prfpdto.slice(-5)}
                </span>
              )}
            </div>
            <div css={s.card}>
              <img src={performance.poster} alt="" />
            </div>
            <div css={s.performanceName}>
              <span>{performance.prfnm}</span>
            </div>
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}

export default PerformanceCard;
