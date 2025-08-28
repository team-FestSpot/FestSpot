import { css } from "@emotion/react";

export const upperBarLayout = css`
  width: 100%;
  height: 100%;
`;

export const container = css`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  width: 100%;
  height: 100%;
  z-index: 1000;
`;

export const logoSection = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 1%;
  height: 100%;
  width: 6%;
  flex-grow: 1;
  cursor: pointer;
`;

export const logo = css`
  height: 100%;
  & > img {
    height: 100%;
    object-fit: contain;
  }
`;

export const logoText = css`
  display: flex;
  align-items: center;
  height: 100%;
  flex-grow: 1;
  & > img {
    width: 100%;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const searchSection = css`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 82%;

  /* background-color: blue; */
`;

export const searchContainer = css`
  display: flex;
  position: relative;
  box-sizing: border-box;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  width: 40%;
  height: 100%;
  padding: 0 0 0 2%;
  background-color: #f9fafb;

  transition: all 0.2s ease;
  &:focus-within {
    border: 1px solid #ff6b4a;
    background-color: #ffffff;
  }

  @media (max-width: 1440px) {
    width: 50%;
  }
  @media (max-width: 768px) {
    width: 60%;
  }
  @media (max-width: 480px) {
    width: 80%;
  }
`;

export const searchInput = css`
  border: none;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  padding: 0;
  font-size: 1.4rem;
  outline: none;
  background-color: #f9fafb;

  &::placeholder {
    color: #9ca3af;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const iconContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5% 0 0;
`;

export const searchIcon = css`
  color: #6b7280;
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #ff6b4a;
  }
`;

export const actionSection = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  height: 100%;
  width: 6%;
  margin: 0 1% 0 0;
  gap: 16px;
`;

export const profileContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const profileImgContainer = css``;

export const nicknameContainer = css``;

export const loginButtonContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const loginButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: white;
  background-color: #ff6b4a;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #e55a42;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(255, 107, 74, 0.3);
  }
`;

export const menuIconContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
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
