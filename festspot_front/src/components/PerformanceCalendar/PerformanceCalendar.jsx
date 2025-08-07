/** @jsxImportSource @emotion/react */
import Calendar from "react-calendar";
import * as s from "./styles";
import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { getLocalDotDate } from "../../utils/getLocalDate";

function PerformanceCalendar() {
  const performList = JSON.parse(localStorage.getItem("data"));
  console.log(performList);

  const renderTileContent = ({ date, view }) => {
    return (
      <div css={s.dayTile(date)}>
        <div>{date.getDate()}</div>
        {performList.map((perform) => {
          // if (perform.prfpdfrom === perform.prfpdto) {
          //   if (perform.prfpdfrom === getLocalDotDate(date)) {
          //     return <div css={s.perform()}>{perform.prfnm}</div>;
          //     //페스티벌, 내한공연 여부 넣어서 css 변경
          //   }
          // }
          if (perform.prfpdfrom !== perform.prfpdto) {
            if (perform.prfpdfrom === getLocalDotDate(date)) {
              return <div css={s.performFrom()}>{perform.prfnm}</div>;
              //페스티벌, 내한공연 여부 넣어서 css 변경
            }
            if (perform.prfpdto === getLocalDotDate(date)) {
              return <div css={s.performTo()}>{perform.prfnm}</div>;
              //페스티벌, 내한공연 여부 넣어서 css 변경
            }
          }
        })}
      </div>
    );
  };

  return (
    <div css={s.calendarContainer2}>
      <Calendar
        tileDisabled={({ date }) => date.getMonth() !== new Date().getMonth()}
        calendarType="hebrew"
        prevLabel="‹"
        nextLabel="›"
        prev2Label={null} // 년도 이동 버튼 숨김
        next2Label={null} // 년도 이동 버튼 숨김
        formatDay={(locale, date) => null}
        tileContent={renderTileContent}
      />
    </div>
  );
}

// const PerformanceCalendar = ({ events = [] }) => {
//   events = JSON.parse(localStorage.getItem("data")).map(
//     (performance) => performance.prfpdfrom
//   );

//   // 선택된 날짜
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   // Date 객체를 'YYYY-MM-DD' 형식의 문자열로 변환
//   const formatDateKey = (date) => {
//     return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
//       2,
//       "0"
//     )}.${String(date.getDate()).padStart(2, "0")}`;
//   };

//   // 특정 날짜의 이벤트들을 가져오는 함수
//   const getEventsForDate = (date) => {
//     const dateString = formatDateKey(date);
//     // events 배열에서 해당 날짜의 이벤트들 필터링
//     // 예상 데이터 형태: { date: '2025-08-01', title: '이벤트명', type: 'music' }
//     return events.filter((event) => event.date === dateString);
//   };

//   // 이벤트 타입에 따른 스타일을 반환하는 함수
//   const getEventStyle = (eventType) => {
//     const baseStyles = [s.eventBase];

//     switch (eventType) {
//       case "festival":
//         baseStyles.push(s.eventFestival);
//         break;
//       case "music":
//         baseStyles.push(s.eventMusic);
//         break;
//       case "special":
//         baseStyles.push(s.eventSpecial);
//         break;
//       case "concert":
//         baseStyles.push(s.eventConcert);
//         break;
//       default:
//         baseStyles.push(s.eventDefault);
//         break;
//     }

//     return baseStyles;
//   };

//   // 각 날짜 타일에 커스텀 내용을 렌더링하는 함수
//   const renderTileContent = ({ date, view }) => {
//     // 월 뷰에서만 이벤트 표시
//     if (view !== "month") return null;

//     // 해당 날짜의 이벤트들 가져오기
//     const dayEvents = getEventsForDate(date);

//     // 이벤트가 없으면 null 반환
//     if (dayEvents.length === 0) return null;

//     return (
//       <div css={s.tileContent}>
//         {/* 해당 날짜의 이벤트들을 순서대로 표시 */}
//         {dayEvents.map((event, eventIndex) => (
//           <div
//             key={eventIndex}
//             css={getEventStyle(event.type)}
//             title={event.title} // 호버 시 전체 제목 표시
//           >
//             {event.title}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     /* 전체 달력 컨테이너 - emotion 스타일 적용 */
//     <div css={s.calendarContainer}>
//       <Calendar
//         // 선택된 날짜
//         onChange={setSelectedDate}
//         // 각 타일에 커스텀 내용 렌더링 (이벤트 표시)
//         tileContent={renderTileContent}
//         tileDisabled={({ date }) => date.getMonth() !== new Date().getMonth()}
//         // 일요일부터 시작하는 달력 설정 (일월화수목금토 순서)
//         calendarType="hebrew"
//         showWeekNumbers={false}
//         // 이전/다음 버튼 텍스트 설정
//         prevLabel="‹"
//         nextLabel="›"
//         prev2Label={null} // 년도 이동 버튼 숨김
//         next2Label={null} // 년도 이동 버튼 숨김
//         // 날짜 클릭 시 이벤트 핸들러 (필요시 사용)
//         onClickDay={(date) => {
//           console.log("선택된 날짜:", formatDateKey(date));
//           const dayEvents = getEventsForDate(date);
//           console.log("해당 날짜 이벤트들:", dayEvents);
//         }}
//       />
//     </div>
//   );
// };

export default PerformanceCalendar;
