import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const container = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  height: calc(100% - 50px);
`;

export const children = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 82%;
  height: 100%;
`;
