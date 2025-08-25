import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import AdminCustomPerformanceDataGrid from "../../../components/admin/AdminDataGrid/AdminCustomPerformanceDataGrid";
import { useSearchParams } from "react-router-dom";

function AdminModifyCustomPerformance(props) {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({
      page: 1,
    });
  }, []);

  return (
    <div css={s.layout}>
      <div css={s.mainLayout}>
        <AdminCustomPerformanceDataGrid />
      </div>
    </div>
  );
}

export default AdminModifyCustomPerformance;
