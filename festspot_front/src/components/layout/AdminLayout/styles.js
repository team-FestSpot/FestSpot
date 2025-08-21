import { css } from "@emotion/react";

const sideBarWidth = "20rem";

export const adminLayout = css`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const adminSideBar = css`
  display: flex;
  flex-direction: column;
  width: ${sideBarWidth};
  height: 100%;
`;

export const adminChildrenContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - ${sideBarWidth});
  height: 100%;

  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
