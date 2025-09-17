import { css } from "@emotion/react";
export const inputTicketingContainer = css`
  display: flex;
  width: 100%;
  margin: 1rem 0;

  & > div:first-of-type {
    width: 30%;
    gap: 2rem;
  }

  & > div:nth-of-type(2) {
    margin-left: 2rem;
    width: 65%;
  }
`;

export const oneSideInputContainer = css`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 4rem;

  & > div:first-of-type {
    display: flex;
    justify-content: start;
    width: 11rem;
  }

  & > div:last-of-type {
    display: flex;
    justify-content: start;
  }

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 95%;
  }
`;


export const inputTicketingAgencyNameContainer = css`
  
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2.5rem;
  `;

export const inputTicketingUrlContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 2.5rem;
  `;

export const urlAddRemoveButtonsContainer = css`
  display: flex;
  flex-direction: row;
  font-size: 2rem;
  align-items: center;
  margin-left: 1rem;
`;

export const addButtonContainer = css`
  margin: 2rem 0;
  height: 5rem;
`;