import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import Home from "../page/Home/Home";
import DashBoard from "../page/admin/DashBoard/DashBoard";
import AdminMainPage from "../page/admin/AdminMainPage/AdminMainPage";

function RooteRouter(props) {
  return (
    <MainLayout>
      <Routes>
        <Route path="/auth/*" element={<AuthRouter />} />
        <Route path="/dash" element={<DashBoard />} />
        <Route path="/admin" element={<AdminMainPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </MainLayout>
  );
}

export default RooteRouter;
