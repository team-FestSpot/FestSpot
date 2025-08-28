import { css } from "@emotion/react";

export const contentsLayout = css`
  display: flex;
  justify-content: center;
  @media (max-width: 1024px) {
    width: 100%;
  }

  width: 60%;
  height: 100%;
`;

export const contentContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #dbdbdb;
  padding: 2rem;
  gap: 1rem;
  width: 80%;
  height: 10rem;
`;

export const profileImgContainer = css`
  display: flex;
  justify-content: center;
  width: 10rem;
  height: auto;

  & > img {
    width: 100%;
    height: auto;
  }
`;
