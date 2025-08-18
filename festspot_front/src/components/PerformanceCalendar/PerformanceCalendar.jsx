/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ko from "@fullcalendar/core/locales/ko";
import interactionPlugin from "@fullcalendar/interaction";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import "tippy.js/animations/scale-extreme.css";
import ReactDOM from "react-dom/client";
import { css, Global } from "@emotion/react";
import {
  getDateDashForm,
  getTommorowDateDashForm,
} from "../../utils/getDateForm";
import { getLocalDate } from "../../utils/getLocalDate";
import { DayClickTippy } from "../tippy/dayClickTippy";
import { PerformanceEventTippy } from "../tippy/performanceEventTippy";

function PerformanceCalendar({ performanceList }) {
  const setPerformanceEvents = (e) => {
    const performanceEvents = performanceList.map((performance) =>
      performance.performanceStartDate === performance.performanceEndDate
        ? {
            title: performance.performanceTitle,
            start: performance.performanceStartDate,

            performanceCast: performance.performanceCast,
            performanceVenue: performance.performanceVenue,
            isFestival: performance.isFestival,
            isForeign: performance.isForeign,
            ticketingUrls: performance.ticketingUrls,
          }
        : {
            title: performance.performanceTitle,
            start: performance.performanceStartDate,
            end: getTommorowDateDashForm(performance.performanceEndDate),

            performanceCast: performance.performanceCast,
            performanceVenue: performance.performanceVenue,
            isFestival: performance.isFestival,
            isForeign: performance.isForeign,
            ticketingUrls: performance.ticketingUrls,
          }
    );

    return performanceEvents;
  };

  const performEventBoxStyle = (info) => {
    const { isFestival, isForeign } = info.event.extendedProps;
    const eventBoxStyle = info.el.style;

    // 스타일 변경하기 위한 변수
    if (isFestival) {
      eventBoxStyle.backgroundColor = "#ffda77"; // 예: 노란색
    } else if (isForeign) {
      eventBoxStyle.backgroundColor = "#a2d2ff"; // 예: 파란색
    } else {
      eventBoxStyle.backgroundColor = "#FBD8D0"; // 일반 공연 회색
    }

    //공통 스타일
    eventBoxStyle.color = "red";
    eventBoxStyle.border = "none";
  };

  const eventOnDay = (info) => {
    const dayCellDate = getDateDashForm(getLocalDate(info.date));
    const eventsListOnDate = performanceList.filter(
      (event) => event.performanceStartDate === dayCellDate
    );
    return eventsListOnDate;
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
          dayMaxEvents={3}
          moreLinkContent={(eventCount) => `${eventCount.shortText}`}
          headerToolbar={{
            left: "prev", // 왼쪽
            center: "title", // 가운데
            right: "next", // 오른쪽
          }}
          dayCellContent={(arg) => String(arg.date.getDate())}
          dayCellDidMount={(info) => {
            const eventsListOnDate = eventOnDay(info);
            DayClickTippy(info, eventsListOnDate);
          }}
          eventDidMount={(info) => {
            info.el.addEventListener("click", (e) => e.stopPropagation());
            performEventBoxStyle(info);
            PerformanceEventTippy(info);
          }}
          height={"100%"}
        ></FullCalendar>
      </div>
    </>
  );
}

export default PerformanceCalendar;
