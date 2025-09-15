import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import AdminAddPerformance from "../page/admin/AdminAddPerformance/AdminAddPerformance";
import AdminLayout from "../components/layout/AdminLayout/AdminLayout";
import AdminModifyCustomPerformance from "../page/admin/AdminModifyCustomPerformance/AdminModifyCustomPerformance";
import AdminUserInfoManagement from "../page/admin/AdminUserInfoManagement/AdminUserInfoManagement";
import AdminMainPage from "../page/admin/AdminMainPage/AdminMainPage";
import AdminLoginPage from "../page/admin/AdminLoginPage/AdminLoginPage";
import usePrincipalQuery from "../querys/auth/usePrincipalQuery";
import AdminAddPerformance2 from "../page/admin/AdminAddPerformance2/AdminAddPerformance2";

function AdminRouter({ adminAuthority }) {
  const principalQuery = usePrincipalQuery();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      principalQuery.isFetched &&
      location.pathname.startsWith("/admin") &&
      (!adminAuthority || adminAuthority.length < 1)
    ) {
      navigate("/admin/login");
    }
  }, [principalQuery.isFetched]);

  return principalQuery.isFetched &&
    (!adminAuthority || adminAuthority?.length < 1) ? (
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
          <Route path="/detail" element={<AdminAddPerformance2 />} />
          <Route
            path="/performance"
            element={<AdminModifyCustomPerformance />}
          />
          <Route path="/user" element={<AdminUserInfoManagement />} />
          {/* <Route path="*" element={<Navigate to={`/admin/performance`} />} /> */}
        </Routes>
      </AdminLayout>
    </>
  );
  // );
}

export default AdminRouter;
