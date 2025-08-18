import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const imgContainerLayout = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px;
  width: 100%;
  max-height: 40vh;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const imgContainer = css`
  display: flex;
  max-width: 320px;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

export const imgInput = css`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const inputListContainerLayout = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  padding-bottom: 30px;
  width: 100%;
  overflow-y: scroll;
`;

export const inputListContainer = css`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

export const inputTicketingContainer = css`
  display: flex;
  flex-direction: row;
  width: 80%;
  gap: 10px;
`;

export const menuText = css`
  width: 100px;
`;

export const urlAddRemoveButtonsContainer = css`
  font-size: 20px;
  align-content: center;
`;

export const inputTicketingAgencyNameContainer = css`
  flex: 1;
  max-width: 150px;
  align-content: center;

  & > input {
    width: 100%;
    height: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

export const inputTicketingUrlContainer = css`
  flex: 3;
  max-width: 768px;
  min-width: 300px;
  align-content: center;

  & > input {
    width: 100%;
    height: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;
