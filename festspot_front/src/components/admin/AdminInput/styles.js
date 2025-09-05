import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: start;
  }
`;

export const menuText = css`
  width: 150px;
`;

export const inputContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 3rem;
  gap: 10px;
  height: auto;
`;
