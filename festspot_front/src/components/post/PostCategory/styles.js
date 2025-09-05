import { css } from "@emotion/react";

export const selectCategory = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 18px;
  font-weight: 600;
  color: #495057;

  @media (max-width: 1024px) {
    font-size: 16px;
  }
  @media (max-width: 780px) {
    font-size: 14px;
    width: 30%;
  }
  @media (max-width: 530px) {
    width: 40%;
    font-size: 12px;
  }
`;

export const selected = (selectIsOpen) => css`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 100%;
  height: 100%;
  padding: 0.4rem 1.6rem;
  padding-right: 0.6rem;
  box-sizing: border-box;
  border: 1px solid ${selectIsOpen ? "var(--main-color)" : "#c0c0c0ff"};
  border-radius: 0.6rem;

  &:hover {
    border-color: var(--main-color);
  }

  @media (max-width: 1024px) {
    padding: 0.6rem 1rem;
  }
  @media (max-width: 780px) {
    gap: 4px;
  }
`;

export const options = css`
  position: absolute;
  top: 100%;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #c0c0c0ff;
  border-radius: 0.6rem;
  background-color: white;

  & > div {
    padding: 0.4rem 1.6rem;
    white-space: nowrap;
    overflow: hidden;
  }
  & > div:hover {
    background-color: var(--main-color);
    color: white;
  }
`;
