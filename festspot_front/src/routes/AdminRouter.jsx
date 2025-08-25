import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminTmp from "../page/admin/AdminMainPage/AdminTmp";
import AdminAddPerformance from "../page/admin/AdminAddPerformance/AdminAddPerformance";
import AdminLayout from "../components/layout/AdminLayout/AdminLayout";
import AdminModifyCustomPerformance from "../page/admin/AdminModifyCustomPerformance/AdminModifyCustomPerformance";
import AdminUserInfoManagement from "../page/admin/AdminUserInfoManagement/AdminUserInfoManagement";

function AdminRouter(props) {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/dashboard" element={<AdminTmp />} />
        <Route path="/detail" element={<AdminAddPerformance />} />
        <Route path="/performance" element={<AdminModifyCustomPerformance />} />
        <Route path="/user" element={<AdminUserInfoManagement />} />
      </Routes>
    </AdminLayout>
  );
}

export default AdminRouter;
