import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import AdminInput from '../AdminInput/AdminInput';

function AdminInputList({inputList}) {

    return (
        <div css={s.inputListContainerLayout}>
            <div css={s.inputListContainer}>
            {inputList.map((input, index) => (
                <div key={index} css={s.inputListContainer}>
                    <AdminInput props={input} />
                </div>
            ))}
        </div>
      </div>
    );
}

export default AdminInputList;