import { css } from "@emotion/react";

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
`;

export const headerTitle = css`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #212529;
`;

export const saveButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1.6rem;
  border: 0.1rem solid #ef5a39;
  border-radius: 0.6rem;
  font-weight: 500;
  color: white;
  background: #ef5a39;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: #dc4f2e;
  }

  @media (max-width: 1024px) {
    gap: 0.3rem;
    padding: 0.4rem 0.4rem;
  }
`;

export const disabledButtonStyle = css`
  background: #adb5bd;
  cursor: not-allowed;

  &:hover {
    background: #adb5bd;
  }
`;

export const main = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
  margin: 0 auto;
  padding: 3.2rem 2.4rem;
  gap: 0.8rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 2.4rem 1.6rem;
  }
`;

export const postContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
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

  .quill {
  }

  .ql-container {
    position: relative;
    border: none;
    font-size: 1.6rem;
    z-index: 1;
  }

  .ql-editor {
    box-sizing: border-box;
    flex-grow: 1;
    padding: 2.4rem;

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
      border-radius: 8px;
      margin: 1rem 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    blockquote {
      border-left: 0.4rem solid #ef5a39;
      padding-left: 2rem;
      margin: 1.6rem 0;
      color: #6c757d;
      font-style: italic;
      background: none;
    }
  }

  //헤더(아이콘들)
  .ql-toolbar {
    ::-webkit-scrollbar {
      display: none;
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
          background: #ef5a39;
        }

        &:hover .ql-stroke {
          stroke: white;
        }

        &:hover .ql-fill {
          fill: white;
        }

        &.ql-active {
          background: #ef5a39;
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
    position: absolute;
    top: 50rem;
    border: none;
    border-bottom: 0.1rem solid #e9ecef;
    background: #f8f9fa;
    padding: 1.2rem 2.4rem;
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
          background: #ef5a39;
        }

        &:hover .ql-stroke {
          stroke: white;
        }

        &:hover .ql-fill {
          fill: white;
        }

        &.ql-active {
          background: #ef5a39;
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
        border-color: #ef5a39;
      }
    }
  }
`;

export const extensionContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  border-radius: 0.8rem;
  width: 30%;
  height: fit-content;
  padding: 2rem;
  margin-bottom: 2em;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #212529;
    margin: 0;
    margin-bottom: 1.6rem;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const imageUploadButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 2px dashed #dee2e6;
  border-radius: 0.8rem;
  margin-bottom: 1.6rem;
  padding: 1.2rem;
  gap: 8px;
  width: 100%;
  font-size: 14px;
  color: #6c757d;
  background-color: #f8f9fa;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: #ef5a39;
    background-color: #fff5f3;
    color: #ef5a39;
  }
`;

export const hiddenFileInput = css`
  display: none;
`;

export const imagePreviewContainer = css`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  gap: 8px;
`;

export const imagePreviewItem = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #e9ecef;
  border-radius: 0.8rem;
  width: 45%;
  aspect-ratio: 1;
  transition: ease-in-out 0.2s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  & > img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1024px) {
    width: 15%;
  }
`;

export const removeImageButton = css`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 4px;
  right: 4px;
  background-color: #000000b3;
  color: white;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  font-size: 12px;
  transition: ease-in-out 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #ef5a39;
  }

  @media (max-width: 1024px) {
    width: 3rem;
    height: 3rem;
  }
`;

export const commentableButton = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  label {
    font-size: 1.4rem;
    color: #495057;
  }

  select {
    padding: 6px 8px;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    font-size: 1.4rem;
    background: white;
    color: #495057;
  }
`;
