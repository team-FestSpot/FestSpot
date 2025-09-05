import { css } from "@emotion/react";

export const adminGridLayout = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: column; // 변경
  justify-content: flex-start; // 변경
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2rem; // 추가
`;

export const dataGridContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70rem;
`;

export const imgContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  & > img {
    width: 100%;
    height: auto;
  }
`;

export const paginationButtonLayout = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const updateModalLayout = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
