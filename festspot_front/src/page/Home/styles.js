import { css } from "@emotion/react";
import { width } from "@mui/system";

export const homeLayout = css`
  display: flex;

  @media (max-width: 1024px) {
    flex-direction: column;
  }

  width: 100%;
  height: 85%;
`;

export const homeLeftSide = css`
  @media (max-width: 1024px) {
    width: 100%;
    border-right: none;
  }

  box-sizing: border-box;
  box-shadow: inset -0.5px 0 0 #ccc;
  width: 45%;
  margin: 0;
  padding-right: 10px;
`;

export const performanceCardSection = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const homeRightSide = css`
  display: flex;
  flex-direction: column;
  width: 55%;
  flex-grow: 1;
  padding-left: 10px;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const CalendarSection = css`
  display: flex;
  width: 100%;
  height: 100%;
`;
