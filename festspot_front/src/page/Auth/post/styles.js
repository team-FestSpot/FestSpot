import { css } from "@emotion/react";

export const containerStyle = css`
  background: #f8f9fa;
  min-height: 100vh;
  padding: 0;
`;

export const headerStyle = css`
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  border-bottom: 1px solid #e9ecef;
  padding: 16px 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const headerContentStyle = css`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const backButtonStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid #dee2e6;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #495057;
  transition: all 0.2s;
  
  &:hover {
    background: #f8f9fa;
    border-color: #adb5bd;
  }
`;

export const headerTitleStyle = css`
  font-size: 18px;
  font-weight: 600;
  color: #212529;
  margin: 0;
`;

export const saveButtonStyle = css`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: #ef5a39;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: #dc4f2e;
  }
`;

export const disabledButtonStyle = css`
  background: #adb5bd;
  cursor: not-allowed;
  
  &:hover {
    background: #adb5bd;
  }
`;

export const mainContentStyle = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 32px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 24px 16px;
  }
`;

export const editorWrapperStyle = css`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

export const titleSectionStyle = css`
  padding: 24px;
  border-bottom: 1px solid #e9ecef;
`;

export const titleInputStyle = css`
  width: 100%;
  padding: 0;
  border: none;
  font-size: 28px;
  font-weight: 700;
  color: #212529;
  line-height: 1.4;
  resize: none;
  overflow: hidden;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: #adb5bd;
    font-weight: 400;
  }
`;

export const titleCountStyle = css`
  margin-top: 8px;
  font-size: 13px;
  color: #6c757d;
  text-align: right;
`;

export const editorSectionStyle = css`
  .ql-container {
    border: none;
    font-size: 16px;
    line-height: 1.6;
    min-height: 600px;
  }
  
  .ql-editor {
    padding: 24px;
    
    &.ql-blank::before {
      color: #adb5bd;
      font-style: normal;
      left: 24px;
      top: 24px;
    }
    
    p {
      margin-bottom: 16px;
      line-height: 1.7;
    }
    
    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 20px 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    h1, h2, h3 {
      margin-top: 32px;
      margin-bottom: 16px;
      color: #212529;
      font-weight: 700;
    }
    
    h1 { font-size: 32px; }
    h2 { font-size: 24px; }
    h3 { font-size: 20px; }
    
    blockquote {
      border-left: 4px solid #ef5a39;
      padding-left: 20px;
      margin: 20px 0;
      color: #6c757d;
      font-style: italic;
      background: none;
    }
    
    ul, ol {
      margin: 16px 0;
      padding-left: 28px;
    }
    
    li {
      margin-bottom: 8px;
      line-height: 1.6;
    }
    
    pre {
      background: #f8f9fa;
      padding: 16px;
      border-radius: 6px;
      overflow-x: auto;
      margin: 20px 0;
      border: 1px solid #e9ecef;
    }
    
    code {
      background: #f8f9fa;
      padding: 3px 6px;
      border-radius: 4px;
      font-size: 14px;
      border: 1px solid #e9ecef;
    }
  }
  
  .ql-toolbar {
    border: none;
    border-bottom: 1px solid #e9ecef;
    background: #f8f9fa;
    padding: 12px 24px;
    
    .ql-formats {
      margin-right: 16px;
      
      &:last-child {
        margin-right: 0;
      }
    }
    
    button {
      width: 32px;
      height: 32px;
      margin: 0 2px;
      border-radius: 4px;
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
    
    .ql-picker {
      color: #495057;
      
      &.ql-expanded .ql-picker-label {
        border-color: #ef5a39;
      }
    }
  }
`;

export const sidebarStyle = css`
  @media (max-width: 1024px) {
    order: -1;
  }
`;

export const sidebarSectionStyle = css`
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #212529;
    margin: 0 0 16px 0;
  }
`;

export const imageUploadButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  background: #f8f9fa;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #6c757d;
  transition: all 0.2s;
  margin-bottom: 16px;
  
  &:hover {
    border-color: #ef5a39;
    background: #fff5f3;
    color: #ef5a39;
  }
`;

export const hiddenFileInputStyle = css`
  display: none;
`;

export const imagePreviewGridStyle = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

export const imagePreviewItemStyle = css`
  position: relative;
  aspect-ratio: 1;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e9ecef;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const previewImageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const removeImageButtonStyle = css`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.2s;
  
  &:hover {
    background: rgba(220, 53, 69, 0.9);
  }
`;

export const editorInfoStyle = css`
  padding: 16px 24px;
  font-size: 13px;
  color: #6c757d;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  
  code {
    background: #e9ecef;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 12px;
  }
`;

export const settingsStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const settingItemStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  label {
    font-size: 14px;
    color: #495057;
  }
  
  select {
    padding: 6px 8px;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    font-size: 13px;
    background: white;
    color: #495057;
  }
`;