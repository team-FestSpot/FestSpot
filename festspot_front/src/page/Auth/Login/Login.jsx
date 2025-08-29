/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import {
  JOIN_REGEX,
  JOIN_REGEX_ERROR_MESSAGE,
} from "../../../constants/authRegex";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import googleLogo from "/src/page/Auth/img/Google__G__logo.png";
import kakaoLogo from "/src/page/Auth/img/kakao_logo.png";
import naverLogo from "/src/page/Auth/img/naver_logo.png";
import festSpotLogo from "/src/page/Auth/img/FestSpotLogoImg.png";
import festSpotLogoText from "/src/page/Auth/img/FestSpotLogoText.png";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { reqLogin } from "../../../api/authApi";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

function Login(props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [inputValue, setInputValue] = useState({
    userLoginId: "",
    userPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    userLoginId: false,
    userPassword: false,
  });

  const [helpText, setHelpText] = useState({
    userLoginId: "",
    userPassword: "",
  });

  const [visible, setVisible] = useState({
    userPassword: false,
  });

  useEffect(() => {
    const isEmptyValue = !!Object.values(inputValue).filter(
      (value) => !value.trim()
    ).length;
    const isError = !!Object.values(errorMessage).filter((value) => !!value)
      .length;
    setButtonDisabled(isEmptyValue || isError);

    const errorEntries = Object.entries(errorMessage);
    errorEntries.forEach(([key, value]) => {
      setHelpText((prev) => ({
        ...prev,
        [key]: !value ? "" : JOIN_REGEX_ERROR_MESSAGE[key],
      }));
    });
  }, [errorMessage]);

  const hanleInputValueOnChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // 빈값 검사
    if (!JOIN_REGEX["notEmpty"].test(e.target.value)) {
      setErrorMessage((prev) => ({
        ...prev,
        [e.target.name]: false,
      }));
      return;
    }

    //valid 검사
    setErrorMessage((prev) => ({
      ...prev,
      [e.target.name]: !JOIN_REGEX[e.target.name].test(e.target.value),
    }));
  };

  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13 && e.target.name === "userPassword") {
      handleLoginOnClick();
    }
  };

  const handlePasswordVisibleOnClick = (key) => {
    setVisible((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLoginOnClick = async (e) => {
    try {
      const response = await reqLogin(inputValue);
      const { accessToken } = response?.data?.body;
      localStorage.setItem("AccessToken", `Bearer ${accessToken}`);

      await queryClient.invalidateQueries({
        queryKey: ["principal"],
      });

      await Swal.fire({
        title: "로그인 성공",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

      navigate("/");
    } catch (error) {
      let errorText = Object.values(error.response?.data?.body).join("<br>");
      console.log(error);

      await Swal.fire({
        title: "로그인 실패",
        html: `${errorText}`,
        icon: "error",
      });
    }
  };

  return (
    <div css={s.loginLayout}>
      <div css={s.loginContainer}>
        <header css={s.header}>
          <div css={s.logoIcon}>
            <img src={festSpotLogo} alt="FestSpot Logo" />
            <img src={festSpotLogoText} alt="FestSpot Logo" />
          </div>
        </header>
        <main css={s.main}>
          <div css={s.textField}>
            <TextField
              fullWidth={true}
              error={errorMessage.userLoginId}
              label="아이디를 입력하세요."
              variant="outlined"
              name="userLoginId"
              value={inputValue.userLoginId}
              onChange={hanleInputValueOnChange}
              css={s.textField}
            />
            {errorMessage.userLoginId && (
              <p css={s.textFieldHelp}>{helpText.userLoginId}</p>
            )}
          </div>
          <div css={s.textField}>
            <TextField
              fullWidth={true}
              error={errorMessage.userPassword}
              type={visible.userPassword ? `text` : `password`}
              label="비밀번호를 입력하세요."
              variant="outlined"
              name="userPassword"
              value={inputValue.userPassword}
              onKeyDown={handleOnKeyDown}
              onChange={hanleInputValueOnChange}
              css={s.textField}
            />
            <div
              css={s.visiblePassword}
              onClick={() => handlePasswordVisibleOnClick("userPassword")}
            >
              {visible.userPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
            </div>
            {errorMessage.userPassword && (
              <p css={s.textFieldHelp}>{helpText.userPassword}</p>
            )}
          </div>
          <div css={s.buttonContainer}>
            <Button
              fullWidth={true}
              disabled={buttonDisabled}
              variant="contained"
              css={s.signUpButton}
              onClick={handleLoginOnClick}
            >
              로그인
            </Button>
          </div>
          <div css={s.toLoginContainer}>
            <span>계정이 없으신가요?</span>
            <Link to={"/auth/signup"}>회원가입</Link>
          </div>
        </main>
        <div css={s.divider}>
          <div />
          <span>간편 로그인</span>
          <div />
        </div>
        <footer css={s.footer}>
          <div css={s.OAuth2Container}>
            <Link>
              <img src={googleLogo} />
            </Link>
            <Link>
              <img src={kakaoLogo} />
            </Link>
            <Link>
              <img src={naverLogo} />
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Login;
