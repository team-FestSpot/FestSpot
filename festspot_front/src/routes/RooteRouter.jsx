import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "../admin/page/DashBoard/DashBoard";
import AuthRouter from "./AuthRouter";
import MainLayout from "../components/layout/MainLayout/MainLayout";

function RooteRouter(props) {
  return (
    <MainLayout>
      <Routes>
        <Route path="/auth/*" element={<AuthRouter />} />
        <Route path="/dash" element={<DashBoard />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </MainLayout>
  );
}

export default RooteRouter;
