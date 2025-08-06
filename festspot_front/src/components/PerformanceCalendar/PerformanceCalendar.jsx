/** @jsxImportSource @emotion/react */
import Calendar from "react-calendar";
import * as s from "./styles";
import React, { useState } from "react";

function PerformanceCalendar(props) {
  const [value, setValue] = useState(new Date());

  // 예시: 이벤트 날짜
  const events = [
    new Date(2025, 7, 2),
    new Date(2025, 7, 15),
    new Date(2025, 7, 22),
    new Date(2025, 7, 28),
  ];

  const isEventDay = (date) => {
    return events.some(
      (eventDate) =>
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
    );
  };

  return (
    <div css={s.calendarWrapper}>
      <Calendar
        onChange={setValue}
        value={value}
        tileClassName={({ date, view }) => {
          if (view === "month" && isEventDay(date)) {
            return "event-day";
          }
        }}
      />
    </div>
  );
}

export default PerformanceCalendar;
