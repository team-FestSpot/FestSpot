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
  width: 80%;
  padding: 2rem;

  @media (max-width: 70rem) {
    width: 100%;
  }
`;

export const header = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 14rem;
  border: 1px solid #00f;
  margin-bottom: 2rem;

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
  width: 70%;
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
  width: 70%;

  & > div {
    display: flex;
    flex-direction: row;
    width: 100%;

    @media (max-width: 70rem) {
      flex-direction: column;
    }

    & > p:first-of-type {
      width: 10rem;
    }

    & > p:last-of-type {
      flex-grow: 1;
    }
  }
`;

export const ticketings = css`
  display: flex;
  flex-direction: row;
  margin: 2rem 0;
  gap: 2rem;
  text-align: center;
`;

export const feedCommentContainer = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 2rem 0;
  gap: 1rem;
  width: 70%;

  & > div {
    width: 100%;
  }
`;

export const commentInputContainer = css`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;

  width: 100%;
  height: auto;

  & > textarea {
    border-radius: 0.8rem;
    border: none;
    outline: none;
    resize: none;
    height: auto;
  }
`;

export const commentContainer = css`
  display: flex;
  flex-direction: column;
`;

export const commentModifyButtonsContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  color: #888888;
  height: 0.5rem;

  & > p:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const commentContentsContainer = css`
  display: flex;
  flex-direction: row;
  & > p {
    margin: 0.5rem 0 1rem;
  }

  & > p:first-of-type {
    width: 15%;
    height: auto;
  }
  & > p:nth-of-type(2) {
    flex-grow: 1;
    height: auto;
  }
  & > p:last-of-type {
    width: 20%;
    height: auto;
  }
`;

export const prevNextButtonsContainer = css`
  display: flex;
  justify-content: space-between;
  width: 70%;
  height: auto;
`;
