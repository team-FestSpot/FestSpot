import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: row;
`;

export const updateModal = css`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
`;

export const sidebarLayout = css`
  display: flex;
  max-width: 200px;
`;

export const mainLayout = css`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

export const header = css`
  margin-left: 20px;
`;

export const searchLayout = css`
  display: flex;
  flex-direction: row;
  margin-bottom: 50px;
`;

export const searchInputLayout = css`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-left: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  max-width: 768px;
  min-width: 320px;
`;

export const searchButton = css`
  display: flex;
  margin: 0 10px;
`;

export const searchInput = css`
  display: flex;
  border: none;
  outline: none;
  width: 100%;
  height: 20px;
`;
