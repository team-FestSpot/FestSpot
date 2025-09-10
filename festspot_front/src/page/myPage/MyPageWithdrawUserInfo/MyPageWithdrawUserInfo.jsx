import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import { useWithdrawUserMutation } from "../../../querys/auth/useWithdrawUserMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function MyPageWithdrawUserInfo(props) {
  const [passwordInput, setPasswordInput] = useState("");
  const withdrawUserMutation = useWithdrawUserMutation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handlePasswordInputOnChange = (e) => {
    setPasswordInput(e.target.value);
  };

  const handleWithdrawButtonOnClick = async () => {
    const password = {
      password: passwordInput,
    };
    const result = await Swal.fire({
      icon: "warning",
      title: "탈퇴하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니오",
    });
    if (result.isDismissed) {
      return;
    }
    if (result.isConfirmed) {
      const response = await withdrawUserMutation.mutateAsync(password);
      console.log(response);

      if (response?.data?.body !== "회원 탈퇴가 완료되었습니다.") {
        await Swal.fire({
          icon: "error",
          title: response?.data?.body,
          timer: 1500,
          showConfirmButton: false,
          showCancelButton: false,
        });
        return;
      }

      await Swal.fire({
        icon: "success",
        title: response?.data?.body,
        timer: 1500,
        showConfirmButton: false,
        showCancelButton: false,
      });
      localStorage.clear();
      await queryClient.invalidateQueries(["pricipal"]);
      navigate("/");
    }
  };

  return (
    <div css={s.contentsLayout}>
      <div css={s.inputContainer}>
        <div css={s.inputPlaceholderContainer}>
          <h4>비밀번호</h4>
        </div>
        <div css={s.textFieldContainer}>
          <TextField
            type="password"
            placeholder={"비밀번호 입력"}
            sx={{ width: "100%" }}
            onChange={handlePasswordInputOnChange}
          />
        </div>
      </div>
      <div>
        <Button onClick={handleWithdrawButtonOnClick} variant="contained">
          회원 탈퇴
        </Button>
      </div>
    </div>
  );
}

export default MyPageWithdrawUserInfo;
