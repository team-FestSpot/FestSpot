import { css } from "@emotion/react";
export const inputTicketingContainer = css`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
  flex-shrink: 0;

  @media (max-width: 1400px) {
    flex-direction: column;
  }
`;

export const urlAddRemoveButtonsContainer = css`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  align-items: center;
`;

export const inputTicketingAgencyNameContainer = css`
  flex: 1;
  max-width: 15rem;
  min-width: 10rem;
  align-content: center;

  & > input {
    width: 100%;
    height: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

export const inputTicketingUrlContainer = css`
  flex: 3;
  max-width: 768px;
  min-width: 300px;
  align-content: center;
`;

export const addButtonContainer = css`
  margin: 2rem 0;
  height: 5rem;
`;