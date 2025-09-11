import { css } from "@emotion/react";

export const commentSubmitNicknameContainer = css`
  display: flex;

  & > p {
    margin: 0;
    font-size: 1.6rem;
  }
`;

export const commentInputContainer = css`
  display: flex;
  flex-direction: column;
  margin: 0 0 2rem;
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

  @media (max-width: 768px) {
    width: 95%;
  }
`;

export const commentSubmitButtonsContainer = css`
  display: flex;
  justify-content: end;
  height: 4rem;
  border-bottom: 2px solid #ff6b4a;
  padding: 1rem;
`;
