import { css } from "@emotion/react";

export const calendarContainer2 = css`
  width: 100%;

  //스크롤 옵션
  .fc-scroller {
    ::-webkit-scrollbar {
      display: none;
    }
  }

  //헤더
  .fc-header-toolbar {
    margin: 2px !important;
  }
  //헤더 글자
  .fc-toolbar-title {
    font-size: medium;
  }
  //헤더 버튼
  .fc-button {
    border: none;
    background-color: #ef5a39;
  }

  .fc-day-today {
    background-color: #ffecd1 !important;
  }

  .fc-day-sun {
    background-color: #f8e4e4ff; /* 일요일: 연한 빨강 */
  }

  .fc-day-sat {
    background-color: #e6ecfcff; /* 토요일: 연한 파랑 */
  }

  .fc-daygrid-day-events {
    margin: 2px 0 !important;
  }

  //날짜 칸
  .fc-daygrid-day-top {
    font-size: 12px;
    & > a {
      padding: 0 4px;
    }
  }

  // daygrid 안의 event 박스
  .fc-scrollgrid-sync-inner {
    padding: 2px 5px;
  }

  //이벤트 글자
  .fc-event-title {
    font-size: 12px;
    font-weight: 400;
    color: black;
  }
`;
