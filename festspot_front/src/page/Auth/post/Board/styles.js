import { css } from "@emotion/react";

// 메인 컨테이너
export const mainContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 24px 16px;
  }

  @media (max-width: 480px) {
    padding: 16px 12px;
  }
`;

// 게시판 헤더
export const boardHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const boardInfo = css`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const boardTitle = css`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2d3748;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const boardMeta = css`
  font-size: 0.875rem;
  color: #6b7280;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const headerButtons = css`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    align-self: flex-end;
  }
`;

export const writeBtn = css`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ef5a39;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(239, 90, 57, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
`;

// 로딩 상태
export const loadingContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
`;

export const loadingSpinner = css`
  font-size: 1.1rem;
  color: #6b7280;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

// 에러 상태
export const errorContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  gap: 16px;
`;

export const errorMessage = css`
  color: #dc2626;
  font-size: 1rem;
  text-align: center;
`;

export const retryBtn = css`
  background: #dc2626;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #b91c1c;
    transform: scale(1.02);
  }
`;

// 카드 그리드 - 4x5 격자 (반응형)
export const cardsGrid = css`
  display: grid;
  gap: 24px;
  margin-bottom: 32px;

  /* 기본: 4열 (1200px 이상) */
  grid-template-columns: repeat(4, 1fr);

  /* 큰 태블릿: 3열 (1024px ~ 1199px) */
  @media (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  /* 태블릿: 2열 (768px ~ 1023px) */
  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }

  /* 모바일 큰 화면: 2열 유지 (640px ~ 767px) */
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  /* 모바일 작은 화면: 1열 (639px 이하) */
  @media (max-width: 639px) {
    grid-template-columns: 1fr;
    gap: 16px;
    max-width: 400px;
    margin: 0 auto 32px auto;
  }
`;

// 카드 스타일
export const card = css`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 0;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    &:hover {
      transform: scale(1.02);
    }
  }
`;

export const cardImageContainer = css`
  position: relative;
  height: 200px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 180px;
  }

  @media (max-width: 639px) {
    height: 200px;
  }
`;

export const cardImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const cardImageOverlay = css`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
`;

export const cardContent = css`
  padding: 16px;

  @media (max-width: 480px) {
    padding: 14px;
  }
`;

export const cardTitle = css`
  font-size: 0.875rem;
  font-weight: 600;
  color: #2d3748;
  line-height: 1.4;
  transition: color 0.2s;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0 0 8px 0;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const cardMeta = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  font-size: 0.6rem;
  color: #9ca3af;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    font-size: 0.55rem;
  }
`;

export const cardAuthor = css`
  font-weight: 400;
  color: #6b7280;
  font-size: 0.6rem;
`;

export const cardDate = css`
  color: #9ca3af;
  font-size: 0.6rem;
`;

// 빈 상태
export const emptyContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  gap: 20px;
`;

export const emptyMessage = css`
  font-size: 1.125rem;
  color: #6b7280;
  text-align: center;
`;

// 페이지네이션
export const pagination = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 32px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    gap: 4px;
  }
`;

export const paginationBtn = css`
  padding: 8px;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  min-height: 40px;

  &:hover:not(:disabled) {
    background: #f9fafb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    padding: 6px;
    min-width: 36px;
    min-height: 36px;
  }
`;

export const paginationNumber = css`
  padding: 8px 12px;
  border: none;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  color: #374151;
  min-width: 40px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f9fafb;
  }

  &.active {
    background: #ef5a39;
    color: white;
    box-shadow: 0 4px 12px rgba(239, 90, 57, 0.3);
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    min-width: 36px;
    min-height: 36px;
    font-size: 0.9rem;
  }
`;

export const paginationNumberActive = css`
  background: #ef5a39;
  color: white;
  box-shadow: 0 4px 12px rgba(239, 90, 57, 0.3);
`;

// 아이콘 스타일
export const icon = css`
  width: 20px;
  height: 20px;

  @media (max-width: 480px) {
    width: 18px;
    height: 18px;
  }
`;
