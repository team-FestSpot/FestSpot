/** @jsxImportSource @emotion/react */
import PerformanceCalendar from "../../components/PerformanceCalendar/PerformanceCalendar";
import PerformanceCard from "../../components/PerformanceCard/PerformanceCard";
import { usePerformanceListQuery } from "../../querys/performance/usePerformanceListQuery";
import * as s from "./styles";
import React from "react";

function Home(props) {
  const listData = JSON.parse(localStorage.getItem("data"));

  const performanceListQuery = usePerformanceListQuery();
  const performanceList = performanceListQuery.isFetched
    ? performanceListQuery?.data?.data?.body
    : [];

  return (
    <div css={s.homeLayout}>
      <div css={s.homeLeftSide}>
        <div css={s.performanceCardSection}>
          <PerformanceCard performanceList={performanceList} />
        </div>
      </div>
      <div css={s.homeRightSide}>
        <div css={s.CalendarSection}>
          <PerformanceCalendar performanceList={performanceList} />
        </div>
      </div>
    </div>
  );
}

export default Home;
