import React from "react";
import AdminLeftSideBar from "../SideBar/AdminLeftSideBar";
import AdminMainPage from "../AdminMainPage/AdminMainPage";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { Route, Routes } from "react-router-dom";
import AdminAddPerformance from "../AdminAddPerformance/AdminAddPerformance";
import AdminConfigCustomPerformance from "../AdminConfigCustomPerformance/AdminConfigCustomPerformance";

function AdminLayout(props) {
  return (
    <>
      <div css={s.layout}>
        <div css={s.sideBar}>
          <AdminLeftSideBar />
        </div>
        <div css={s.mainContainer}>
          <Routes>
            <Route path="/dashboard" element={<AdminMainPage />} />
            <Route path="/detail" element={<AdminAddPerformance />} />
            <Route
              path="/performance"
              element={<AdminConfigCustomPerformance />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
