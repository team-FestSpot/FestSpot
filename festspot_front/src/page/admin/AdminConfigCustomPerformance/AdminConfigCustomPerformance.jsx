import React, { useEffect, useState } from "react";
import AdminCustomPerformanceDataGrid from "../AdminDataGrid/AdminCustomPerformanceDataGrid";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import useAdminCustomPerformanceRowsStore from "../../../stores/AdminPerformanceCustomRowsStore";
import useAdminPerformanceUpdateStore from "../../../stores/AdminPerformanceUpdateStore";

function AdminConfigCustomPerformance(props) {
  const { rows, setRows, setRowsEmpty } = useAdminCustomPerformanceRowsStore();
  const { performanceToUpdate, setPerformanceToUpdate } =
    useAdminPerformanceUpdateStore();

  return (
    <div css={s.layout}>
      <div css={s.mainLayout}>
        <AdminCustomPerformanceDataGrid />
      </div>
    </div>
  );
}

export default AdminConfigCustomPerformance;
