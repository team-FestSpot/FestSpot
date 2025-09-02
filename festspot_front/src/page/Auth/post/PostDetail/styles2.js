import { css } from "@emotion/react";

export const postDetailLayout = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  max-width: 115rem;
  height: auto;
  padding: 0;
  margin: 0;
`;

export const titleContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 10rem;
  padding: 0;
  box-sizing: border-box;

  & > h2 {
    margin: 0;
  }
`;

export const postInfoContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  width: 100%;
`;

export const profileContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: auto;
  gap: 1rem;
`;

export const profileImg = css`
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
    height: 100%;
  }
`;

export const leftContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

export const nickName = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
`;

export const time = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  color: #aaa;
`;

export const countContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 25rem;
  height: 30%;

  & > div {
    margin: 0 0.2rem;
    padding: 0;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

export const verticalDivider = css`
  height: 100%;
  width: 0.05rem;
  background-color: #ccc;
`;

export const horizontalDivider = css`
  width: 100%;
  height: 0.05rem;
  background-color: #ccc;
`;

export const contentContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
`;

export const content = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;

  & img {
    display: block;
    justify-content: center;
    align-items: start;
    max-width: 100%;
    height: auto;
    margin: 1rem 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  & p {
    margin: 0;
  }
  blockquote {
    border-left: 0.4rem solid var(--main-color);
    padding-left: 2rem;
    margin: 1.6rem 0;
    color: #6c757d;
    font-style: italic;
    background: none;
  }

  .ql-code-block-container {
    margin: 5px 0;
    padding: 5px 10px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 3px;
    font-family: monospace;
    background-color: #23241f;
    color: #f8f8f2;
  }

  .ql-align-center {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .ql-align-right {
    display: flex;
    justify-content: end;
    align-items: center;
    width: 100%;
  }
  .ql-align-justify {
    display: flex;
    justify-content: start;
    align-items: center;
    text-align: justify;
    width: 100%;
  }
`;

export const postCommentContainer = css``;
