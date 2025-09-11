import { css } from "@emotion/react";

const postHeight = "8rem";

export const listTableLayout = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
`;

export const tableContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;

  & > div:nth-last-of-type(1) {
    border-bottom: none;
  }
`;

export const post = css`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  padding: 1rem 2rem;
  gap: 1rem;
  box-sizing: border-box;
  cursor: pointer;

  border-bottom: 1px solid var(--main-color);
`;

export const imgContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${postHeight};
  aspect-ratio: 1/1;
  box-sizing: border-box;
  border-radius: 1rem;
  overflow: hidden;

  & > img {
    height: 100%;
  }
`;

export const rightSection = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  flex-grow: 1;
  width: 100%;
  height: ${postHeight};
  padding: 1rem 0;
  box-sizing: border-box;
`;

export const title = css`
  display: flex;
  justify-content: start;
  align-items: start;
  flex-grow: 1;
  font-weight: 600;
`;
export const nickName = css``;
export const time = css`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  color: #888;
  gap: 0.5rem;
`;

export const paginationContainer = css`
  width: 60%;
  box-sizing: border-box;
  margin-top: 2rem;
  height: 4rem;
  font-size: 2rem;
`;
