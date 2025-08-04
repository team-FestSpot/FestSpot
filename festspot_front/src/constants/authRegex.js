export const JOIN_REGEX = {
    username: /^(?=.*[a-z])(?=.*\d).{4,20}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,20}$/,
    nickname: /^[가-힣]{2,20}$/,
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    notEmpty: /^.+$/,
}

export const JOIN_REGEX_ERROR_MESSAGE = {
    username: "아이디는 영문, 숫자를 포함 4~20자여야 합니다.",
    password: "비밀번호는 8~20자이며, 영문·숫자·특수문자를 모두 포함해야 합니다.",
    passwordCheck: "비밀번호가 서로 일치하지 않습니다.",
    nickname: "이름은 한글 2~20자여야 합니다.",
    email: "유효하지 않은 이메일 형식입니다.",
}