import React from "react";
import { Route, Routes } from "react-router-dom";
import PostWrite from "../page/Auth/post/PostWrite";
import FestivalBoard from "../page/Auth/Post/Board/FestivalBoard";

function CommunityBoardRouter(props) {
  return (
    <Routes>
      <Route path="/write" element={<PostWrite />} />
      <Route path="/*" element={<FestivalBoard />} />
    </Routes>
  );
}

export default CommunityBoardRouter;
