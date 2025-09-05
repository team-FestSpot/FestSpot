import { css } from "@emotion/react";
import { uppserSideBarHeight } from "../../../../components/layout/MainLayout/styles";

const mainSidePadding = "2.4rem";

export const postWriteLayout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: auto;
  min-height: 100%;
  padding: 0;
  margin: 0;
  background: #f8f9fa;
`;

export const header = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 0.1rem solid #e9ecef;
  box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.05);
  padding: 1.6rem 2.4rem;
  background: white;
`;

export const backButton = css`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 0.1rem solid #dee2e6;
  border-radius: 0.6rem;
  gap: 0.6rem;
  padding: 0.8rem 1.6rem;
  color: #495057;
  background: white;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: #f8f9fa;
    border-color: #adb5bd;
  }

  @media (max-width: 768px) {
    gap: 0.3rem;
    padding: 0.4rem 1rem;
    font-size: 12px;
  }
  @media (max-width: 495px) {
    padding: 0.4rem 1rem;
  }
`;

export const selectSection = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  margin: 0;
  padding: 0;
`;

export const saveButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1.6rem;
  border: 0.1rem solid var(--main-color);
  border-radius: 0.6rem;
  font-weight: 500;
  color: white;
  background: var(--main-color);
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: #dc4f2e;
  }

  @media (max-width: 768px) {
    gap: 0.3rem;
    padding: 0.4rem 1rem;
    font-size: 12px;
  }
  @media (max-width: 495px) {
    padding: 0.4rem 1rem;
  }
`;

export const main = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  margin: 0 auto;
  padding: 3.2rem ${mainSidePadding};
  gap: 0.8rem;

  @media (max-width: 1024px) {
    padding: 2.4rem 1.6rem;
  }
`;
