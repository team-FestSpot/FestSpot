import React from "react";
import { reqDeletePerformanceApi } from "../../api/adminApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAdminCustomPerformanceRowsStore from "../../stores/AdminPerformanceCustomRowsStore";
import { useApiPerformanceListQuery } from "../admin/useApiPerformanceListQuery";

export const useDeleteApiPerformanceMutation = () => {
  const { setRows, setRowsEmpty } = useAdminCustomPerformanceRowsStore();
  const { refetch } = useApiPerformanceListQuery();

  return useMutation({
    mutationFn: (performanceId) => reqDeletePerformanceApi(performanceId),
    onSuccess: async () => {
      setRowsEmpty();
      const result = await refetch();
      setRows([...result?.data?.data?.body]);
    },
    onError: (error) => {
      console.error("삭제 실패:", error);
    },
  });
};
