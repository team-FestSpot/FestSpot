import { css } from "@emotion/react";

export const boardLayout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 2rem;
`;

export const postContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-grow: 1;

  border: 1px solid blue;
`;

export const paginationContainer = css`
  width: 60%;
  border: 1px solid red;
  box-sizing: border-box;
  margin: 2rem 0;
  font-size: 2rem;
`;
