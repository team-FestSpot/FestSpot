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
  height: 20%;
`;

export const titleContainer = css``;

export const searchContainer = css`
  display: flex;
  flex-direction: row;
`;

export const main = css`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

export const searchLayout = css`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  height: auto;
`;

export const dataGridContainer = css`
  flex-grow: 1;
`;
