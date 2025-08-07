import { css } from "@emotion/react";

export const mainContainer = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;

  @media (max-width: 480px) {
    padding: 16px 12px;
  }
`;

export const boardNav = css`
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
`;

export const boardNavButtons = css`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: center;
  margin-top: 30px;

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

export const boardBtn = css`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  margin-top: 30px;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
  color: #eb684b;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &.active {
    background: #ef5a39;
    color: white;
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(239, 90, 57, 0.3);
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    justify-content: center;
    width: auto;
    min-width: 200px;
  }
`;

export const sidebarContainer = css`
  width: 100%;
`;

export const icon = css`
  font-size: 1.2rem;
`;
