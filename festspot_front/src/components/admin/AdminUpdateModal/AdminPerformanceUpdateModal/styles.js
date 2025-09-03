import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #d5d5d577;
`;

// export const container = css`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   width: 768px;
//   height: 800px;
//   background-color: white;
//   overflow: scroll;
// `;

export const mainContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 95%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const imgBox = css`
  display: flex;
  justify-content: center;
  width: 30rem;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

export const inputFileComponent = css`
  display: flex;
  justify-content: center;
`;

export const inputComponent = css`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 4rem;

  & > div:first-of-type {
    display: flex;
    justify-content: start;
    width: 10rem;
  }
`;

export const inputBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  width: 100%;
  height: 2.5rem;

  & > input {
    width: 100%;
    border: none;
    outline: none;
  }
`;

export const selectBox = css`
  display: flex;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
`;

export const ticketingInputContainer = css`
  display: flex;
  flex-direction: row;
  align-items: start;
  width: 100%;
  gap: 1rem;

  & > div:first-of-type {
    width: 25%;
  }

  & > div:nth-of-type(2) {
    width: 65%;
  }
`;

export const urlAddRemoveButtonsContainer = css`
  margin-left: 0.8rem;
  align-content: center;
  width: 3.2rem;
  height: 4rem;
  font-size: 2rem;
`;

export const modifyButtonContainer = css`
  & > Button {
    font-size: 14px;
  }
`;
