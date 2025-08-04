/** @jsxImportSource @emotion/react */
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as s from "./styles";
import Swal from "sweetalert2";
import { css } from "@emotion/react";

function Login(props) {
  const [buttonDisable, setButtonDisabled] = useState(true);
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    setButtonDisabled(
      !!Object.values(inputValue).filter((value) => !value.trim()).length
    );
  }, [inputValue]);

  const handleOnChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginOnClick = async () => {
    // 로그인 로직 구현
    try {
      // 성공 시
    } catch (error) {
      // 실패 시
      await Swal.fire({
        icon: "error",
        title: response.data.body.errorMessage,
      });
    }
  };

  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13 && e.target.name === "password") {
      handleLoginOnClick();
    }
  };

  return (
    <div css={s.loginContainer}>
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
            onChange={handleOnChange}
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
            onChange={handleOnChange}
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
          onClick={handleLoginOnClick}
          css={s.loginButton}
        >
          로그인
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
          <span>아직 회원이 아니신가요?</span>
          <a href="">회원가입</a>
        </div>

        <div css={s.divider}>
          <span css={s.dividerText}>간편 로그인</span>
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
            SNS 계정으로 로그인하실 경우,
            <br />
            일부 서비스 이용에 제한이 있을 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
