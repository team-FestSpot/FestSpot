import { css } from "@emotion/react";

export const uppserSideBarHeight = "4.5rem";
const postSideBarHeight = "5.5rem";

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
  min-height: ${uppserSideBarHeight};
`;

export const postSideBar = css`
  display: flex;
  margin: 1.5rem 0;
  width: 100%;
  height: ${postSideBarHeight};
  min-height: ${postSideBarHeight};

  @media (max-width: 768px) {
    height: calc(2 * ${postSideBarHeight});
    min-height: calc(2 * ${postSideBarHeight});
  }
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

  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
