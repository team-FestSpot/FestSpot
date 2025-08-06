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
  border-right: 1px solid #dbdbdb;
  width: 45%;
  margin: 0;
  padding: 5px;
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
  flex-grow: 1;
  width: 55%;
`;

export const CalendarSection = css`
  display: flex;
  flex-grow: 1;
  width: 100%;
`;

export const ComunitySection = css`
  flex-grow: 1;
`;
