import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import Home from "../page/Home/Home";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import CommunityBoardRouter from "./CommunityBoardRouter";
import PostDetail from "../page/Auth/post/PostDetail/PostDetail";

function UserRouter(props) {
  return (
    <MainLayout>
      <Routes>
        <Route path="/auth/*" element={<AuthRouter />} />
        <Route path="/board/*" element={<CommunityBoardRouter />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </MainLayout>
  );
}

export default UserRouter;
