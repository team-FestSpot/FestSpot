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

export const contentContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
`;

export const rewriteContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 2rem;
`;

export const rewriteButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  box-sizing: border-box;
  border: none;
  border-radius: 0.5rem;
  color: white;
  background-color: var(--main-color);
  cursor: pointer;
`;
export const deleteButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  box-sizing: border-box;
  border: none;
  border-radius: 0.5rem;
  color: #888;
  background-color: #dbdbdb;
  cursor: pointer;
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

export const postCommentContainer = css`
  display: flex;
<<<<<<< HEAD
  justify-content: center;
  align-items: start;
  width: 100%;
  margin: 2rem 0;
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
=======
  align-items: center;
  gap: 8px;

  @media (max-width: 399px) {
    gap: 6px;
  }

  & > button,
  & > a {
    appearance: none;
    border: 1px solid rgba(229, 90, 66, 0.25);
    background: #fff;
    color: ${ACCENT};
    border-radius: 12px;
    padding: 8px 12px;
    font-size: 13.5px;
    cursor: pointer;
    transition: transform 0.05s ease, background 0.2s ease;

    &:hover {
      background: rgba(229, 90, 66, 0.06);
    }
    &:active {
      transform: translateY(1px);
    }

    @media (max-width: 399px) {
      padding: 7px 10px;
      font-size: 12.75px;
    }
  }
`;

/* 좋아요 버튼 영역 */
export const likeBox = css`
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const likeButton = (liked) => css`
  appearance: none;
  border: none;
  border-radius: 999px;
  padding: 10px 18px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s ease-in-out;
  background: ${liked ? "var(--accent)" : "rgba(229, 90, 66, 0.08)"};
  color: ${liked ? "#fff" : "var(--accent)"};

  &:hover {
    background: ${liked ? "#d94d36" : "rgba(229, 90, 66, 0.15)"};
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(1px);
  }
`;

export const likeCount = css`
  font-size: 15px;
  font-weight: 500;
  color: var(--fg);
`;

/* 댓글 영역 */
export const commentsSection = css`
  margin-top: 24px;
`;
export const commentsTitle = css`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 12px;
`;
export const commentList = css`
  display: grid;
  gap: 12px;
`;
export const commentItem = css`
  border: 1px solid var(--line, rgba(0,0,0,0.08));
  border-radius: 12px;
  padding: 12px;
  background: var(--bg, #fff);
`;
export const commentHeader = css`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--muted, #6b7280);
  font-size: 12px;
  margin-bottom: 8px;
`;
export const commentAuthor = css`
  font-weight: 600;
  color: var(--fg, #1f2937);
>>>>>>> ea22c0b60afac2259fb4a217824cd6c2052c3ff2
`;
export const commentDot = css`
  width: 3px; 
  height: 3px; 
  border-radius: 50%; 
  background: currentColor; 
  display: inline-block;
`;
export const commentDate = css``;
export const commentContent = css`
  white-space: pre-wrap;
  line-height: 1.6;
`;
export const commentActions = css`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const commentTextarea = css`
  width: 100%;
  border: 1px solid var(--line, rgba(0,0,0,0.08));
  border-radius: 8px;
  padding: 8px;
  resize: vertical;
  background: transparent;
  color: inherit;
`;
export const btnPrimary = css`
  padding: 6px 12px; 
  border-radius: 8px; 
  border: none; 
  cursor: pointer;
  background: var(--accent, #e55a42); 
  color: #fff; 
  font-weight: 600;
`;
export const btnGhost = css`
  padding: 6px 12px; 
  border-radius: 8px; 
  border: 1px solid var(--line, rgba(0,0,0,0.1));
  background: transparent; 
  cursor: pointer;
`;
export const btnDanger = css`
  padding: 6px 12px; 
  border-radius: 8px; 
  border: none; 
  cursor: pointer;
  background: #ef4444; 
  color: #fff; 
  font-weight: 600;
`;
export const commentEmpty = css`
  color: var(--muted, #6b7280);
`;

export const commentWriteBox = css`
  margin-top: 16px;
  border: 1px solid var(--line, rgba(0,0,0,0.08));
  border-radius: 12px;
  padding: 12px;
  background: var(--bg, #fff);
`;

export const counter = css`
  margin-right: auto;
  color: var(--muted, #6b7280);
  font-size: 12px;
`;