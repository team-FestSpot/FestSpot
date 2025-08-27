import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import AdminAddPerformance from "../page/admin/AdminAddPerformance/AdminAddPerformance";
import AdminLayout from "../components/layout/AdminLayout/AdminLayout";
import AdminModifyCustomPerformance from "../page/admin/AdminModifyCustomPerformance/AdminModifyCustomPerformance";
import AdminUserInfoManagement from "../page/admin/AdminUserInfoManagement/AdminUserInfoManagement";
import AdminMainPage from "../page/admin/AdminMainPage/AdminMainPage";
import AdminLoginPage from "../page/admin/AdminLoginPage/AdminLoginPage";
import usePrincipalQuery from "../querys/auth/usePrincipalQuery";

function AdminRouter({ adminAuthority }) {
  const principalQuery = usePrincipalQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      location.pathname.startsWith("/admin") &&
      (!adminAuthority || adminAuthority.length < 1)
    ) {
      navigate("/admin/login");
    }
  }, [principalQuery.isFetched]);

  return !adminAuthority || adminAuthority.length < 1 ? (
    <div>
      <Routes>
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="*" element={<Navigate to={"/admin/login"} />} />
      </Routes>
    </div>
  ) : (
    <>
      <AdminLayout>
        <Routes>
          <Route path="/dashboard" element={<AdminMainPage />} />
          <Route path="/detail" element={<AdminAddPerformance />} />
          <Route
            path="/performance"
            element={<AdminModifyCustomPerformance />}
          />
          <Route path="/user" element={<AdminUserInfoManagement />} />
          <Route path="*" element={<Navigate to={"/admin/dashboard"} />} />
        </Routes>
      </AdminLayout>
    </>
  );
  // );
}

export default AdminRouter;
