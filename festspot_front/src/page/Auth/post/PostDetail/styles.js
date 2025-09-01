/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const ACCENT = "#e55a42";

/* 공통 컨테이너 */
export const container = css`
  --accent: ${ACCENT};
  --fg: #1f2937; /* slate-800 */
  --muted: #6b7280; /* gray-500 */
  --line: rgba(0, 0, 0, 0.08);
  --bg: #ffffff;
  --chip-bg: rgba(229, 90, 66, 0.08);

  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 20px 16px 80px;

  @media (min-width: 480px) {
    padding: 24px 18px 88px;
  }
  @media (min-width: 768px) {
    padding: 32px 24px 96px;
  }
`;

/* 헤더 레이아웃 */
export const header = css`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  column-gap: 16px;
  row-gap: 6px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr auto; /* 좌: 타이틀/메타, 우: 빈공간(추후 버튼 배치용) */
  }
`;

/* 제목 */
export const title = css`
  font-size: clamp(22px, 4vw, 32px);
  line-height: 1.25;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--fg);
  margin: 0;
`;

/** 방법 B: 마커펜 느낌(더 안정적) */
export const titleText = css`
  display: inline;
  padding: 0 0.02em 2px;
  box-shadow: inset 0 -0.42em rgba(229, 90, 66, 0.16);
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
`;

/* 메타(작성자/작성일) */
export const meta = css`
  flex: 1 1 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: var(--muted);
  font-size: 13.5px;

  & > span:first-of-type {
    font-weight: 600;
    color: #374151;
  }

  @media (max-width: 399px) {
    font-size: 12.75px;
  }
`;

/* 점 구분자 */
export const dot = css`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--line);
  display: inline-block;
`;

/* 통계칩(조회/좋아요/댓글) */
export const stats = css`
  margin-left: auto; /* 오른쪽 끝으로 */
  display: flex;
  gap: 10px;

  @media (max-width: 399px) {
    gap: 6px;
  }
`;

export const fill = css`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12.5px;
  background: var(--chip-bg);
  color: #8b3b2f; /* 어두운 주톤 */
  border: 1px solid rgba(229, 90, 66, 0.18);
  white-space: nowrap;

  @media (max-width: 399px) {
    padding: 5px 8px;
    font-size: 12px;
  }
`;

/* 구분선 */
export const divider = css`
  margin: 18px 0 14px;
  height: 1px;
  border: 0;
  background: linear-gradient(
      to right,
      rgba(229, 90, 66, 0.35),
      rgba(229, 90, 66, 0)
    ),
    linear-gradient(var(--line), var(--line));
`;

/* 본문 */
export const content = css`
  color: #111827;
  line-height: 1.8;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 16.5px;

  /* 문단 간격 */
  & > * + * {
    margin-top: 0.9em;
  }

  /* 제목들 */
  h1,
  h2,
  h3 {
    color: #0f172a; /* slate-900 */
    font-weight: 800;
    letter-spacing: -0.01em;
    line-height: 1.3;
    margin-top: 1.6em;
  }
  h1 {
    font-size: clamp(24px, 4vw, 28px);
  }
  h2 {
    font-size: clamp(20px, 3.5vw, 24px);
  }
  h3 {
    font-size: clamp(18px, 3vw, 20px);
  }

  /* 링크 */
  a {
    color: ${ACCENT};
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 3px;
    word-break: break-all;
  }
  a:hover {
    opacity: 0.9;
  }

  /* 리스트 */
  ul,
  ol {
    padding-left: 1.25em;
  }
  li {
    margin: 0.25em 0;
  }

  /* 인용구 */
  blockquote {
    margin: 1em 0;
    padding: 12px 14px;
    background: rgba(229, 90, 66, 0.06);
    border-left: 4px solid ${ACCENT};
    border-radius: 8px;
    color: #374151;
  }

  /* 코드 */
  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas,
      "Liberation Mono", monospace;
    background: #f8fafc;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 2px 6px;
    font-size: 0.95em;
  }
  pre {
    overflow: auto;
    background: #0b1020;
    color: #e5e7eb;
    border-radius: 12px;
    padding: 14px 16px;
    border: 1px solid rgba(229, 90, 66, 0.25);
  }
  pre code {
    background: transparent;
    border: 0;
    padding: 0;
    color: inherit;
  }

  /* 이미지 (PostBody inline 스타일 보완) */
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 14px auto;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(16, 24, 40, 0.06);
    border: 1px solid rgba(17, 24, 39, 0.04);
  }

  /* 구분선 */
  hr {
    border: 0;
    height: 1px;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      var(--line),
      rgba(0, 0, 0, 0)
    );
    margin: 24px 0;
  }

  /* 작은 화면 폰트/라인하이트 튜닝 */
  @media (max-width: 399px) {
    font-size: 15.5px;
    line-height: 1.75;
  }
`;

/* 시스템 다크모드 대응 (선택) */
export const darkMode = css`
  @media (prefers-color-scheme: dark) {
    :where(&) {
      --fg: #e5e7eb;
      --muted: #9ca3af;
      --line: rgba(255, 255, 255, 0.12);
      --bg: #0b0f14;
      --chip-bg: rgba(229, 90, 66, 0.18);
    }

    ${content} {
      color: #e5e7eb;

      a {
        color: ${ACCENT};
      }
      blockquote {
        background: rgba(229, 90, 66, 0.12);
        color: #cbd5e1;
      }
      code {
        background: #0f172a;
        border-color: #1f2937;
        color: #e5e7eb;
      }
      pre {
        background: #0b1020;
        border-color: rgba(229, 90, 66, 0.32);
      }
      img {
        border-color: rgba(255, 255, 255, 0.06);
        box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
      }
    }
  }
`;

/* (선택) 상단 버튼/배지에 쓰기 좋은 보조 스타일 */
export const badge = css`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12.5px;
  background: rgba(229, 90, 66, 0.08);
  color: ${ACCENT};
  border: 1px solid rgba(229, 90, 66, 0.18);
`;

export const headerActions = css`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 399px) {
    gap: 6px;
  }

  & > button,
  & > a {
    appearance: none;
    border: 1px solid rgba(229, 90, 66, 0.25);
    background: #fff;
    color: ${ACCENT};
    border-radius: 12px;
    padding: 8px 12px;
    font-size: 13.5px;
    cursor: pointer;
    transition: transform 0.05s ease, background 0.2s ease;

    &:hover {
      background: rgba(229, 90, 66, 0.06);
    }
    &:active {
      transform: translateY(1px);
    }

    @media (max-width: 399px) {
      padding: 7px 10px;
      font-size: 12.75px;
    }
  }
`;

/* 좋아요 버튼 영역 */
export const likeBox = css`
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const likeButton = (liked) => css`
  appearance: none;
  border: none;
  border-radius: 999px;
  padding: 10px 18px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s ease-in-out;
  background: ${liked ? "var(--accent)" : "rgba(229, 90, 66, 0.08)"};
  color: ${liked ? "#fff" : "var(--accent)"};

  &:hover {
    background: ${liked ? "#d94d36" : "rgba(229, 90, 66, 0.15)"};
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(1px);
  }
`;

export const likeCount = css`
  font-size: 15px;
  font-weight: 500;
  color: var(--fg);
`;

/* 댓글 영역 */
export const commentSection = css`
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
`;

export const commentTitle = css`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--fg);
`;

export const commentInput = css`
  width: 100%;
  min-height: 80px;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  resize: vertical;
  font-size: 14px;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 2px rgba(229, 90, 66, 0.2);
  }
`;

export const commentSubmit = css`
  padding: 8px 14px;
  background: var(--accent);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 18px;

  &:hover {
    background: #d94d36;
  }
`;

export const commentList = css`
  display: flex;
  flex-direction: column;
  gap: 14px;

  li {
    padding: 10px 12px;
    border-radius: 8px;
    background: #fafafa;
    border: 1px solid var(--line);

    p {
      margin: 4px 0 0;
      font-size: 14px;
      color: #374151;
    }
  }
`;

export const commentAuthor = css`
  font-weight: 600;
  font-size: 13.5px;
  color: var(--accent);
`;
