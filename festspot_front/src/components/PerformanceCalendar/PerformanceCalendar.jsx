/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ko from "@fullcalendar/core/locales/ko";
import { getDateForm, getTommorowDateForm } from "../../utils/getDateForm";

function PerformanceCalendar() {
  const performList = JSON.parse(localStorage.getItem("data"));

  const handleGetPerformEvents = (e) => {
    return performList.map((perform) =>
      perform.prfpdfrom === perform.prfpdto
        ? {
            title: perform.prfnm,
            start: getDateForm(perform.prfpdfrom),
            isFestival: 0,
            isForeign: 0,
          }
        : {
            title: perform.prfnm,
            start: getDateForm(perform.prfpdfrom),
            end: getTommorowDateForm(perform.prfpdto),
            isFestival: 0,
            isForeign: 0,
          }
    );
  };

  const eventRenderCountRef = useRef({});
  const hendlePerformBoxStyle = (info) => {
    const { isFestival, isForeign } = info.event.extendedProps;
    const dateKey = info.event.startStr;
    const eventRenderCount = eventRenderCountRef.current;

    // 날짜별 카운트가 없으면 초기화
    if (!eventRenderCount[dateKey]) {
      eventRenderCount[dateKey] = 0;
    }

    // 3개까지만 표시하고 이후는 숨김
    if (eventRenderCount[dateKey] >= 3) {
      info.el.style.display = "none";
      return;
    }

    console.log(eventRenderCountRef);
    eventRenderCount[dateKey]++;

    if (isFestival) {
      info.el.style.backgroundColor = "#ffda77"; // 예: 노란색
    } else if (isForeign) {
      info.el.style.backgroundColor = "#a2d2ff"; // 예: 파란색
    } else {
      info.el.style.backgroundColor = "#ef5a393d"; // 일반 공연 회색
    }
  };

  const handleDateChange = () => {
    eventRenderCountRef.current = {}; // 매달 초기화
  };

  return (
    <div css={s.calendarContainer2}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale={ko}
        events={handleGetPerformEvents()}
        headerToolbar={{
          left: "prev", // 왼쪽
          center: "title", // 가운데
          right: "next", // 오른쪽
        }}
        dayCellContent={(arg) => String(arg.date.getDate())}
        eventDidMount={(info) => {
          hendlePerformBoxStyle(info);
        }}
        datesSet={handleDateChange}
        height={"100%"}
      ></FullCalendar>
    </div>
  );
}

export default PerformanceCalendar;
