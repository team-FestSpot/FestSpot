import React from "react";
import AdminLeftSideBar from "../../sideBar/AdminLeftSideBar/AdminLeftSideBar";
import AdminMainPage from "../../../page/admin/AdminMainPage/AdminMainPage";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useLocation } from "react-router-dom";
import AdminAddPerformance from "../../../page/admin/AdminAddPerformance/AdminAddPerformance";
import AdminConfigCustomPerformance from "../AdminConfigCustomPerformance/AdminConfigCustomPerformance";
import AdminTmp from "../AdminMainPage/tmp";

function AdminLayout({ children }) {
  return (
    <>
      <div css={s.adminLayout}>
        <div css={s.adminSideBar}>
          <AdminLeftSideBar />
        </div>
        <div css={s.adminContainer}>{children}</div>
      </div>
    </>
  );
}

export default AdminLayout;
