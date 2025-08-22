import React from "react";
import { Route, Routes } from "react-router-dom";
import FestivalBoard from "../page/Auth/Board/FestivalBoard";
import PostWrite from "../page/Auth/post/PostWrite";

function CommunityBoardRouter(props) {
  return (
    <Routes>
      <Route path="/write" element={<PostWrite />} />
      <Route path="/*" element={<FestivalBoard />} />
    </Routes>
  );
}

export default CommunityBoardRouter;
