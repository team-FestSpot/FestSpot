import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const menuText = css`
    width: 150px;
    margin-right: 10px;
`;

export const inputContainer = css`
    display: flex;
    width: 100%;
    height: 20px;

    & > input {
        width: 100%;
    }
`;