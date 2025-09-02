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

export const paginationButton = (isAble) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  aspect-ratio: 1/1;
  padding: 0.4rem;
  box-sizing: border-box;
  border: 1px solid var(--main-color);
  border-radius: 10%;
  background-color: white;
  color: var(--main-color);

  cursor: ${isAble ? "pointer" : "default"};
  opacity: ${isAble ? 1 : 0.3};

  &:hover {
    background-color: ${isAble ? "#fcebe8" : "white"};
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

export const paginationNum = (isCurrentPage, isAble) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  aspect-ratio: 1/1;
  padding: 0.4rem;
  box-sizing: border-box;
  border: 1px solid var(--main-color);
  border-radius: 10%;
  background-color: ${isCurrentPage ? "var(--main-color)" : "white"};
  color: ${isCurrentPage ? "white" : "var(--main-color)"};

  cursor: ${isAble ? "pointer" : "default"};
  opacity: ${isAble ? 1 : 0.3};

  &:hover {
    background-color: ${isCurrentPage
      ? "var(--main-color) " // 현재페이지면 hover해도 유지
      : isAble
      ? "#fcebe8" //활성화된 버튼이면 색 약간 변함
      : "white"}; //비활성화 된 버튼이면 hover해도 유지
  }
`;
