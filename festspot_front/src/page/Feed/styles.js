import { css } from "@emotion/react";

export const feedLayout = css`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const contentsContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  padding: 2rem;
`;

export const header = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 14rem;
  border: 1px solid #00f;

  & > div {
    width: auto;
    height: 5rem;
    padding: 2rem;
  }
`;

export const main = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  border: 1px solid #0f0;
`;

export const posterContainer = css`
  display: flex;
  border: 1px solid #000;
  width: fit-content;
  height: auto;
  & > img {
    width: 100%;
    height: 100%;
  }
`;

export const feedContentContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 2rem;
`;

export const feedContents = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 60%;
`;

export const ticketings = css`
  display: flex;
  flex-direction: row;
  margin: 2rem 0;
  gap: 2rem;
`;

export const feedCommentContainer = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 2rem 0;
  width: 100%;

  & > div {
    width: 100%;
  }
`;

export const quillContainer = css`
  margin: 2rem 0;
  width: 100%;
  height: auto;
`;

export const prevNextButtonsContainer = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
`;
