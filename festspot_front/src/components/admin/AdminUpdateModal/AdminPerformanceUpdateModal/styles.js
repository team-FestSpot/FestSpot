import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #d5d5d577;

  .modal-content {
    display: flex;
    position: static;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #fff;

    @media (min-width: 768px) {
      width: 50%;
    }
  }
`;

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

export const closeModalButton = css`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 1000; /* 다른 요소들보다 위에 */

  @media (min-width: 768px) {
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

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: start;
    width: 95%;

    & > div:first-of-type {
      height: 3rem;
    }
  }
`;

export const inputBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
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
  flex-direction: column;
  width: 100%;
  gap: 1rem;

  @media (max-width: 1024px) {
    width: 95%;
  }
`;

export const ticketingInputs = css`
  display: flex;
  width: 100%;

  & > div:first-of-type {
    width: 30%;
    gap: 2rem;
  }

  & > div:nth-of-type(2) {
    margin-left: 2rem;
    width: 65%;
  }
`;

export const urlAddRemoveButtonsContainer = css`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  align-items: center;
`;

export const modifyButtonContainer = css`
  & > Button {
    font-size: 14px;
  }
`;
