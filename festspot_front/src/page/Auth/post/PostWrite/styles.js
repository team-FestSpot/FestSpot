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

export const selectCategory = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
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

export const postContainer = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  background: white;
  border-radius: 0.8rem;
  box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.05);
`;

export const title = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2.4rem;
  border-bottom: 0.1rem solid #e9ecef;
  cursor: text;
`;

export const titleInput = css`
  width: 100%;
  padding: 0;
  border: none;
  font-size: 2.8rem;
  font-weight: 700;
  color: #212529;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #adb5bd;
    font-weight: 400;
  }
`;

export const titleCount = css`
  margin-top: 0.6rem;
  font-size: 1.2rem;
  color: #6c757d;
  text-align: right;
`;

export const quillContainer = css`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-grow: 1;
  width: 100%;
  box-sizing: border-box;
  cursor: text;

  .quill {
    display: flex;
    flex-direction: column;
  }

  .ql-container {
    position: relative;
    height: 100%;
    border: none;
    font-size: 1.6rem;
    z-index: 1;
  }

  .ql-editor {
    box-sizing: border-box;
    flex-grow: 1;
    padding: 2.4rem;
    z-index: 1;

    &.ql-blank::before {
      color: #adb5bd;
      font-style: normal;
      left: 2.4rem;
    }

    img {
      display: block;
      justify-content: center;
      align-items: start;
      max-width: 100%;
      height: auto;
      margin: 1rem 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    blockquote {
      border-left: 0.4rem solid var(--main-color);
      padding-left: 2rem;
      margin: 1.6rem 0;
      color: #6c757d;
      font-style: italic;
      background: none;
    }
  }

  //헤더(아이콘들)
  .ql-toolbar {
    width: 100%;
    z-index: 5;
    cursor: default;
    ::-webkit-scrollbar {
      display: none;
    }

    .ql-align {
      &:hover {
        .ql-picker-item:not(.ql-selected) .ql-stroke {
          stroke: #444 !important;
        }
        .ql-picker-item.ql-selected .ql-stroke {
          stroke: #1c77d2 !important;
        }
      }

      .ql-picker-item:hover {
        border: 1px solid #444;
      }
    }

    .ql-formats {
      flex-direction: row;
      justify-content: center;
      align-items: start;
      margin: 0 0.8rem !important;

      ::-webkit-scrollbar {
        display: none;
      }

      & > button,
      .ql-picker:not(.ql-header) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3.2rem;
        height: 3.2rem;
        padding: 0.4rem;
        transition: all 0.2s;

        svg {
          width: 100%;
          height: 100%;
        }

        .ql-picker-label {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        &:hover {
          background: var(--main-color);
        }

        &:hover .ql-stroke {
          stroke: white;
        }

        &:hover .ql-fill {
          fill: white;
        }

        &.ql-active {
          background: var(--main-color);
        }

        &.ql-active .ql-stroke {
          stroke: white;
        }

        &.ql-active .ql-fill {
          fill: white;
        }
      }
    }
  }
`;

export const fixedQuillContainer = css`
  .ql-toolbar {
    width: calc(82% - ${mainSidePadding}*2);
    position: absolute;
    top: calc(${uppserSideBarHeight});
    border: none;
    border-bottom: 0.1rem solid #e9ecef;
    background: #f8f9fa;
    padding: 1.2rem 2.4rem;
    z-index: 5;
  }
`;

export const unfixedQuillContainer = css`
  .ql-toolbar {
    border: none;
    border-bottom: 0.1rem solid #e9ecef;
    background: #f8f9fa;
    padding: 1.2rem 2.4rem;

    .ql-formats {
      & > button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        transition: all 0.2s;

        &:hover {
          background: var(--main-color);
        }

        &:hover .ql-stroke {
          stroke: white;
        }

        &:hover .ql-fill {
          fill: white;
        }

        &.ql-active {
          background: var(--main-color);
        }

        &.ql-active .ql-stroke {
          stroke: white;
        }

        &.ql-active .ql-fill {
          fill: white;
        }
      }
    }

    .ql-picker {
      color: #495057;

      &.ql-expanded .ql-picker-label {
        border-color: var(--main-color);
      }
    }
  }
`;
