/** @jsxImportSource @emotion/react */
import PostSideBar from "../../../SideBar/PostSideBar/PostSideBar";
import UpperSideBar from "../../../SideBar/UpperSideBar/UpperSideBar";
import * as s from "./styles";
import React from "react";

function MainLayout({ children }) {
  return (
    <div css={s.layout}>
      <UpperSideBar />
      <div css={s.container}>
        <div css={s.children}>{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
