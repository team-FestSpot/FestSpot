import { css } from "@emotion/react";

export const dateBox = css`
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(135deg, #ef5a39 0%, #d14626 100%);
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 4px 15px rgba(239, 90, 57, 0.4);
  color: white;
`;

export const dateOverlay = css`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  pointer-events: none;
`;

export const performanceCard = css`
  flex: 0 0 calc(33.333% - 20px);
  height: 100%;

  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(239, 90, 57, 0.1);
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(239, 90, 57, 0.3);
    border-color: rgba(239, 90, 57, 0.5);
  }

  color: black;
`;

export const posterContainer = css`
  position: relative;
  width: 100%;
  overflow: hidden;

  & > img {
    width: 100%;
  }
`;

export const content = css`
  padding: 10px;

  & > div {
    color: #ef5a39;
    font-size: 0.95rem;
    font-weight: 500;
    margin: 0;
  }

  & > h3 {
    font-size: 12px;
    font-weight: 600;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
