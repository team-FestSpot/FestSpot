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

export const homeRightSide = css`
  flex-grow: 1;
  background-color: blue;
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

export const CalendarSection = css``;

export const ComunitySection = css``;
