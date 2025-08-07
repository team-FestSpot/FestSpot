import { css } from "@emotion/react";

export const calendarContainer2 = css`
  width: 100%;

  //캘린더
  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 20px;
    overflow: hidden;

    box-shadow: inset -0.5px 0 0 #ccc, inset 0 -0.5px 0 #ccc,
      inset 0.5px 0 0 #ccc;
  }

  // 달력 헤더
  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5vh 2vw;
    background: linear-gradient(135deg, #ef5a39 0%, #e94825 100%);
    margin-bottom: 0;
    height: auto;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: #ff876cff;
      background-size: 200% 100%;
      animation: gradientShift 3s ease-in-out infinite;
    }
  }

  // ####년 ##월 라벨
  .react-calendar__navigation__label {
    font-size: 20px;
    font-weight: 700;
    color: white;
    background: none;
    border: none;
    cursor: pointer;
    flex-grow: 1;
    text-align: center;
    pointer-events: none;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    letter-spacing: -0.5px;
  }

  // 월 이동 화살표
  .react-calendar__navigation__arrow {
    /* background: rgba(255, 255, 255, 0.06); */
    border: 1px solid rgba(255, 255, 255, 0.2);
    font-size: 20px;
    color: white;
    cursor: pointer;
    padding: 8px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3vw;
    height: 4vh;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);

    &:hover {
      background-color: blue;
      transform: translateY(-2px);
      /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); */
    }

    &:active {
      transform: translateY(0);
    }
  }

  //요일 헤더 스타일 (요일 전체)
  .react-calendar__month-view__weekdays__weekday {
    padding: 18px 8px;
    text-align: center;
    font-size: 13px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;

    abbr {
      text-decoration: none;
    }

    /* 일요일 스타일 */
    &:first-child {
      color: #e74c3c;
      font-weight: 700;
    }

    /* 토요일 스타일 */
    &:last-child {
      color: #3498db;
      font-weight: 700;
    }
  }

  //요일 헤더 스타일 (오늘 요일)
  .react-calendar__month-view__weekdays__weekday--current {
    /* background-color: red; */
  }

  // 모든 타일
  .react-calendar__tile {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    font-size: 12px;
    padding: 0;
    overflow: hidden;
    box-shadow: inset -0.5px 0 0 #ccc, inset 0 -0.5px 0 #ccc; /* 오른쪽과 아래에 선 */

    width: calc(100% / 7);
    height: 7vh;
  }

  //요일별 색 입히기
  //평일
  .react-calendar__tile:not(
      :nth-child(7n),
      :nth-child(7n-6),
      .react-calendar__month-view__days__day--neighboringMonth
    ) {
    color: black;
    background-color: white;
  }
  //토요일
  .react-calendar__tile:nth-child(7n):not(
      .react-calendar__month-view__days__day--neighboringMonth
    ) {
    color: #7066e0;
    background-color: #7066e025;
  }
  //일요일
  .react-calendar__tile:nth-child(7n-6):not(
      .react-calendar__month-view__days__day--neighboringMonth
    ) {
    color: #ff404dff;
    background-color: #ff404d25;
  }

  //오늘
  .react-calendar__tile--now {
    background-color: none;
    border: none;

    background-color: #ff876c28 !important;
  }
`;

export const dayTile = (date) => css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding: 5px;

  width: 100%;
  height: 100%;
`;

export const perform = (isFestival, isForeign) => css`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: white;

  background-color: #ef5a39;
  background-color: ${isFestival === "Y" && "#B2EAFF"};
  background-color: ${isForeign === "Y" && "#D4F0CB"};
`;

export const performFrom = (isFestival, isForeign) => css`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: white;

  width: 300%;

  background-color: blue;
  background-color: ${isFestival === "Y" && "#B2EAFF"};
  background-color: ${isForeign === "Y" && "#D4F0CB"};
`;

export const performTo = (isFestival, isForeign) => css`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: white;

  background-color: blue;
  background-color: ${isFestival === "Y" && "#B2EAFF"};
  background-color: ${isForeign === "Y" && "#D4F0CB"};
`;

//=====================================================================

// react-calendar 전체 컨테이너 스타일 오버라이드
export const calendarContainer = css`
  .react-calendar {
    max-width: 1200px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Malgun Gothic",
      sans-serif;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(239, 90, 57, 0.1),
      0 4px 12px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(239, 90, 57, 0.1);
    width: 100%;
    overflow: hidden;
  }

  /* 네비게이션 헤더 스타일 */
  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 28px;
    background: linear-gradient(135deg, #ef5a39 0%, #e94825 100%);
    margin-bottom: 0;
    height: auto;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #ef5a39, #ff7b5a, #ef5a39);
      background-size: 200% 100%;
      animation: gradientShift 3s ease-in-out infinite;
    }
  }

  @keyframes gradientShift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  .react-calendar__navigation__label {
    font-size: 22px;
    font-weight: 700;
    color: white;
    background: none;
    border: none;
    cursor: pointer;
    flex-grow: 1;
    text-align: center;
    pointer-events: none;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    letter-spacing: -0.5px;
  }

  .react-calendar__navigation__arrow {
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    font-size: 20px;
    color: white;
    cursor: pointer;
    padding: 12px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    height: 44px;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);

    &:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0);
    }
  }

  /* 월 뷰 스타일 */
  .react-calendar__month-view {
    padding: 0;
  }

  /* 요일 헤더 스타일 */
  .react-calendar__month-view__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background: linear-gradient(135deg, #fef7f5 0%, #fff 100%);
    border-bottom: 2px solid rgba(239, 90, 57, 0.1);
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 18px 8px;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    color: #ef5a39;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;

    abbr {
      text-decoration: none;
    }

    /* 일요일 스타일 */
    &:first-child {
      color: #e74c3c;
      font-weight: 700;
    }

    /* 토요일 스타일 */
    &:last-child {
      color: #3498db;
      font-weight: 700;
    }
  }

  /* 날짜 그리드 스타일 */
  .react-calendar__month-view__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px;
    background: rgba(239, 90, 57, 0.05);
    padding: 1px;
  }

  /* 각 날짜 타일 스타일 */
  .react-calendar__tile {
    min-height: 130px;
    padding: 12px;
    position: relative;
    background: white;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
      background: linear-gradient(135deg, #fff5f3 0%, #ffffff 100%);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(239, 90, 57, 0.15);
    }

    &--active {
      background: linear-gradient(135deg, #ef5a39 0%, #e94825 100%);
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(239, 90, 57, 0.3);

      abbr {
        color: white !important;
      }
    }

    &--neighboringMonth {
      background: #f8f9fa;
      color: #adb5bd;

      &:hover {
        background: #f1f3f4;
        transform: none;
        box-shadow: none;
      }
    }
  }

  /* 날짜 숫자 스타일 */
  .react-calendar__tile abbr {
    font-size: 16px;
    font-weight: 600;
    color: #2c3e50;
    text-decoration: none;
    margin-bottom: 8px;
    padding: 4px 8px;
    border-radius: 6px;
    transition: all 0.2s ease;
    min-width: 32px;
    text-align: center;
  }

  /* 이웃한 달의 날짜 스타일 */
  .react-calendar__tile--neighboringMonth abbr {
    color: #adb5bd;
  }

  /* 오늘 날짜 스타일 */
  .react-calendar__tile--now {
    background: linear-gradient(135deg, #fff3e0 0%, #ffe4cc 100%);
    border: 2px solid #ef5a39;

    abbr {
      background: linear-gradient(135deg, #ef5a39 0%, #e94825 100%);
      color: white !important;
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(239, 90, 57, 0.3);
    }

    &:hover {
      background: linear-gradient(135deg, #ffebe0 0%, #ffd4b8 100%);
    }
  }

  /* 선택된 날짜가 오늘인 경우 */
  .react-calendar__tile--now.react-calendar__tile--active {
    border-color: white;

    abbr {
      background: rgba(255, 255, 255, 0.2);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
  }

  /* 일요일 날짜 숫자 색상 */
  .react-calendar__tile:nth-child(7n + 1):not(
      .react-calendar__tile--neighboringMonth
    ):not(.react-calendar__tile--active)
    abbr {
    color: #e74c3c;
  }

  /* 토요일 날짜 숫자 색상 */
  .react-calendar__tile:nth-child(7n):not(
      .react-calendar__tile--neighboringMonth
    ):not(.react-calendar__tile--active)
    abbr {
    color: #3498db;
  }
`;

// 커스텀 이벤트 스타일들
export const eventBase = css`
  font-size: 11px;
  padding: 4px 8px;
  margin: 2px 0;
  border-radius: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    transform: translateX(2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    border-radius: 3px 0 0 3px;
  }
`;

export const eventFestival = css`
  background: linear-gradient(135deg, #e8f5e8 0%, #d4f4d4 100%);
  color: #166534;
  border: 1px solid rgba(34, 197, 94, 0.2);

  &::before {
    background: linear-gradient(180deg, #22c55e, #16a34a);
  }

  &:hover {
    background: linear-gradient(135deg, #dcf4dc 0%, #bbf7bb 100%);
    border-color: rgba(34, 197, 94, 0.3);
  }
`;

export const eventMusic = css`
  background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
  color: #991b1b;
  border: 1px solid rgba(239, 68, 68, 0.2);

  &::before {
    background: linear-gradient(180deg, #ef4444, #dc2626);
  }

  &:hover {
    background: linear-gradient(135deg, #fee2e2 0%, #fca5a5 100%);
    border-color: rgba(239, 68, 68, 0.3);
  }
`;

export const eventSpecial = css`
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  color: #1e40af;
  border: 1px solid rgba(59, 130, 246, 0.2);

  &::before {
    background: linear-gradient(180deg, #3b82f6, #2563eb);
  }

  &:hover {
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    border-color: rgba(59, 130, 246, 0.3);
  }
`;

export const eventConcert = css`
  background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%);
  color: #c2410c;
  border: 1px solid rgba(249, 115, 22, 0.2);

  &::before {
    background: linear-gradient(180deg, #f97316, #ea580c);
  }

  &:hover {
    background: linear-gradient(135deg, #ffedd5 0%, #fdba74 100%);
    border-color: rgba(249, 115, 22, 0.3);
  }
`;

export const eventDefault = css`
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  color: #475569;
  border: 1px solid rgba(148, 163, 184, 0.2);

  &::before {
    background: linear-gradient(180deg, #94a3b8, #64748b);
  }

  &:hover {
    background: linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%);
    border-color: rgba(148, 163, 184, 0.3);
  }
`;

// 타일 내부 컨텐츠 컨테이너
export const tileContent = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-top: 4px;
`;
