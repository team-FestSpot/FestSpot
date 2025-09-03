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
  width: 100%;
  max-width: 130rem;
  height: 70rem;
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
