import { css } from "@emotion/react";
import { width } from "@mui/system";

export const homeLayout = css`
  display: flex;
  width: 100%;
  height: 85%;
`;

export const homeRightSide = css`
  box-sizing: border-box;
  border-right: 1px solid #dbdbdb;
  width: 45%;
  margin: 0;
  padding: 5px;
`;

export const performanceCardSection = css`
  display: flex;
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

export const homeLeftSide = css`
  flex-grow: 1;
  background-color: blue;
`;

export const CalendarSection = css``;

export const ComunitySection = css``;
