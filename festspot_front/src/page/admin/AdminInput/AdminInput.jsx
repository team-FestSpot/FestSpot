import React, { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./styles";

function AdminInput({props}) {

    return (
        <div css={s.layout}>
            <div css={s.menuText}>
                <p>{props.placeholder}</p>
            </div>
            {
                props.type === "text" 
                ? 
                    <div key={props.id} css={s.inputContainer}>
                        <input type={props.type} placeholder={props.placeholder} options={props.type==="select" ? options : null} />
                    </div>
                : props.type === "select" 
                ? 
                    <div key={props.id} css={s.inputContainer}>
                        <select name="" id={props.id}>
                            {
                                props.options.map(option => <option key={option} value={option}>{option}</option>)
                            }
                        </select>
                    </div> 
                : props.type === "date"
                ? 
                    <div key={props.id} css={s.inputContainer}>
                        <input type='date' onKeyDown={e => e.preventDefault()} />
                    </div>
                : <></>
            }
        </div>
    );
}

export default AdminInput;