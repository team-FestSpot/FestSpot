import { css } from "@emotion/react";

export const container = css`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const sidebar = css`
  width: 100%;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
`;

export const header = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px 16px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f8f9fa;
`;

export const navItem = css`
  display: flex;
  padding: 12px 20px;
  color: #4b5563;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  border: none;
  background: none;
  /* width: 100%; */
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
    color: #1f2937;
  }

  &.active {
    background-color: #ea580c;
    color: #ffffff;
    font-weight: 600;
  }
`;

export const activeNavItem = css`
  width: auto;
  background-color: #ea580c !important;
  color: #ffffff !important;
  font-weight: 600 !important;
`;
