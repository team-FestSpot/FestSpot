import { css } from "@emotion/react";

export const containerStyle = css`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f8f9fa;
  min-height: 100vh;
`;

export const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const backButtonStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid #dee2e6;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #495057;
  transition: all 0.2s;

  &:hover {
    background: #f8f9fa;
    border-color: #adb5bd;
  }
`;

export const authorActionsStyle = css`
  display: flex;
  gap: 10px;
`;

export const editButtonStyle = css`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;

  &:hover {
    background: #218838;
  }
`;

export const deleteButtonStyle = css`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;

  &:hover {
    background: #c82333;
  }
`;

export const postWrapperStyle = css`
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const postHeaderStyle = css`
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e9ecef;
`;

export const postTitleStyle = css`
  font-size: 28px;
  font-weight: 700;
  color: #212529;
  margin: 0 0 20px 0;
  line-height: 1.3;
`;

export const postMetaStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
`;

export const authorInfoStyle = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const authorNameStyle = css`
  font-weight: 600;
  color: #495057;
  font-size: 16px;
`;

export const postDateStyle = css`
  color: #6c757d;
  font-size: 14px;
`;

export const postStatsStyle = css`
  display: flex;
  gap: 20px;
`;

export const statItemStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6c757d;
  font-size: 14px;

  svg {
    font-size: 16px;
  }
`;

export const postImagesStyle = css`
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
`;

export const postImageStyle = css`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`;

export const postContentStyle = css`
  line-height: 1.8;
  color: #212529;
  margin-bottom: 30px;

  h1,
  h2,
  h3 {
    margin-top: 30px;
    margin-bottom: 15px;
    color: #212529;
  }

  h1 {
    font-size: 24px;
  }
  h2 {
    font-size: 20px;
  }
  h3 {
    font-size: 18px;
  }

  p {
    margin-bottom: 15px;
  }

  ul,
  ol {
    margin: 15px 0;
    padding-left: 25px;
  }

  li {
    margin-bottom: 5px;
  }

  blockquote {
    margin: 20px 0;
    padding: 15px 20px;
    background: #f8f9fa;
    border-left: 4px solid #ef5a39;
    font-style: italic;
    border-radius: 0 8px 8px 0;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 15px 0;
  }
`;

export const likeButtonWrapperStyle = css`
  text-align: center;
  padding: 20px 0;
  border-top: 1px solid #e9ecef;
`;

export const likeButtonStyle = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #f8f9fa;
  border: 2px solid #dee2e6;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #495057;
  transition: all 0.2s;

  &:hover {
    background: #e9ecef;
    border-color: #adb5bd;
  }

  svg {
    font-size: 18px;
  }
`;

export const likeButtonActiveStyle = css`
  background: #fff5f5;
  border-color: #ef5a39;
  color: #ef5a39;

  &:hover {
    background: #fed7d7;
  }
`;

export const commentSectionStyle = css`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const commentHeaderStyle = css`
  font-size: 20px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 25px 0;
  padding-bottom: 15px;
  border-bottom: 1px solid #e9ecef;
`;

export const commentFormStyle = css`
  margin-bottom: 30px;
`;

export const commentInputWrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const commentInputStyle = css`
  width: 100%;
  padding: 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: #ef5a39;
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

export const commentSubmitStyle = css`
  align-self: flex-end;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: #ef5a39;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #dc4f2e;
  }

  &:disabled {
    background: #adb5bd;
    cursor: not-allowed;
  }
`;

export const loginPromptStyle = css`
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  color: #6c757d;
  margin-bottom: 30px;

  button {
    color: #ef5a39;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 500;
    text-decoration: underline;

    &:hover {
      color: #dc4f2e;
    }
  }
`;

export const commentListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const commentItemStyle = css`
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid #ef5a39;
`;

export const commentContentStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const commentAuthorStyle = css`
  font-weight: 600;
  color: #495057;
  font-size: 14px;
`;

export const commentTextStyle = css`
  color: #212529;
  line-height: 1.5;
`;

export const commentDateStyle = css`
  color: #6c757d;
  font-size: 12px;
`;

export const commentsDisabledStyle = css`
  text-align: center;
  padding: 40px 20px;
  color: #6c757d;
  background: #f8f9fa;
  border-radius: 8px;
  font-style: italic;
`;

export const loadingStyle = css`
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
  font-size: 18px;
`;

export const errorStyle = css`
  text-align: center;
  padding: 60px 20px;
  color: #dc3545;
  font-size: 18px;
`;

/* ▼▼▼ 여기부터 '더보기' & '모두 읽었어요' 추가 ▼▼▼ */
export const loadMoreWrapperStyle = css`
  display: flex;
  justify-content: center;
  margin: 20px 0 0;
`;

export const loadMoreBtnStyle = css`
  padding: 10px 20px;
  background: #fff;
  border: 2px solid #e9ecef;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 600;
  color: #495057;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #f8f9fa;
    border-color: #adb5bd;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const noMoreTextStyle = css`
  text-align: center;
  color: #6c757d;
  font-size: 13px;
  margin: 12px 0 0;
`;
