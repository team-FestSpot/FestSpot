import { css } from "@emotion/react";

export const myPageMainLayout = css`
  display: flex;
  justify-content: center;

  @media (max-width: 1024px) {
    flex-direction: column;
  }

  width: 100%;
  height: 95%;
`;
