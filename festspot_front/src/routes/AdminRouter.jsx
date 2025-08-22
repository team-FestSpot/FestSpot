import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../page/admin/AdminLayout/AdminLayout";

function AdminRouter(props) {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
    </Routes>
  );
}

export default AdminRouter;
