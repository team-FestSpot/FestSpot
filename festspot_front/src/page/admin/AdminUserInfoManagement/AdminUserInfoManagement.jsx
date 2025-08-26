import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import AdminUserInfoDataGrid from "../../../components/admin/AdminDataGrid/AdminUserInfoDataGrid/AdminUserInfoDataGrid";

function AdminUserInfoManagement(props) {
  return (
    <div css={s.layout}>
      <div css={s.mainLayout}>
        <AdminUserInfoDataGrid />
      </div>
    </div>
  );
}

export default AdminUserInfoManagement;
