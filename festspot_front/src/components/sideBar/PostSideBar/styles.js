import { css } from "@emotion/react";

export const sidebarContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  row-gap: 0;
`;

export const boardNavButtons = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 50%;
  height: 100%;
  gap: 12px;

  @media (max-width: 1440px) {
    width: 60%;
  }
  @media (max-width: 1024px) {
    width: 80%;
  }
  @media (max-width: 768px) {
    gap: 8px;
  }
`;

export const boardBtn = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 23.5%;
  gap: 8px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.4rem;
  font-weight: 600;
  background: white;
  color: #eb684b;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    width: 45%;
    height: 40%;
    font-size: 1.2rem;
  }
`;

export const icon = css`
  font-size: 1.2rem;
`;
