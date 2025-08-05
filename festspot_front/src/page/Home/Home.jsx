/** @jsxImportSource @emotion/react */
import PerformanceCard from "../../components/PerformanceCard/PerformanceCard";
import * as s from "./styles";
import React from "react";

function Home(props) {
  const listData = JSON.parse(localStorage.getItem("data"));

  console.log(listData);

  return (
    <div css={s.homeLayout}>
      <div css={s.homeRightSide}>
        <div css={s.performanceCardSection}>
          <PerformanceCard performanceList={listData}></PerformanceCard>
        </div>
      </div>
      <div css={s.homeLeftSide}>
        <div css={s.CalendarSection}></div>
        <div css={s.ComunitySection}></div>
      </div>
    </div>
  );
}

export default Home;
