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
`;

export const inputContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: 10px;
    height: auto;

    & > input {
        width: 100%;
    }
`;

export const inputTicketingAgencyNameContainer = css`
    flex: 1;
    max-width: 150px;

    & > input {
        width: 100%;
        height: 40px;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-sizing: border-box;
    }
`;

export const inputTicketingUrlContainer = css`
    flex: 3;
    max-width: 768px;
    min-width: 300px;

    & > input {
        width: 100%;
        height: 40px;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-sizing: border-box;
    }
`