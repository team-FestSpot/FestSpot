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
  width: 90%;
  padding: 2rem;

  @media (max-width: 70rem) {
    width: 100%;
    padding: 0;
  }
`;

export const header = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 70%;
  height: 14rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    width: 95%;
  }

  & > div {
    width: auto;
    height: 5rem;
    padding: 2rem 0;
  }
`;

export const main = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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

    & > p {
      font-size: 1rem;
    }

    & > p:first-of-type {
      width: 20%;
    }

    & > p:last-of-type {
      flex-grow: 1;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 95%;

    & > div {
      flex-direction: column;
      margin-bottom: 1.5rem;

      & > p {
        margin: 0.5rem;
        font-size: 0.8rem;
      }
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

  @media (max-width: 768px) {
    width: 95%;
  }

  & > div {
    width: 100%;
  }
`;

export const commentInputContainer = css`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  border: 1px solid #dbdbdb;

  width: 100%;
  height: auto;

  & > textarea {
    border: none;
    outline: none;
    resize: none;
    width: 95%;
    min-height: 8rem;
    height: auto;
    overflow: hidden;
  }
`;

export const commentCountContainer = css`
  & > p {
    margin: 0;
  }
`;

export const commentContainer = css`
  display: flex;
  flex-direction: column;
`;

export const commentUserProfileImg = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  box-sizing: border-box;
  border: 1px solid #dbdbdb;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  aspect-ratio: 1;
  overflow: hidden;

  & > img {
    height: 100%;
  }
`;

export const commentModifyButtonsContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  height: 0.5rem;

  & > div {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    font-size: 1rem;
    color: #888888;

    & > p:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

export const commentContentsContainer = css`
  display: flex;
  flex-direction: row;
  & > p {
    font-size: 1rem;
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
    text-align: end;
  }

  @media (max-width: 768px) {
    & > p {
      margin: 0.5rem 0 1rem;
      font-size: 0.8rem;
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
      width: 25%;
      height: auto;
    }
  }
`;

export const commentModifyContentsContainer = css`
  display: flex;
  flex-direction: row;
  border: 1px solid #dbdbdb;
  margin-top: 1rem;
  width: 100%;

  & > textarea {
    border: none;
    outline: none;
    resize: none;
    width: 70%;
    min-height: 8rem;
    height: auto;
    overflow: hidden;
  }
`;

export const pageMoveButtonsContainer = css`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  gap: 1rem;
  width: 70%;
  height: auto;

  @media (max-width: 768px) {
    width: 95%;
  }

  & > div:first-of-type {
    display: flex;
    justify-content: space-between;
  }
`;

export const prevNextButtonsContainer = css`
  & > div {
    width: auto;
    font-size: 1rem;
  }

  & > div:last-of-type {
    text-align: end;
  }
`;
