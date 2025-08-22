/** @jsxImportSource @emotion/react */
import TextField from "@mui/material/TextField";
import * as s from "./styles";
import React, { useEffect, useState } from "react";
import {
  JOIN_REGEX,
  JOIN_REGEX_ERROR_MESSAGE,
} from "../../../constants/authRegex";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import googleLogo from "/src/page/Auth/img/Google__G__logo.png";
import kakaoLogo from "/src/page/Auth/img/kakao_logo.png";
import naverLogo from "/src/page/Auth/img/naver_logo.png";
import festSpotLogo from "/src/page/Auth/img/FestSpotLogoImg.png";
import festSpotLogoText from "/src/page/Auth/img/FestSpotLogoText.png";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { reqSignup } from "../../../api/authApi";
import Swal from "sweetalert2";
import { Global } from "@emotion/react";

function SignUp(props) {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [inputValue, setInputValue] = useState({
    userLoginId: "",
    userPassword: "",
    passwordCheck: "",
    userNickName: "",
    userEmail: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    userLoginId: false,
    userPassword: false,
    passwordCheck: false,
    userNickName: false,
    userEmail: false,
  });

  const [helpText, setHelpText] = useState({
    userLoginId: "",
    userPassword: "",
    passwordCheck: "",
    userNickName: "",
    userEmail: "",
  });

  const [visible, setVisible] = useState({
    userPassword: false,
    passwordCheck: false,
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

    // 비밀번호 확인 검사
    if (e.target.name === "passwordCheck") {
      setErrorMessage((prev) => ({
        ...prev,
        [e.target.name]: e.target.value !== inputValue.userPassword,
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
    if (e.keyCode === 13 && e.target.name === "email") {
      handleSignUpOnClick();
    }
  };

  const handlePasswordVisibleOnClick = (key) => {
    setVisible((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSignupOnClick = async (e) => {
    try {
      const response = await reqSignup(inputValue);
      const user = response.data?.body;

      await Swal.fire({
        title: "회원가입 성공",
        text: `${user.userNickName}님 환영합니다.`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    } catch (error) {
      let errorText = Object.values(error.response?.data?.body).join("<br>");

      await Swal.fire({
        title: "회원가입 실패",
        html: `${errorText}`,
        icon: "error",
      });
    }
  };

  return (
    <>
      <Global styles={s.sweetAlert} />
      <div css={s.signUpLayout}>
        <div css={s.signUpContainer}>
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
            <div css={s.textField}>
              <TextField
                fullWidth={true}
                error={errorMessage.passwordCheck}
                type={visible.passwordCheck ? `text` : `password`}
                label="비밀번호를 다시 입력하세요."
                variant="outlined"
                name="passwordCheck"
                value={inputValue.passwordCheck}
                onChange={hanleInputValueOnChange}
                css={s.textField}
              />
              <div
                css={s.visiblePassword}
                onClick={() => handlePasswordVisibleOnClick("passwordCheck")}
              >
                {visible.passwordCheck ? <IoEyeSharp /> : <IoEyeOffSharp />}
              </div>
              {errorMessage.passwordCheck && (
                <p css={s.textFieldHelp}>{helpText.passwordCheck}</p>
              )}
            </div>
            <div css={s.textField}>
              <TextField
                fullWidth={true}
                error={errorMessage.userNickName}
                label="이름을 입력하세요."
                variant="outlined"
                name="userNickName"
                value={inputValue.userNickName}
                onChange={hanleInputValueOnChange}
                css={s.textField}
              />
              {errorMessage.userNickName && (
                <p css={s.textFieldHelp}>{helpText.userNickName}</p>
              )}
            </div>
            <div css={s.textField}>
              <TextField
                fullWidth={true}
                error={errorMessage.userEmail}
                type="email"
                label="이메일을 입력하세요."
                variant="outlined"
                name="userEmail"
                value={inputValue.userEmail}
                onChange={hanleInputValueOnChange}
                onKeyDown={handleOnKeyDown}
                css={s.textField}
              />
              {errorMessage.userEmail && (
                <p css={s.textFieldHelp}>{helpText.userEmail}</p>
              )}
            </div>
            <div css={s.buttonContainer}>
              <Button
                fullWidth={true}
                disabled={buttonDisabled}
                variant="contained"
                css={s.signUpButton}
                onClick={handleSignupOnClick}
              >
                회원가입
              </Button>
            </div>
            <div css={s.toLoginContainer}>
              <span>계정이 있으신가요?</span>
              <Link to={"/auth/login"}>로그인</Link>
            </div>
          </main>
          <div css={s.divider}>
            <div />
            <span>간편 회원가입</span>
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
    </>
  );
}

export default SignUp;
