import { css } from "@emotion/react";

export const loginContainer = css`
  background-color: #fff5f3;
  border-radius: 1rem;
  padding: 4rem;
  width: 25rem;
  max-width: 90vw;
  margin: 0 auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const logoContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const logoIcon = css`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 10rem;
    height: 10rem;
  }
`;

export const inputSection = css`
  width: 100%;
  margin-bottom: 1rem;
`;

export const textFieldContainer = css`
  margin-bottom: 0.8rem;
  width: 100%;
`;

export const textField = css`
  & .MuiOutlinedInput-root {
    background-color: white;
    border-radius: 0.8rem;

    &:hover fieldset {
      border-color: #ff6b47;
    }

    &.Mui-focused fieldset {
      border-color: #ff6b47;
    }
  }

  & .MuiInputLabel-root {
    color: #999;

    &.Mui-focused {
      color: #ff6b47;
    }
  }
`;

export const submitButtonContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > p {
    color: #999;
    font-size: 0.8rem;
  }

  & > a {
    font-size: 1rem;
  }
`;

export const loginButton = css`
  background-color: #ff6b47;
  color: white;
  padding: 0.8rem 0;
  border-radius: 0.8rem;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.8rem;

  &:hover {
    background-color: #e55a3c;
  }

  &:disabled {
    background-color: #ccc;
  }
`;

export const divider = css`
  position: relative;
  width: 100%;
  text-align: center;
  margin: 1.5rem 0;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 0.01rem;
    background-color: #ddd;
  }
`;

export const dividerText = css`
  background-color: #fff5f3;
  padding: 0 1rem;
  color: #999;
  font-size: 0.8rem;
`;

export const socialButtonContainer = css`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 1.3rem;
`;

export const socialButton = css`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  & > img {
    height: 100%;
  }
`;

export const socialLoginInfo = css`
  margin-top: 2rem;
  text-align: center;
`;

export const socialLoginText = css`
  color: #999;
  font-size: 0.7rem;
  line-height: 1.4;
  margin: 0;
`;
