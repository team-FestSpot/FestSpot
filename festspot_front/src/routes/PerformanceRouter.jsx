import React from "react";
import { Route, Routes } from "react-router-dom";
import PerformanceMain from "../page/performance/PerformanceMain/PerformanceMain";
import Feed from "../page/Feed/Feed";

function PerformanceRouter() {
  return (
    <PerformanceMain>
      <Routes>
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </PerformanceMain>
  );
}

export default PerformanceRouter;
