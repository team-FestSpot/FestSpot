import { css } from "@emotion/react";

export const commentLayout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
`;

export const sort = css`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
`;

export const commentBox = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  padding: 2rem;
  padding-bottom: 1rem;
  box-sizing: border-box;
  border-top: 2px solid var(--main-color);
  border-bottom: 2px solid var(--main-color);
`;

export const brace = css`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  width: 100%;
`;

export const commentContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  width: 100%;
`;

export const comment = (level, hasChild) => css`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: ${level ? "95%" : "100%"};
  padding: ${level ? "2rem 1rem" : "2rem 0"};
  padding-right: 1rem;
  margin: 0.5rem 0;
  box-sizing: border-box;
  border-radius: 0.5rem;
  border-top: ${!level ? "1px solid #dbdbdb" : 0};
  border-bottom: ${!level && !hasChild ? "1px solid #dbdbdb" : 0};
  background-color: ${level ? "#f9f9f9" : "white"};
  gap: 1rem;
`;

export const profileImgContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  aspect-ratio: 1/1;
  box-sizing: border-box;
  border: 1px solid #dbdbdb;
  border-radius: 50%;
  overflow: hidden;

  & > img {
    width: 100%;
  }
`;

export const commentDiv = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
  gap: 0.5rem;
`;

export const nickName = css`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  gap: 0.5rem;

  & > div:not(:last-child) {
    color: #888;
  }
  & > div:first-of-type {
    color: black;
    font-weight: 600;
  }
`;

export const rewrtieContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  flex-grow: 1;
  gap: 1rem;
`;

export const rewriteButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  box-sizing: border-box;
  border: none;
  border-radius: 0.5rem;
  color: white;
  background-color: var(--main-color);
`;
export const deleteButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  box-sizing: border-box;
  border: none;
  border-radius: 0.5rem;
  color: #888;
  background-color: #dbdbdb;
`;

export const commentContent = css`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
  cursor: pointer;
`;

export const parent = css`
  color: #402bf8ff;
`;

export const commentWriterContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 2rem;

  & > div {
    justify-content: start;
    width: 100%;
    font-size: 1.6rem;
  }
`;

export const metion = css`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const commentWriter = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: auto;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid #dbdbdb;
  border-radius: 0.5rem;

  &:focus-within {
    border: 1px solid #444;
  }

  & > textarea {
    border: none;
    outline: none;
    width: 100%;
    height: auto;
    min-height: 10rem;
    padding: 1.5rem 1rem;
    box-sizing: border-box;
    overflow: hidden;
    word-wrap: break-word;
    resize: none;

    &::placeholder {
      color: #aaa;
      font-weight: 100;
    }
  }
`;

export const buttonContainer = css`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  gap: 1rem;
  margin-top: 1rem;
`;

export const reportButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  border: 1px solid #dbdbdb;
  border-radius: 1rem;
  gap: 0.5rem;
`;

export const likeButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  border: 1px solid #dbdbdb;
  border-radius: 1rem;
  gap: 0.5rem;
  cursor: pointer;
  & > :not(span) {
    color: red;
  }
`;

export const confirmButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  box-sizing: border-box;
  border: 1px solid #dbdbdb;
  border-radius: 1rem;
  gap: 0.5rem;
  color: white;
  background-color: var(--main-color);
`;
