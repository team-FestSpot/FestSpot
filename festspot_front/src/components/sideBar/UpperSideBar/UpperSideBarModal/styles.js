import { css } from "@emotion/react";

export const modalContainer = (isOpen) => css`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  width: 350px;
  height: 100%;
  background-color: #ffffff;
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 1002;
  transform: translateX(${isOpen ? "0" : "100%"});
  transition: transform 0.3s ease;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
`;

export const closeButton = css`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: flex-end;
  padding: 16px 20px 0 20px;
  background-color: #ffffff;
  z-index: 10;

  svg {
    font-size: 24px;
    color: #6b7280;
    cursor: pointer;
    padding: 4px;
    border-radius: 6px;
    transition: all 0.2s ease;

    &:hover {
      color: #374151;
      background-color: #f3f4f6;
    }
  }
`;

export const modalUserInfo = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 24px 32px 24px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #ffffff;
  position: sticky;
  top: 56px; /* closeButton 높이만큼 */
  z-index: 9;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 12px;
    border: 3px solid #f3f4f6;
    transition: border-color 0.2s ease;
  }

  div {
    font-size: 16px;
    font-weight: 600;
    color: #374151;
    text-align: center;
  }
`;

export const modalMinorCategory = css`
  padding: 0 24px;

  /* 카테고리 간 구분선 */
  &:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
  }

  /* 각 카테고리 섹션의 여백 */
  & > div {
    padding: 24px 0;
  }

  /* 첫 번째 카테고리의 상단 여백 */
  &:first-of-type > div {
    padding-top: 32px;
  }

  /* 마지막 카테고리의 하단 여백 */
  &:last-child > div {
    padding-bottom: 32px;
  }
`;

export const username = css`
  text-decoration: none;
  color: black;
`;

export const logoutContainer = css`
  display: flex;
  justify-content: end;
  align-items: end;
  width: 100%;
  margin: 0;

  & > a {
    position: relative;
    top: 100%;
    text-decoration: none;
    font-size: 12px;
    font-weight: 400;
    color: #b3b3b3ff;
  }
`;

// =========================================================

export const container = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const majorCategory = css`
  margin-bottom: 16px;
`;

export const majorLink = css`
  display: block;
  font-size: 17px;
  font-weight: 600;
  color: #374151;
  text-decoration: none;
  padding: 12px 0;
  cursor: pointer;
  transition: color 0.2s ease;
  position: relative;
  border-bottom: 1px solid #e5e7eb;

  &:hover {
    color: #ff6b4a;
  }

  &:visited {
    color: #374151;
  }

  &:active {
    color: #ff6b4a;
    text-decoration: none;
  }

  /* 호버 시 왼쪽 인디케이터 */
  &:hover::before {
    content: "";
    position: absolute;
    left: -24px;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 24px;
    background-color: #ff6b4a;
    border-radius: 2px;
  }
`;

export const minorCategoryContainer = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 20px;
  position: relative;
`;

export const minorLink = css`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #6b7280;
  text-decoration: none;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    color: #ff6b4a;
    background-color: #fef7f6;
    transform: translateX(4px);
  }

  &:visited {
    color: #6b7280;
  }

  &:active {
    color: #ff6b4a;
    text-decoration: none;
  }

  /* 기본 상태의 왼쪽 점 */
  &::before {
    content: "";
    position: absolute;
    left: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background-color: #d1d5db;
    border-radius: 50%;
    transition: background-color 0.2s ease;
  }

  /* 호버 시 왼쪽 점 색상 변화 */
  &:hover::before {
    background-color: #ff6b4a;
  }
`;
