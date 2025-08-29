import { css } from "@emotion/react";

export const paginationBarLayout = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  gap: 0.4rem;
`;

export const paginationButton = (isVisible) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  aspect-ratio: 1/1;
  padding: 0.4rem;
  box-sizing: border-box;
  border: 1px solid #e55a42;
  border-radius: 10%;
  background-color: white;
  color: #e55a42;

  cursor: ${isVisible ? "pointer" : "default"};
  opacity: ${isVisible ? 1 : 0};

  &:hover {
    background-color: #fcebe8;
  }
`;

export const paginationNumContainer = (gap) => css`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  height: 100%;
  gap: ${gap};
`;

export const paginationNum = (isCurrentPage, isVisible) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  aspect-ratio: 1/1;
  padding: 0.4rem;
  box-sizing: border-box;
  border: 1px solid #e55a42;
  border-radius: 10%;
  background-color: ${isCurrentPage ? "#e55a42" : "white"};
  color: ${isCurrentPage ? "white" : "#e55a42"};

  cursor: ${isVisible ? "pointer" : "default"};
  opacity: ${isVisible ? 1 : 0};

  &:hover {
    background-color: #fcebe8;
  }
`;
