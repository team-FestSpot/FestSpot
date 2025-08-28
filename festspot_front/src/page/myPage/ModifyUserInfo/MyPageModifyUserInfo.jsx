import React, { useEffect, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import usePrincipalQuery from "../../../querys/auth/usePrincipalQuery";
import TextField from "@mui/material/TextField";
import { USER_PROFILE_IMG_PATH } from "../../../constants/userProfileImgPath";
import Button from "@mui/material/Button";
import {
  MODIFY_REGEX,
  MODIFY_REGEX_ERROR_MESSAGE,
} from "../../../constants/userInfoModifyRegex";
import {
  reqModifyUserInfo,
  reqModifyUserProfileImg,
} from "../../../api/myPageApi";
import Swal from "sweetalert2";

function MyPageModifyUserInfo(props) {
  const principalQuery = usePrincipalQuery();
  const userInfo = principalQuery.data?.data?.body.user;
  const imageInputRef = useRef();
  const [profileImg, setProfileImg] = useState({});
  const [profileImgUrl, setProfileImgUrl] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [inputValues, setInputValues] = useState({
    userNickName: "",
    userCurrentPassword: "",
    userNewPassword: "",
    userNewPasswordCheck: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    userNickName: false,
    userCurrentPassword: false,
    userNewPassword: false,
    userNewPasswordCheck: false,
  });
  const [helpText, setHelpText] = useState({
    userNickName: "",
    userCurrentPassword: "",
    userNewPassword: "",
    userNewPasswordCheck: "",
  });

  // 입력창 매개변수 목록
  const columns = [
    {
      name: "userNickName",
      type: "text",
      placeholder: "닉네임",
    },
    {
      name: "userCurrentPassword",
      type: "password",
      placeholder: "현재 비밀번호",
    },
    {
      name: "userNewPassword",
      type: "password",
      placeholder: "새 비밀번호",
    },
    {
      name: "userNewPasswordCheck",
      type: "password",
      placeholder: "새 비밀번호 확인",
    },
  ];

  // 이미지 업로드 버튼 클릭하면 input file 누르게 함
  const handleImageInputButtonOnClick = () => {
    imageInputRef.current?.click();
  };

  // 이미지 업로드하면 profileImg state에 저장되고 이미지 url은 profileImgUrl state에 저장해서 화면에도 표시됨
  const handleImageInputOnChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setProfileImgUrl(e.target.result);
    };
    fileReader.readAsDataURL(file);
    setProfileImg(...e.target.files);
  };

  // 이미지 수정 버튼 눌러서 이미지 수정 요청
  const handleImageSubmitButtonOnClick = async () => {
    let formData = new FormData();
    formData.append("file", profileImg);
    const response = await reqModifyUserProfileImg(formData);
    if (response?.data?.code === 200) {
      Swal.fire({
        icon: "success",
        title: response.data.body,
        timer: 1500,
      });
      setProfileImg({});
    } else {
      Swal.fire({
        icon: "error",
        title: response.data.body,
        timer: 1500,
      });
    }
  };

  // 사용자 정보 (닉네임, 비밀번호) 입력하면 inputValues state에 담고 유효성 검사여부에 따라 입력창 밑에 오류메시지 띄움
  const handleUserInfoInputOnChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 비밀번호 확인 검사
    if (name === "userNewPasswordCheck") {
      setErrorMessage((prev) => ({
        ...prev,
        [name]: value !== inputValues.userNewPassword,
      }));
      return;
    }

    // 비밀번호 확인을 제외한 나머지 valid 검사
    if (name !== "userNewPasswordCheck" && name.includes("Password")) {
      setErrorMessage((prev) => ({
        ...prev,
        [name]: !MODIFY_REGEX[name].test(value),
      }));
    }

    if (name === "userNickName") {
      if (value !== userInfo?.userNickName) {
        setErrorMessage((prev) => ({
          ...prev,
          [name]: !MODIFY_REGEX[name].test(value),
        }));
      }
    }
  };

  // 입력값이 정규식 조건에 안 맞으면(helpText true면) 오류메시지(errorMessage에 저장된 값) 뜨게 함.
  // useEffect(() => {
  // const isEmptyValue = !!Object.values(inputValues).filter(
  //   (value) => !value.trim()
  // ).length;
  //   const isError = !!Object.values(errorMessage).filter((value) => !!value)
  //     .length;
  //   setButtonDisabled(isError);

  //   const errorEntries = Object.entries(errorMessage);
  //   errorEntries.forEach(([key, value]) => {
  //     setHelpText((prev) => ({
  //       ...prev,
  //       [key]: !value ? "" : MODIFY_REGEX_ERROR_MESSAGE[key],
  //     }));
  //   });
  // }, [errorMessage]);

  useEffect(() => {
    const { userCurrentPassword, userNewPassword, userNewPasswordCheck } =
      inputValues;
    const {
      userCurrentPassword: errCur,
      userNewPassword: errNew,
      userNewPasswordCheck: errCheck,
    } = errorMessage;

    // 현재 비밀번호, 새 비밀번호, 비밀번호 확인이 전부 빈 값인지 확인
    const allEmpty = [
      userCurrentPassword,
      userNewPassword,
      userNewPasswordCheck,
    ].every((v) => v === "");

    // 현재 비밀번호, 새 비밀번호, 비밀번호 확인이 전부 채워졌는지 확인
    const allFilled = [
      userCurrentPassword,
      userNewPassword,
      userNewPasswordCheck,
    ].every((v) => v !== "");

    // 현재 비밀번호, 새 비밀번호, 비밀번호 확인이 전부 유효성 검사를 통과했는지 확인
    const noErrors = [errCur, errNew, errCheck].every((v) => v === false);

    // 현재 비밀번호, 새 비밀번호, 비밀번호 확인이 전부 빈 값이거나, 전부 채워졌으면서 셋 다 유효성 검사를 통과했으면 버튼 활성화
    if (allEmpty || (allFilled && noErrors)) {
      setButtonDisabled(false); // 활성화
    } else {
      setButtonDisabled(true); // 비활성화
    }
  }, [inputValues, errorMessage]);

  // 수정 버튼은 입력창이 비어있지 않고 모든 유효성 검사를 통과해야 활성화됨
  // 이미지 제외한 나머지 (닉네임 또는 비밀번호 또는 둘다) 수정 요청
  const handleModifyButtonOnClick = async () => {
    let inputData = { ...inputValues };
    inputData.userId = userInfo?.userId;
    const response = await reqModifyUserInfo(inputData);
    console.log(response);
  };

  // 정보 수정 화면 처음 들어오거나 새로고침했을 때 닉네임 입력창에 principal에서 기존 닉네임 꺼내서 기본값으로 들어가게 함
  useEffect(() => {
    if (principalQuery.isSuccess) {
      setInputValues((prev) => ({
        ...prev,
        userNickName: userInfo?.userNickName,
      }));
    }
  }, [principalQuery.isFetched]);

  return (
    <div css={s.contentsLayout}>
      <div css={s.profileImgContainer}>
        {profileImgUrl.length < 1 ? (
          <img
            src={`${USER_PROFILE_IMG_PATH}${userInfo?.userProfileImgUrl}`}
            alt=""
          />
        ) : (
          <img src={`${profileImgUrl}`} alt="" />
        )}
        <div css={s.profileImageInputContainer}>
          <Button variant="contained" onClick={handleImageInputButtonOnClick}>
            이미지 업로드
          </Button>
          <input
            // input의 ref 속성을 이용해 버튼 클릭 이벤트를 input과 연결
            ref={imageInputRef}
            type="file"
            name="file"
            onChange={handleImageInputOnChange}
          />
          {profileImg.size > 0 && (
            <Button
              variant="contained"
              onClick={handleImageSubmitButtonOnClick}
            >
              이미지 변경
            </Button>
          )}
        </div>
      </div>
      <div css={s.inputsContainer}>
        {columns.map((column) => (
          <div css={s.inputContainer}>
            <div css={s.inputPlaceholderContainer}>
              <h4>{column.placeholder}</h4>
            </div>
            <div css={s.textFieldContainer}>
              <TextField
                name={column.name}
                type={column.type}
                defaultValue={
                  column.type === "password" ? "" : userInfo?.userNickName
                }
                placeholder={column.placeholder}
                sx={{ width: "100%" }}
                error={errorMessage.name}
                onChange={handleUserInfoInputOnChange}
              />
              {errorMessage[column.name] && (
                <p css={s.textFieldHelp}>{helpText[column.name]}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
        <Button
          onClick={handleModifyButtonOnClick}
          disabled={buttonDisabled}
          variant="contained"
        >
          수정
        </Button>
      </div>
    </div>
  );
}

export default MyPageModifyUserInfo;
