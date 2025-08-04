import { css } from "@emotion/react";

export const modalContainer = (isOpen) => css`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  width: 350px;
  height: 100vh;
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

  @media (max-width: 480px) {
    width: 300px;
  }

  @media (max-width: 360px) {
    width: 280px;
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
