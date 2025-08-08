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
        768: 4,
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
          <div>
            <div css={s.performanceCard}>
              <div css={s.posterContainer}>
                <img src={performance.poster} />
                <div css={s.dateBox}>
                  {performance.prfpdfrom === performance.prfpdto ? (
                    <p>{performance.prfpdfrom.slice(-5)}</p>
                  ) : (
                    <p>
                      {performance.prfpdfrom.slice(-5)} ~
                      {performance.prfpdto.slice(-5)}
                    </p>
                  )}
                </div>
              </div>
              <div css={s.content}>
                <div>{performance.fcltynm}</div>
                <div>
                  <h3>{performance.prfnm}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}

export default PerformanceCard;
