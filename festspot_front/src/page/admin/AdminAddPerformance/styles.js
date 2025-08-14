import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

export const imgContainerLayout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    width: 100%;
    max-height: 40vh;
    overflow: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
`;

export const imgContainer = css`
    display: flex;
    max-width: 320px;

    & > img {
        width: 100%;
        height: 100%;
    }
`;

export const imgInput = css`
    display: flex;
    justify-content: center;
    width: 100%;
    
`;

export const inputListContainerLayout = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
    padding-bottom: 30px;
`;

export const inputListContainer = css`
    display: flex;
    width: 60%;
    height: 40px;
    margin-bottom: 10px;
`;