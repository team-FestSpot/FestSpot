import { css } from "@emotion/react";

export const commentSortButtonsContainer = css`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 1rem;
  margin-bottom: 3rem;
  border-bottom: 2px solid #ff6b4a;
`;

export const commentListContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

export const commentContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  padding: 1rem;
  width: 90%;
  height: 7.5rem;
`;

export const commentUserProfileImg = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  box-sizing: border-box;
  border: 1px solid #dbdbdb;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  aspect-ratio: 1;
  overflow: hidden;

  & > img {
    height: 100%;
  }
`;

export const commentInfoContainer = css`
  display: flex;
  flex-direction: column;

  & > div:first-of-type {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;

    & > p {
      margin: 0;
    }
  }
`;

export const commentNickName = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
`;

export const commentTime = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  color: #aaa;
`;

export const comment = css`
  padding-left: 0.5rem;

  & > p {
    margin: 0;
  }
`;

export const commentModifyButtonsContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  height: 0.5rem;

  & > div {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    font-size: 1rem;
    color: #888888;

    & > p:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

export const commentContentsContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const commentModifyContentsContainer = css`
  display: flex;
  flex-direction: row;
  border: 1px solid #dbdbdb;
  margin-top: 1rem;
  width: 100%;
  min-height: 6rem;
  height: auto;
  overflow: hidden;

  & > textarea {
    border: none;
    outline: none;
    resize: none;
    box-sizing: border-box;
    width: 70%;
    height: 100%;
    overflow: hidden;
  }
`;
