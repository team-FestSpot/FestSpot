import React, { useEffect } from "react";
import { reqGetCustomPerformanceListApi } from "../../../api/adminApi";

function AdminConfigCustomPerformance(props) {
  useEffect(() => {
    reqGetCustomPerformanceListApi();
  }, []);

  return <div></div>;
}

export default AdminConfigCustomPerformance;
