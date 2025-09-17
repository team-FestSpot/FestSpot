import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { reqLogin } from "../../../api/authApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import usePrincipalQuery from "../../../querys/auth/usePrincipalQuery";

function AdminLoginPage(props) {
  const queryClient = useQueryClient();
  const { refetch } = usePrincipalQuery();
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

  const handleLoginInputOnKeyDown = (e) => {
    if (e.keyCode !== 13) {
      return;
    }
    handleLoginButtonOnClick();
  };

  const handleLoginButtonOnClick = async () => {
    try {
      const response = await reqLogin(inputValue);
      const { accessToken } = response?.data?.body;
      localStorage.setItem("AccessToken", `Bearer ${accessToken}`);

      await queryClient.invalidateQueries({
        queryKey: ["principal"],
      });

      const updatedPrincipalData = await refetch();
      const authorities = updatedPrincipalData?.data?.data?.body?.authorities;
      const admin = authorities.filter(
        (authority) => authority.authority === "ROLE_ADMIN"
      );
      if (admin.length < 1) {
        await Swal.fire({
          title: "아이디 또는 비밀번호를 확인하세요.",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.clear();
        return;
      }
      await Swal.fire({
        title: "로그인 성공",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/admin/dashboard");
    } catch (error) {
      await Swal.fire({
        title: "아이디 또는 비밀번호를 확인하세요.",
        icon: "error",
      });
      localStorage.clear();
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
          onKeyDown={handleLoginInputOnKeyDown}
        />
        <TextField
          type="password"
          size="small"
          placeholder="password"
          name="userPassword"
          onChange={handleInputOnChange}
          onKeyDown={handleLoginInputOnKeyDown}
        />
        <Button 
          onClick={handleLoginButtonOnClick}
          variant="contained"
          sx={{ backgroundColor:"#EA580C" }}
        >
          관리자 로그인
        </Button>
      </div>
    </div>
  );
}

export default AdminLoginPage;
