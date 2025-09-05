import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const header = css`
  display: flex;
  flex-direction: column;
  padding-left: 4rem;
  width: 100%;
  height: 20%;
`;

export const searchLayout = css`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  max-width: 40rem;
  height: auto;

  @media (max-width: 443px) {
    flex-direction: column;
  }
`;

export const main = css`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

export const dataGridContainer = css`
  flex-grow: 1;
`;
