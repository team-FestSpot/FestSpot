import React from "react";
import AdminLeftSideBar from "../../sideBar/AdminLeftSideBar/AdminLeftSideBar";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
function AdminLayout({ children }) {
  return (
    <div css={s.adminLayout}>
      <div css={s.adminSideBar}>
        <AdminLeftSideBar />
      </div>
      <div css={s.adminChildrenContainer}>{children}</div>
    </div>
  );
}

export default AdminLayout;
