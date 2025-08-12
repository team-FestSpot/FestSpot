import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #d5d5d577;
`;

export const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 768px;
  height: 900px;
  background-color: white;
  overflow-y: scroll;
`;

export const closeModalButton = css`
  display: flex;
  justify-content: right;
  width: 100%;
  font-size: 24px;
`;

export const mainContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const imgContainer = css`
  display: flex;
  width: 450px;
  height: 600px;

  & > img {
    width: 100%;
    height: 100%;
  }
`;
