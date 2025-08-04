import { css } from "@emotion/react";

export const modalContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 48px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  width: 100vw;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 12px 16px;
  }

  @media (max-width: 480px) {
    padding: 10px 12px;
  }
`;

export const logoSection = css`
  display: flex;
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
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 500px;
  margin: 0 40px;

  @media (max-width: 768px) {
    margin: 0 20px;
    max-width: 300px;
  }

  @media (max-width: 480px) {
    margin: 0 12px;
  }
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

  @media (max-width: 768px) {
    font-size: 13px;
    height: 38px;
  }

  @media (max-width: 480px) {
    height: 36px;
    padding: 0 16px;
  }
`;

export const searchIcon = css`
  position: absolute;
  right: 15px;
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
  align-items: center;
  gap: 16px;

  @media (max-width: 480px) {
    gap: 12px;
  }
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

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 13px;
    min-width: 60px;
  }

  @media (max-width: 480px) {
    padding: 7px 14px;
    font-size: 12px;
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
