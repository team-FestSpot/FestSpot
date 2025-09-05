import { css } from "@emotion/react";
import { remToPx } from "../../../../utils/remToPx";

export const boardLayout = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 2rem;
  padding-top: 0;
`;

export const postContainer = css`
  display: flex;
  justify-content: start;
  align-items: start;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  gap: 1vh 1vw;

  @media (max-width: 1024px) {
    height: auto;
  }

  .MuiCard-root {
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    margin: 0;
    padding: 0;
    cursor: pointer;

    height: calc((71.5vh) / 3);
    width: calc((100% - 3vw) / 4);

    @media (max-width: 1023px) {
      height: 20rem;
      width: calc((100% - 2vw) / 3);
    }
    @media (max-width: 767px) {
      height: 20rem;
      width: calc((100% - 1vw) / 2);
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
  aspect-ratio: 1/1;
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
  margin-top: 2rem;
  height: 4rem;
  font-size: 2rem;
`;

export const writeButton = css`
  position: fixed;
  bottom: 5%;
  right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 50%;
  aspect-ratio: 1/1;
  padding: 1.5rem;
  font-size: 2rem;
  color: white;
  background-color: var(--main-color);
  cursor: pointer;

  @media (max-width: 768px) {
    bottom: 3%;
  }
`;
