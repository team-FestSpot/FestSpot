import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import useAdminAddPerformanceStore from '../../../stores/AdminAddPerformanceStore';
import AdminInput from '../AdminInput/AdminInput';
import Button from '@mui/material/Button';

function AdminInputList({inputList}) {
    const { detail, setDetail, setDetailEmpty } = useAdminAddPerformanceStore();

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