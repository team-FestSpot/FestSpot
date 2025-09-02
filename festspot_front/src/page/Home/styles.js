import { css } from "@emotion/react";

export const homeLayout = css`
  display: flex;
  width: 100%;
  height: 95%;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const homeLeftSide = css`
  height: 100%;
  box-sizing: border-box;
  width: 45%;
  margin: 0;
  margin-right: 10px;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const divider = css`
  height: 100%;
  width: 0.05rem;
  background-color: #ccc;

  @media (max-width: 1024px) {
    display: none;
  }
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
  height: 100%;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const CalendarSection = css`
  display: flex;
  width: 100%;
  height: 100%;
`;
