import { css } from "@emotion/react";

export const contentsLayout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  width: 60%;
  height: 100%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const inputContainer = css`
  display: flex;
  flex-direction: row;
  width: 60%;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
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
