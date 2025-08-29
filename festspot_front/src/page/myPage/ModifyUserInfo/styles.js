import { css } from "@emotion/react";

export const contentsLayout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1024px) {
    width: 100%;
  }

  width: 60%;
  height: 100%;
`;

export const profileImgContainer = css`
  width: 30rem;
  height: auto;

  & > img {
    width: 100%;
    height: auto;
  }
`;

export const profileImageInputContainer = css`
  display: flex;
  justify-content: center;
  margin: 1rem 0;

  & > input {
    display: none;
  }
`;

export const inputsContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const inputContainer = css`
  display: flex;
  flex-direction: row;
  width: 60%;
`;

export const textFieldHelp = css`
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 1rem;
  color: red;
  margin: 0;
  margin-bottom: 2%;
`;

export const inputPlaceholderContainer = css`
  display: flex;
  width: 30%;
`;
export const textFieldContainer = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
