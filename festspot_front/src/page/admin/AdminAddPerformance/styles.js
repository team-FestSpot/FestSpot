import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  height: auto;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const imgContainerLayout = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 30vh;

  flex-shrink: 0;
  margin-bottom: 2rem;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const imgContainer = css`
  display: flex;
  max-width: 32rem;
  & > img {
    width: 100%;
    height: 100%;
  }
`;

export const emptyImgBox = css`
  display: flex;
  width: 32rem;
  height: 32rem;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
`;

export const imgInput = css`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40px;
  flex-shrink: 0;
`;

export const inputListContainerLayout = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  height: auto;
`;

export const inputListContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  flex-shrink: 0;

  /* @media (max-width: 1024px) {
    flex-direction: column;
  } */
`;

export const inputTicketingContainer = css`
  display: flex;
  flex-direction: row;
  width: 70%;
  gap: 10px;
  flex-shrink: 0;

  @media (max-width: 1400px) {
    flex-direction: column;
  }
`;

export const menuText = css`
  width: 10rem;

  @media (max-width: 1400px) {
    flex-direction: column;
    & > p {
      margin: 0;
    }
  }
`;

export const urlAddRemoveButtonsContainer = css`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  align-items: center;
`;

export const inputTicketingAgencyNameContainer = css`
  flex: 1;
  max-width: 15rem;
  min-width: 10rem;
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
`;

export const addButtonContainer = css`
  margin: 2rem 0;
  height: 5rem;
`;
