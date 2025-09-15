import { css } from "@emotion/react";

export const inputListContainerLayout = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  height: auto;
`;

export const inputListContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex-shrink: 0;
`;

export const inputTicketingContainer = css`
  display: flex;
  flex-direction: row;
  width: 70%;
  gap: 10px;
  flex-shrink: 0;

  @media (max-width: 1400px) {
    flex-direction: column;
  }
`;

export const menuText = css`
  width: 10rem;

  @media (max-width: 1400px) {
    flex-direction: column;
    & > p {
      margin: 0;
    }
  }
`;


