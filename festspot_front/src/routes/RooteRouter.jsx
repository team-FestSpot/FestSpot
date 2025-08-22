import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRouter from "./UserRouter";
import AdminRouter from "./AdminRouter";

function RooteRouter(props) {
  /* principal에서 role 가져온 다음 라우터 분리 해야 함 */

  
  return (
    <Routes>
      <Route path="/*" element={<UserRouter />} />
      <Route path="/admin/*" element={<AdminRouter />} />
    </Routes>
  );
}

export default RooteRouter;
