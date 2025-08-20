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
  width: 100%;
  height: 100vh;
  gap: 10px;
`;

export const imgContainer = css`
  display: flex;
  max-width: 450px;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

export const inputComponent = css`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 80%;
  height: auto;
  gap: 10px;
`;

export const ticketingInputContainer = css`
  display: flex;
  flex-direction: row;
  width: auto;
`;

export const urlAddRemoveButtonsContainer = css`
  font-size: 20px;
  align-content: center;
`;
