import React, { useEffect, useState } from "react";
import AdminCustomPerformanceDataGrid from "../AdminDataGrid/AdminCustomPerformanceDataGrid";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";

function AdminConfigCustomPerformance(props) {
  return (
    <div css={s.layout}>
      <div css={s.mainLayout}>
        <AdminCustomPerformanceDataGrid />
      </div>
    </div>
  );
}

export default AdminConfigCustomPerformance;
