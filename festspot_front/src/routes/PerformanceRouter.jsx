import React from "react";
import { Route, Routes } from "react-router-dom";
import FeedDetail from "../page/Feed/FeedDetail/FeedDetail";

function PerformanceRouter(props) {
  return (
    <Routes>
      <Route path="/feed" element={<FeedDetail />} />
    </Routes>
  );
}

export default PerformanceRouter;
