import { css } from "@emotion/react";

export const container = css`
  position: static;
  .modal {
    box-sizing: border-box;
    border-radius: 2rem;
    overflow: hidden;
    width: auto;
    height: auto;
    max-height: 80%;
    max-width: 80%;

    @media (max-width: 1024px) {
      overflow: scroll;

      ::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;

export const PerformanceDetailModalLayout = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: auto;
  height: auto;
  font-size: 1.5rem;
  background-color: white;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const imgContainer = css`
  position: relative;
  width: auto;
  height: auto;
`;

export const posterImg = css`
  max-width: 40vw;
  max-height: 80vh;
  object-fit: contain;

  @media (max-width: 1024px) {
    max-height: 50vh;
    object-fit: contain;
  }
  @media (max-width: 768px) {
    max-height: 50vh;
    max-width: 60vw;
    object-fit: contain;
  }
  @media (max-width: 480px) {
    max-height: 40vh;
    max-width: 80vw;
    object-fit: contain;
  }
`;

export const responsiveDateBox = css`
  display: none;
  position: absolute;
  bottom: 2%;
  left: 2%;
  box-sizing: border-box;
  border-radius: 2rem;
  background-color: #ef5a39;
  width: fit-content;
  padding: 1% 1.5%;
  color: white;
  font-size: 1.2rem;

  @media (max-width: 1024px) {
    display: block;
  }
`;

export const infoContainer = css`
  box-sizing: border-box;
  align-items: start;
  width: 30vw;
  padding: 2%;
  object-fit: contain;

  @media (max-width: 1024px) {
    text-align: center;
    width: 60vw;
    padding: 5%;
  }
`;

export const dateContainer = css`
  width: 100%;

  & > div {
    box-sizing: border-box;
    border-radius: 2rem;
    background-color: #ef5a39;
    width: fit-content;
    padding: 1% 1.5%;
    color: white;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const titleContainer = css`
  width: 100%;
`;
export const venueContainer = css`
  border-radius: 1rem;
  width: 100%;
  height: fit-content;
  padding: 5% 2%;
  margin: 5% 0;
  background-color: #f7f7f7;

  & > div:first-of-type {
    font-weight: 600;
    margin-bottom: 0.4rem;
  }
  & > div:last-of-type {
    padding: 0 0.4rem;
  }
`;
export const castContainer = css`
  border-radius: 1rem;
  width: 100%;
  height: fit-content;
  padding: 5% 2%;
  margin: 5% 0;
  background-color: #f7f7f7;

  & > div:first-of-type {
    font-weight: 600;
    margin-bottom: 0.4rem;
  }
  & > div:last-of-type {
    padding: 0 0.4rem;
  }
`;

export const urlContainer = css`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  width: 100%;
  height: fit-content;
  padding: 5% 2%;
  margin: 5% 0;
  background-color: #f7f7f7;

  & > div:first-of-type {
    font-weight: 600;
    margin-bottom: 0.4rem;
  }

  & > div:last-of-type {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    & > div {
      box-sizing: border-box;
      border-radius: 2rem;
      background-color: #ef5a39;
      width: fit-content;
      padding: 2% 2%;
      & > a {
        text-decoration: none;
        color: white;
      }
    }
  }
`;
