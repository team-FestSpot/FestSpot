import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { reqLogin, reqPrincipal } from "../../../api/authApi";
import { useNavigate } from "react-router-dom";

function AdminLoginPage(props) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    userLoginId: "",
    userPassword: "",
  });

  const handleInputOnChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginButtonOnClick = async () => {
    const response = await reqLogin(inputValue);
    localStorage.setItem(
      "AccessToken",
      `Bearer ${response.data.body.accessToken}`
    );
    const principalResponse = await reqPrincipal();
    console.log(principalResponse);
    if (principalResponse.status === 200) {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div css={s.layout}>
      <div css={s.inputContainer}>
        <TextField
          type="text"
          size="small"
          placeholder="username"
          name="userLoginId"
          onChange={handleInputOnChange}
        />
        <TextField
          type="password"
          size="small"
          placeholder="password"
          name="userPassword"
          onChange={handleInputOnChange}
        />
        <Button onClick={handleLoginButtonOnClick}>관리자 로그인</Button>
      </div>
    </div>
  );
}

export default AdminLoginPage;
