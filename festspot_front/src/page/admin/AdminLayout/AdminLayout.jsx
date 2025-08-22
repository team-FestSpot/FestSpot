import React from "react";
import AdminLeftSideBar from "../../sideBar/AdminLeftSideBar/AdminLeftSideBar";
import AdminMainPage from "../../../page/admin/AdminMainPage/AdminMainPage";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
<<<<<<< HEAD
import { Route, Routes } from "react-router-dom";
import AdminAddPerformance from "../AdminAddPerformance/AdminAddPerformance";
import AdminModifyCustomPerformance from "../AdminModifyCustomPerformance/AdminModifyCustomPerformance";

function AdminLayout(props) {
=======
import { useLocation } from "react-router-dom";
import AdminAddPerformance from "../../../page/admin/AdminAddPerformance/AdminAddPerformance";
import AdminConfigCustomPerformance from "../AdminConfigCustomPerformance/AdminConfigCustomPerformance";
import AdminTmp from "../AdminMainPage/tmp";

function AdminLayout({ children }) {
>>>>>>> 4247c0742c57f83d5b7e70897419122b69cfa3d4
  return (
    <>
      <div css={s.adminLayout}>
        <div css={s.adminSideBar}>
          <AdminLeftSideBar />
        </div>
<<<<<<< HEAD
        <div css={s.mainContainer}>
          <Routes>
            <Route path="/dashboard" element={<AdminMainPage />} />
            <Route path="/detail" element={<AdminAddPerformance />} />
            <Route
              path="/performance"
              element={<AdminModifyCustomPerformance />}
            />
          </Routes>
        </div>
=======
        <div css={s.adminContainer}>{children}</div>
>>>>>>> 4247c0742c57f83d5b7e70897419122b69cfa3d4
      </div>
    </>
  );
}

export default AdminLayout;
