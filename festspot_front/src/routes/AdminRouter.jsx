import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminAddPerformance from "../page/admin/AdminAddPerformance/AdminAddPerformance";
import AdminLayout from "../components/layout/AdminLayout/AdminLayout";
import AdminModifyCustomPerformance from "../page/admin/AdminModifyCustomPerformance/AdminModifyCustomPerformance";
import AdminUserInfoManagement from "../page/admin/AdminUserInfoManagement/AdminUserInfoManagement";
import AdminMainPage from "../page/admin/AdminMainPage/AdminMainPage";

function AdminRouter(props) {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/dashboard" element={<AdminMainPage />} />
        <Route path="/detail" element={<AdminAddPerformance />} />
        <Route path="/performance" element={<AdminModifyCustomPerformance />} />
        <Route path="/user" element={<AdminUserInfoManagement />} />
      </Routes>
    </AdminLayout>
  );
}

export default AdminRouter;
