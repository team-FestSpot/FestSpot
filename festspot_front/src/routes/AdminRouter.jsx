import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminAddPerformance from "../page/admin/AdminAddPerformance/AdminAddPerformance";
import AdminLayout from "../components/layout/AdminLayout/AdminLayout";
import AdminModifyCustomPerformance from "../page/admin/AdminModifyCustomPerformance/AdminModifyCustomPerformance";
import AdminUserInfoManagement from "../page/admin/AdminUserInfoManagement/AdminUserInfoManagement";
import AdminMainPage from "../page/admin/AdminMainPage/AdminMainPage";
import AdminLoginPage from "../page/admin/AdminLoginPage/AdminLoginPage";

function AdminRouter(props) {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminLoginPage />} />
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/dashboard" element={<AdminMainPage />} />
        <Route path="/detail" element={<AdminAddPerformance />} />
        <Route path="/performance" element={<AdminModifyCustomPerformance />} />
        <Route path="/user" element={<AdminUserInfoManagement />} />
      </Routes>
    </AdminLayout>
  );
}

export default AdminRouter;
