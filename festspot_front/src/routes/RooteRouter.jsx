import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import Home from "../page/Home/Home";
import DashBoard from "../page/admin/DashBoard/DashBoard";
import FestivalBoard from "../page/Auth/Board/FestivalBoard";
import PostWrite from "../page/Auth/post/PostWrite";
import PostDetail from "../page/Auth/PostDetail/PostDetail";

function RooteRouter(props) {
  return (
    <MainLayout>
      <Routes>
        <Route path="/auth/*" element={<AuthRouter />} />
        <Route path="/board" element={<FestivalBoard />} />
        <Route path="/board/write" element={<PostWrite />} />
        <Route path="/board/post/:postId" element={<PostDetail />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </MainLayout>
  );
}

export default RooteRouter;
