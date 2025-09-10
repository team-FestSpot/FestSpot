import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRouter from "./UserRouter";
import AdminRouter from "./AdminRouter";
import usePrincipalQuery from "../querys/auth/usePrincipalQuery";

function RooteRouter() {
  /* principal에서 role 가져온 다음 라우터 분리 해야 함 */
  const principalQuery = usePrincipalQuery();
  const adminAuthority = principalQuery?.data?.data?.body?.authorities.filter(
    (authority) => authority.authority === "ROLE_ADMIN"
  );

  return (
    <Routes>
      <Route path="/*" element={<UserRouter />} />
      <Route
        path="/admin/*"
        element={<AdminRouter adminAuthority={adminAuthority} />}
      />
    </Routes>
  );
}

export default RooteRouter;
