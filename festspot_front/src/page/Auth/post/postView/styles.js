/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const container = css`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #fff5f5 0%, #fff0e6 100%);
  min-height: 100vh;
`;

export const article = css`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(255, 107, 107, 0.15);
`;

export const header = css`
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  padding: 40px 30px 30px 30px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
    border-radius: 0 0 20px 20px;
  }
`;

export const title = css`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  line-height: 1.3;
`;

export const metaInfo = css`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 0.95rem;
  opacity: 0.95;
  
  span {
    display: flex;
    align-items: center;
    gap: 5px;
    
    &::before {
      content: '•';
      font-weight: bold;
      margin-right: 5px;
    }
    
    &:first-of-type::before {
      display: none;
    }
  }
`;

export const divider = css`
  border: none;
  height: 1px;
  background: linear-gradient(90deg, transparent, #ff6b6b, transparent);
  margin: 0;
  opacity: 0.3;
`;

export const content = css`
  padding: 30px 40px;
`;

export const textContent = css`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 30px;
  
  p {
    margin-bottom: 16px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &:empty {
      margin-bottom: 8px;
    }
  }
`;

// 통합된 컨텐츠 영역 (텍스트 + 이미지)
export const mixedContent = css`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  
  .content-block {
    margin-bottom: 20px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .text-block p {
    margin-bottom: 16px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &:empty {
      margin-bottom: 8px;
    }
  }
  
  .image-block {
    margin: 25px 0;
    text-align: center;
  }
  
  .image-wrapper {
    display: inline-block;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    max-width: 100%;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }
    
    img {
      width: 100%;
      height: auto;
      max-height: 500px;
      object-fit: cover;
      display: block;
    }
  }
  
  .image-caption {
    margin-top: 8px;
    font-size: 0.9rem;
    color: #666;
    font-style: italic;
  }
`;

export const imageSection = css`
  margin: 40px 0;
`;

export const sectionTitle = css`
  font-size: 1.4rem;
  color: #ff6b6b;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 8px;
  border-bottom: 2px solid #ff6b6b;
  display: inline-block;
`;

export const imageList = css`
  list-style: none;
  display: grid;
  gap: 15px;
  margin-top: 20px;
`;

export const imageItem = css`
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
  
  img {
    width: 100%;
    height: auto;
    max-height: 500px;
    object-fit: cover;
    display: block;
  }
`;

// 이미지 레이아웃 옵션들
export const imageLayoutFull = css`
  width: 100%;
  margin: 25px 0;
`;

export const imageLayoutLeft = css`
  float: left;
  width: 45%;
  margin: 0 20px 20px 0;
  
  @media (max-width: 768px) {
    float: none;
    width: 100%;
    margin: 15px 0;
  }
`;

export const imageLayoutRight = css`
  float: right;
  width: 45%;
  margin: 0 0 20px 20px;
  
  @media (max-width: 768px) {
    float: none;
    width: 100%;
    margin: 15px 0;
  }
`;

export const imageLayoutCenter = css`
  display: block;
  margin: 25px auto;
  max-width: 80%;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const commentsSection = css`
  background: #fafafa;
  padding: 30px 40px;
  border-top: 1px solid #f0f0f0;
`;

export const commentsList = css`
  list-style: none;
  margin-top: 20px;
`;

export const commentItem = css`
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  border-left: 4px solid #ff6b6b;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const commentHeader = css`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: #666;
  
  strong {
    color: #ff6b6b;
    font-weight: 600;
  }
`;

export const commentContent = css`
  line-height: 1.6;
  color: #333;
`;

export const loadingError = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background: white;
  border-radius: 20px;
  margin: 20px;
  font-size: 1.1rem;
  color: #666;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

export const noContent = css`
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 1.1rem;
  background: white;
  border-radius: 20px;
  margin: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

// 반응형 스타일
export const responsive = css`
  @media (max-width: 768px) {
    ${container} {
      padding: 15px;
    }
    
    ${header} {
      padding: 30px 20px 25px 20px;
    }
    
    ${title} {
      font-size: 1.8rem;
    }
    
    ${content}, ${commentsSection} {
      padding: 25px 20px;
    }
    
    ${metaInfo} {
      font-size: 0.85rem;
      gap: 10px;
    }
    
    ${textContent} {
      font-size: 1rem;
    }
  }
  
  @media (max-width: 480px) {
    ${title} {
      font-size: 1.6rem;
    }
    
    ${metaInfo} {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  }
`;