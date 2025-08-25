import { css } from "@emotion/react";

export const adminGridLayout = css`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export const modifyProfileImg = css`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const modifyGrid = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  & > input {
    text-align: center;
    width: 100%;
    box-sizing: border-box;
  }
`;

export const modifyButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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
