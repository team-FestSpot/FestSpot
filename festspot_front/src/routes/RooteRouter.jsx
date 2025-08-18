import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import Home from "../page/Home/Home";
import FestivalBoard from "../page/Auth/Board/FestivalBoard";
import AdminMainPage from "../page/admin/AdminMainPage/AdminMainPage";

function RooteRouter(props) {
  return (
    <MainLayout>
      <Routes>
        <Route path="/auth/*" element={<AuthRouter />} />
        <Route path="/board" element={<FestivalBoard />} />
        <Route path="/admin" element={<AdminMainPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </MainLayout>
  );
}

export default RooteRouter;
