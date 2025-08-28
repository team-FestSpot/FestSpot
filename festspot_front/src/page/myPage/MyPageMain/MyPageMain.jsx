import React from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import usePrincipalQuery from "../../../querys/auth/usePrincipalQuery";
import MyPageSideBar from "../../../components/sideBar/MyPageSideBar/MyPageSideBar";

function MyPageMain({ children }) {
  return (
    <div css={s.myPageMainLayout}>
      <MyPageSideBar />
      {children}
    </div>
  );
}

export default MyPageMain;
