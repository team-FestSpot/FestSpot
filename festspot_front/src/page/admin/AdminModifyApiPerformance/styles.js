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
  align-items: start;
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

  @media (max-width: 620px) {
    flex-direction: column;
  }
`;

export const titleContainer = css``;

export const searchContainer = css`
  display: flex;
  flex-direction: row;
`;

export const main = css``;

export const updateModalLayout = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #d5d5d577;
`;
