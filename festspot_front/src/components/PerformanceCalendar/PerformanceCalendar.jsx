/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ko from "@fullcalendar/core/locales/ko";
import tippy from "tippy.js";
import interactionPlugin from "@fullcalendar/interaction";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import "tippy.js/animations/scale-extreme.css";
import ReactDOM from "react-dom/client";
import { css, Global } from "@emotion/react";
import { performanceEventTippy } from "../tippy/performanceEventTippy";
import { dayClickTippy } from "../tippy/dayClickTippy";

function PerformanceCalendar({ performanceList }) {
  const setPerformanceEvents = (e) => {
    return performanceList.map((performance) =>
      performance.performanceStartDate === performance.performanceEndDate
        ? {
            title: performance.performanceTitle,
            start: performance.performanceStartDate,
            isFestival: performance.isFestival,
            isForeign: performance.isForeign,
          }
        : {
            title: performance.performanceTitle,
            start: performance.performanceStartDate,
            end: performance.performanceEndDate,
            isFestival: performance.isFestival,
            isForeign: performance.isForeign,
          }
    );
  };

  const eventRenderCountRef = useRef({});
  const performEventBoxStyle = (info) => {
    const { isFestival, isForeign } = info.event.extendedProps;
    const eventRenderCount = eventRenderCountRef.current;
    const dateKey = info.event.startStr;

    // 날짜별 카운트가 없으면 초기화
    if (!eventRenderCount[dateKey]) {
      eventRenderCount[dateKey] = 0;
    }

    const eventBoxStyle = info.el.style;
    // 3개까지만 표시하고 이후는 숨김
    if (eventRenderCount[dateKey] >= 3) {
      eventBoxStyle.display = "none";
      return;
    }
    eventRenderCount[dateKey]++;

    // 스타일 변경하기 위한 변수
    if (isFestival) {
      eventBoxStyle.backgroundColor = "#ffda77"; // 예: 노란색
    } else if (isForeign) {
      eventBoxStyle.backgroundColor = "#a2d2ff"; // 예: 파란색
    } else {
      eventBoxStyle.backgroundColor = "#ef5a393d"; // 일반 공연 회색
    }
    //공통 스타일
    eventBoxStyle.color = "red";
    eventBoxStyle.border = "none";
  };

  //달 바뀔때마다 ref 초기화
  const handleDateOnChange = () => {
    eventRenderCountRef.current = {};
  };

  const handleDateClick = (info) => {
    const content = document.createElement("div");
    const root = ReactDOM.createRoot(content);
    root.render(<div>선택한 날짜 {info.dateStr}</div>);

    dayClickTippy(info, content);
  };

  return (
    <>
      <Global
        styles={css`
          .tippy-box {
            font-size: 14px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          }
          .fc-event-title {
            color: #474747 !important;
          }
        `}
      />
      <div css={s.calendarContainer2}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={ko}
          events={setPerformanceEvents()}
          headerToolbar={{
            left: "prev", // 왼쪽
            center: "title", // 가운데
            right: "next", // 오른쪽
          }}
          dayCellContent={(arg) => String(arg.date.getDate())}
          dateClick={handleDateClick}
          eventDidMount={(info) => {
            performEventBoxStyle(info);
            performanceEventTippy(info);
          }}
          datesSet={handleDateOnChange}
          height={"100%"}
        ></FullCalendar>
      </div>
    </>
  );
}

export default PerformanceCalendar;
