import { css } from "@emotion/react";

export const feedLayout = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  max-width: 115rem;
  height: auto;
  padding: 0;
  margin: 0;
`;

export const header = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 10rem;
  margin: 2rem 0 5rem;
  padding: 0;
  box-sizing: border-box;
  border-bottom: 1px solid #dbdbdb;

  /* & > div {
    width: auto;
    height: 10rem;
    
  } */
`;

export const headerPerformanceInfoContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  & > div {
    display: flex;
    flex-direction: row;
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
  justify-content: center;
  border: 1px solid #000;
  width: 80%;
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
      font-size: 1.4rem;
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
  width: 100%;

  @media (max-width: 768px) {
    width: 95%;
  }

  & > div {
    width: 100%;
  }
`;

export const feedCommentSubmitContainer = css`
  display: flex;
  flex-direction: column;
  width: 95%;
  height: auto;
`;

export const commentCountContainer = css`
  & > p {
    margin: 0;
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
