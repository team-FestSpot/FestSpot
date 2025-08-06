import { css } from "@emotion/react";

export const calendarWrapper = css`
  .react-calendar {
    border: none;
    border-radius: 12px;
    padding: 20px;
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    font-family: "Pretendard", sans-serif;
  }

  /* 요일 헤더 */
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: none;
    font-weight: bold;
    color: #777;
  }

  /* 날짜 셀 기본 스타일 */
  .react-calendar__tile {
    padding: 12px 0;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  /* hover 시 */
  .react-calendar__tile:hover {
    background: rgba(239, 90, 57, 0.15);
    color: #ef5a39;
  }

  /* 선택된 날짜 */
  .react-calendar__tile--active {
    background: #ef5a39;
    color: white;
    font-weight: bold;
  }

  /* 오늘 날짜 */
  .react-calendar__tile--now {
    border: 1px solid #ef5a39;
    background: white;
    color: #ef5a39;
  }

  /* 이벤트 날짜 표시 */
  .event-day {
    position: relative;
  }

  .event-day::after {
    content: "";
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background-color: #ef5a39;
    border-radius: 50%;
  }
`;
