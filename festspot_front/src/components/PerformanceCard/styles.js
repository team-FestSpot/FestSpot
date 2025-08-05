import { css } from "@emotion/react";

export const performanceDate = css`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  font-size: 14px;
`;

export const cardContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 50px;
`;

export const card = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20vh;
  max-height: 100%;

  & > img {
    height: 100%;
    max-width: 100%;
  }
`;

export const performanceName = css`
  display: flex;
  flex-grow: 1;
  height: 40px;
  width: 100%;
  overflow: hidden;

  & > span {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;
