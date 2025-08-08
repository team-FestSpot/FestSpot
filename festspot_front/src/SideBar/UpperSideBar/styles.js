import { css } from "@emotion/react";

export const modalContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 36px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  width: 100%;
  height: 50px;
  z-index: 1000;
  box-sizing: border-box;
`;

export const logoSection = css`
  display: flex;
  flex-grow: 1;
  align-items: center;
  gap: 8px;

  & > div:first-of-type img {
    height: 32px;
    width: 32px;
    object-fit: contain;
  }

  & > div:last-of-type img {
    height: 24px;
    object-fit: contain;
  }
`;

export const searchSection = css`
  display: flex;
  justify-content: center;
  width: 82%;
  margin: 0 40px;
`;

export const searchContainer = css`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

export const searchInput = css`
  width: 100%;
  height: 39px;
  border: 1px solid #d1d5db;
  border-radius: 21px;
  padding: 0 20px;
  font-size: 14px;
  outline: none;
  background-color: #f9fafb;
  transition: all 0.2s ease;

  &:focus {
    border-color: #ff6b4a;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(255, 107, 74, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const searchIcon = css`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #ff6b4a;
  }
`;

export const actionSection = css`
  display: flex;
  flex-grow: 1;
  height: 100%;
  align-items: center;
  gap: 16px;
`;

export const loginButton = css`
  background-color: #ff6b4a;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 70px;

  &:hover {
    background-color: #e55a42;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(255, 107, 74, 0.3);
  }
`;

export const menuIcon = css`
  font-size: 24px;
  color: #374151;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #ff6b4a;
  }
`;
