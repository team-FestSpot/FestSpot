import { css } from "@emotion/react";

export const loginLayout = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const loginContainer = css`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 2rem;
  width: 40rem;
  height: auto;
  padding: 3rem;
  background-color: #fbd8d056;
`;

export const header = css`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 5%;
`;

export const logoIcon = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 5vh;

  & > img {
    height: 100%;
  }
`;

export const main = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const textField = css`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 3%;

  .MuiInputBase-input,
  .MuiInputLabel-root,
  .MuiOutlinedInput-notchedOutline {
    font-size: 1.4rem;
  }

  .MuiInputBase-root {
    & > input {
      width: 85%;
    }
  }

  .MuiTextField-root {
    margin-bottom: 0;
  }
`;

export const visiblePassword = css`
  position: absolute;
  top: 1.4rem;
  right: 1rem;
  width: auto;
  height: fit-content;
  font-size: 1.8rem;
  cursor: pointer;
`;

export const textFieldHelp = css`
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 1rem;
  color: red;
  margin: 0;
  margin-bottom: 2%;
`;

export const buttonContainer = css`
  width: 100%;
  margin-bottom: 1%;
  .MuiButtonBase-root {
    font-size: 1.4rem;
  }
`;

export const toLoginContainer = css`
  display: flex;
  justify-content: end;
  width: 100%;
  margin-bottom: 5%;
  font-size: 1.2rem;

  & > span {
    margin: 0 2%;
  }
`;

export const divider = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 5%;

  & > span {
    margin: 0 1.5rem;
  }

  & > div {
    box-shadow: 0 0 0 0.01rem #000;
    flex-grow: 1;
  }
`;

export const footer = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const OAuth2Container = css`
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;

  & > a {
    border-radius: 50%;
    padding: 3%;
    width: auto;
    height: 4vh;
    background-color: #fbd8d0;
    & > img {
      height: 100%;
    }
  }
`;
