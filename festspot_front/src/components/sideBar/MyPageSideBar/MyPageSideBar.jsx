import React from "react";
import { Link } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";

function MyPageSideBar(props) {
  return (
    <div css={s.menusContainer}>
      <ul>
        <li>
          <Link to={"/mypage/"}>마이페이지 메인</Link>
        </li>
        <li>
          <Link to={"/mypage/info"}>정보 수정</Link>
        </li>
        <li>회원 탈퇴</li>
      </ul>
    </div>
  );
}

export default MyPageSideBar;
