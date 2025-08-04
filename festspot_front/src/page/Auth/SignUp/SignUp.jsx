/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as s from "./styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  JOIN_REGEX,
  JOIN_REGEX_ERROR_MESSAGE,
} from "../../../constants/authRegex";

function SignUp(props) {
  const [buttonDisable, setButtonDisabled] = useState(true);
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    email: "",
  });

  const [error, setError] = useState({
    username: false,
    password: false,
    passwordCheck: false,
    nickname: false,
    email: false,
  });

  const [helpText, setHelpText] = useState({
    username: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    email: "",
  });

  useEffect(() => {
    const isEmptyValue = !!Object.values(inputValue).filter(
      (value) => !value.trim()
    ).length;
    const isError = !!Object.values(error).filter((value) => !!value).length;
    setButtonDisabled(isEmptyValue || isError);

    const errorEntries = Object.entries(error);
    errorEntries.forEach(([key, value]) => {
      setHelpText((prev) => ({
        ...prev,
        [key]: !value ? "" : JOIN_REGEX_ERROR_MESSAGE[key],
      }));
    });
  }, [error]);

  const hanleInputValueOnChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (!JOIN_REGEX["notEmpty"].test(e.target.value)) {
      setError((prev) => ({
        ...prev,
        [e.target.name]: false,
      }));
      return;
    }

    if (e.target.name === "passwordCheck") {
      setError((prev) => ({
        ...prev,
        [e.target.name]: e.target.value !== inputValue.password,
      }));
      return;
    }

    setError((prev) => ({
      ...prev,
      [e.target.name]: !JOIN_REGEX[e.target.name].test(e.target.value),
    }));
  };

  const handleSignUpOnClick = async () => {
    // 회원가입 로직 구현
    const reqData = {
      username: inputValue.username,
      password: inputValue.password,
      nickname: inputValue.nickname,
      email: inputValue.email,
    };
    try {
      // navigate("/");
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: response.data.body.errorMessage,
      });
    }
  };

  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13 && e.target.name === "email") {
      handleSignUpOnClick();
    }
  };

  return (
    <div css={s.signUpContainer}>
      <div css={s.logoContainer}>
        <div css={s.logoIcon}>
          <img src="src\page\Auth\img\FestSpot_logo.png" alt="FestSpot Logo" />
        </div>
      </div>

      <div css={s.inputSection}>
        <div css={s.textFieldContainer}>
          <TextField
            fullWidth={true}
            label="아이디를 입력하세요."
            variant="outlined"
            name="username"
            value={inputValue.username}
            onChange={hanleInputValueOnChange}
            css={s.textField}
          />
        </div>
        <div css={s.textFieldContainer}>
          <TextField
            fullWidth={true}
            type="password"
            label="비밀번호를 입력하세요."
            variant="outlined"
            name="password"
            value={inputValue.password}
            onChange={hanleInputValueOnChange}
            css={s.textField}
          />
        </div>
        <div css={s.textFieldContainer}>
          <TextField
            fullWidth={true}
            type="password"
            label="비밀번호를 다시 입력하세요."
            variant="outlined"
            name="passwordCheck"
            value={inputValue.passwordCheck}
            onChange={hanleInputValueOnChange}
            css={s.textField}
          />
        </div>
        <div css={s.textFieldContainer}>
          <TextField
            fullWidth={true}
            label="이름을 입력하세요."
            variant="outlined"
            name="nickname"
            value={inputValue.nickname}
            onChange={hanleInputValueOnChange}
            css={s.textField}
          />
        </div>
        <div css={s.textFieldContainer}>
          <TextField
            fullWidth={true}
            type="email"
            label="이메일을 입력하세요."
            variant="outlined"
            name="email"
            value={inputValue.email}
            onChange={hanleInputValueOnChange}
            onKeyDown={handleOnKeyDown}
            css={s.textField}
          />
        </div>
      </div>

      <div css={s.submitButtonContainer}>
        <Button
          fullWidth={true}
          disabled={buttonDisable}
          variant="contained"
          onClick={handleSignUpOnClick}
          css={s.signUpButton}
        >
          회원가입
        </Button>

        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 0.8rem;
            font-size: 0.9rem;
            color: #999;
          `}
        >
          <span>계정이 있으신가요?</span>
          <a href="">로그인</a>
        </div>

        <div css={s.divider}>
          <span css={s.dividerText}>간편 회원가입</span>
        </div>

        <div css={s.socialButtonContainer}>
          <div css={s.socialButton}>
            <img src="src\page\Auth\img\naver_logo.png" alt="naver logo" />
          </div>
          <div css={s.socialButton}>
            <img
              src="src\page\Auth\img\Google__G__logo.png"
              alt="google logo"
            />
          </div>
          <div css={s.socialButton}>
            <img src="src\page\Auth\img\kakao_logo.png" alt="google logo" />
          </div>
        </div>

        <div css={s.socialLoginInfo}>
          <p css={s.socialLoginText}>
            SNS 계정으로 가입하실 경우,
            <br />
            일부 서비스 이용에 제한이 있을 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
