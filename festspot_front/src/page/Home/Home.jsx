/** @jsxImportSource @emotion/react */
import PerformanceCalendar from "../../components/home/PerformanceCalendar/PerformanceCalendar";
import PerformanceCard from "../../components/home/PerformanceCard/PerformanceCard";
import { usePerformanceListQuery } from "../../querys/performance/usePerformanceListQuery";
import * as s from "./styles";
import React from "react";

function Home(props) {
  const performanceListQuery = usePerformanceListQuery();
  const performanceList = performanceListQuery.isSuccess
    ? performanceListQuery?.data?.data?.body
    : [];

  if (!!performanceList.length) {
    return (
      <div css={s.homeLayout}>
        <div css={s.homeLeftSide}>
          <div css={s.performanceCardSection}>
            <PerformanceCard performanceList={performanceList} />
          </div>
        </div>
        {/* <div css={s.divider}></div> */}
        <div css={s.homeRightSide}>
          <div css={s.CalendarSection}>
            <PerformanceCalendar performanceList={performanceList} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
