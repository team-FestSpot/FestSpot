import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminTmp from "../page/admin/AdminMainPage/AdminTmp";
import AdminAddPerformance from "../page/admin/AdminAddPerformance/AdminAddPerformance";
import AdminLayout from "../components/layout/AdminLayout/AdminLayout";
import AdminCustomPerformanceDataGrid from "../components/admin/AdminDataGrid/AdminCustomPerformanceDataGrid";

function AdminRouter(props) {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/dashboard" element={<AdminTmp />} />
        <Route path="/detail" element={<AdminAddPerformance />} />
        <Route
          path="/performance"
          element={<AdminCustomPerformanceDataGrid />}
        />
      </Routes>
    </AdminLayout>
  );
}

export default AdminRouter;
