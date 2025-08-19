import { css } from "@emotion/react";

const uppserSideBarHeight = "5vh";
const postSideBarHeight = "9vh";

export const layout = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const upperSideBar = css`
  display: flex;
  width: 100%;
  height: ${uppserSideBarHeight};

  background-color: red;
`;

export const postSideBar = css`
  display: flex;
  width: 100%;
  height: ${postSideBarHeight};
`;

export const container = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  height: calc(100% - ${uppserSideBarHeight} - ${postSideBarHeight});
`;

export const children = css`
  display: flex;
  justify-content: center;
  align-items: start;
  width: 82%;
  height: 100%;
`;
