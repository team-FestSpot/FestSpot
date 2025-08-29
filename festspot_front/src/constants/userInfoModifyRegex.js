export const MODIFY_REGEX = {
  userNickName: /^(?=.*[가-힣A-Za-z])[가-힣A-Za-z0-9-_]{2,20}$/,
  userCurrentPassword:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,20}$/,
  userNewPassword:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,20}$/,
  notEmpty: /^.+$/,
};

export const MODIFY_REGEX_ERROR_MESSAGE = {
  userNickName: "닉네임은 2~20자여야 합니다.",
  userCurrentPassword:
    "비밀번호는 8~20자이며, 영문·숫자·특수문자를 포함해야 합니다.",
  userNewPassword:
    "비밀번호는 8~20자이며, 영문·숫자·특수문자를 포함해야 합니다.",
  userNewPasswordCheck: "비밀번호가 서로 일치하지 않습니다.",
};
