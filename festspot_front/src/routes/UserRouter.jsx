import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import FestivalBoard from "../page/Auth/Board/FestivalBoard";
import PostWrite from "../page/Auth/post/PostWrite";
import Home from "../page/Home/Home";
import MainLayout from "../components/layout/MainLayout/MainLayout";

function UserRouter(props) {
  return (
    <MainLayout>
      <Routes>
        <Route path="/auth/*" element={<AuthRouter />} />
        <Route path="/board" element={<FestivalBoard />} />
        <Route path="/board/write" element={<PostWrite />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </MainLayout>
  );
}

export default UserRouter;
