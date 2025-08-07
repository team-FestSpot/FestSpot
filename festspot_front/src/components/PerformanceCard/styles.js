import { css } from "@emotion/react";

export const dateBox = css`
  position: absolute;
  top: 1vh;
  right: 1vw;
  background: linear-gradient(135deg, #ef5a39 0%, #d14626 100%);
  padding: 0;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(239, 90, 57, 0.4);
  color: white;

  & > p {
    margin: 0.5vh 0.8vw;
  }

  @media (min-width: 1025px) {
    font-weight: 600;
    font-size: 10px;
  }
  @media (max-width: 1023px) {
    font-weight: 600;
    font-size: 12px;
  }
  @media (max-width: 768px) {
    font-weight: 400;
    font-size: 10px;
  }
`;

export const performanceCard = css`
  width: 100%;
  aspect-ratio: 3/4; /* 가로:세로 비율 3:4로 고정 */
  margin-top: 5px;

  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(239, 90, 57, 0.1);
  cursor: pointer;

  display: flex;
  flex-direction: column;

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
  height: calc(100% - 8vh);
  overflow: hidden;
  flex-grow: 1;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* 비율 유지하면서 컨테이너 채우기 */
    object-position: center;
  }
`;

export const content = css`
  padding: 10px;
  background-color: #ef5a393d;

  @media (min-width: 1025px) {
    font-size: 12px;
    height: 8vh;
  }
  @media (max-width: 1023px) {
    font-size: 10px;
    height: 7vh;
  }
  @media (max-width: 767px) {
    font-size: 8px;
    height: 3vh;
  }

  & > div:first-of-type {
    @media (min-width: 1025px) {
      font-size: 10px;
      margin-bottom: 5px;
    }
    @media (max-width: 1023px) {
      font-size: 10px;
      margin-bottom: 3px;
    }
    @media (max-width: 767px) {
      font-size: 6px;
    }

    height: fit-content;
    color: #ef5a39;
    font-weight: 500;
    margin: 0;
    padding: 0;

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  & > div:last-of-type {
    @media (min-width: 1025px) {
      font-size: 10px;
    }
    @media (max-width: 1023px) {
      font-size: 10px;
    }
    @media (max-width: 767px) {
      font-size: 8px;
    }

    height: fit-content;
    font-weight: 600;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    & > h3 {
      margin: 0;
    }
  }
`;
