import { css } from "@emotion/react";

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

  /* 왼쪽 연결선 */
  /* &::before {
    content: "";
    position: absolute;
    left: 8px;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #f3f4f6;
    border-radius: 1px;
  } */
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
