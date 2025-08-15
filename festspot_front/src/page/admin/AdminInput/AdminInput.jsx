import React, { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import useAdminAddPerformanceStore from '../../../stores/AdminAddPerformanceStore';

function AdminInput({props}) {
    const {setDetails} = useAdminAddPerformanceStore();

    const handleInputOnChange = (e, id) => {
        setDetails(id, e.target.value);
    }

    // useEffect(() => {
    //     console.log(details);
    // }, [details]);

    // useEffect(() => {
    //     if(props.id === "relatenm" || props.id === "relateurl") {
    //         console.log(props);
    //     }
    // }, [])

    return (
        <div css={s.layout}>
            <div css={s.menuText}>
                <p>{props.placeholder}</p>
            </div>
            {
                props.type === "text"
                ? 
                    <div key={props.id} css={s.inputContainer}>
                        <input type={props.type} 
                        placeholder={props.placeholder} 
                        options={props.type==="select" ? options : null} 
                        onChange={(e) => handleInputOnChange(e, props.id)}
                        />
                    </div>
                : props.type === "select" 
                ? 
                    <div key={props.id} css={s.inputContainer}>
                        <select name="" id={props.id} onChange={(e) => handleInputOnChange(e, props.id)}>
                            {
                                props.options.map(option => <option key={option} value={option}>{option}</option>)
                            }
                        </select>
                    </div> 
                : props.type === "date"
                ? 
                    <div key={props.id} css={s.inputContainer}>
                        <input type='date' onKeyDown={e => e.preventDefault()} onChange={(e) => handleInputOnChange(e, props.id)} />
                    </div>
                :  <></>
            }
        </div>
    );
}

export default AdminInput;