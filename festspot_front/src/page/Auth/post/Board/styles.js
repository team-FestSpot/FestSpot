import { css } from "@emotion/react";

export const boardLayout = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
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
  flex-wrap: wrap;
  width: 100%;
  height: calc(100% - 4rem - 2 * 2rem);
  gap: 0 1vw;

  @media (max-width: 1024px) {
    height: calc(200% - 4rem - 2 * 2rem);
    gap: 1vh 1vw;
  }

  .MuiCard-root {
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    margin: 0;
    padding: 0;

    height: calc(33% - 1vh);
    width: calc(25% - 2vw);

    @media (max-width: 1024px) {
      height: 20rem;
      width: calc(50% - 2vw);
    }
  }
`;

export const card = css``;

export const imageContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
  overflow: hidden;

  & > img {
    width: 100%;
  }
`;

export const contentBox = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  gap: 0.5rem;
`;

export const titleContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-weight: 600;
`;

export const contentContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const userContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
`;

export const profileImgContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  box-sizing: border-box;
  border: 1px solid #dbdbdb;
  border-radius: 50%;
  overflow: hidden;

  & > img {
    width: 100%;
  }
`;

export const countContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 0.6rem;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
  }
`;

export const paginationContainer = css`
  width: 60%;
  box-sizing: border-box;
  margin: 2rem 0;
  height: 4rem;
  font-size: 2rem;
`;
