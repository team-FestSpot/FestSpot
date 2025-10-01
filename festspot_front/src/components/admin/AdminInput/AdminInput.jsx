import React, { useEffect } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import useAdminAddPerformanceStore from "../../../stores/AdminAddPerformanceStore";
import TextField from "@mui/material/TextField";

function AdminInput({ props }) {
  const { detail, setDetail } = useAdminAddPerformanceStore();

  const handleInputOnChange = (e, id) => {
    setDetail(id, e.target.value);
  };

  useEffect(() => {
    if(!!props.options && detail[props.id].length < 1) {
      setDetail(props.id, props.options[0])
    }
  }, []);

  return (
    <div css={s.layout}>
      <div css={s.menuText}>
        <p>{props.placeholder}</p>
      </div>
      {props.type === "text" ? (
        <div key={props.id} css={s.inputContainer}>
          <TextField
            size="small"
            type={props.type}
            placeholder={props.placeholder}
            options={props.type === "select" ? options : null}
            onChange={(e) => handleInputOnChange(e, props.id)}
            sx={{ width: "100%" }}
            defaultValue={detail[props.id]} // props 구조: AdminPerformanceUpdateModal2 -> AdminInputList -> AdminInput

          />
        </div>
      ) : props.type === "select" ? (
        <div key={props.id} css={s.inputContainer}>
          <select
            name=""
            id={props.id}
            onChange={(e) => handleInputOnChange(e, props.id)}
            defaultValue={detail[props.id]} // props 구조: AdminPerformanceUpdateModal2 -> AdminInputList -> AdminInput
          >
            {props.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ) : props.type === "date" ? (
        <div key={props.id} css={s.inputContainer}>
          <input
            type="date"
            onKeyDown={(e) => e.preventDefault()}
            onChange={(e) => handleInputOnChange(e, props.id)}
            defaultValue={detail[props.id]} // props 구조: AdminPerformanceUpdateModal2 -> AdminInputList -> AdminInput
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AdminInput;
