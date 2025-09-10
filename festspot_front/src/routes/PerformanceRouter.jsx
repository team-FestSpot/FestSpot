import React from "react";
import { Route, Routes } from "react-router-dom";
import FeedDetail from "../page/Feed/FeedDetail/FeedDetail";
import PerformanceAll from "../page/performance/PerformanceAll/PerformanceAll";

function PerformanceRouter(props) {
  return (
    <Routes>
      <Route path="/feed" element={<FeedDetail />} />
      <Route path="/:category" element={<PerformanceAll />} />
    </Routes>
  );
}

export default PerformanceRouter;
