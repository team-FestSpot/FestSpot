import React from "react";
import { reqDeletePerformanceApi } from "../../api/adminApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCustomPerformanceListQuery } from "../admin/useCustomPerformanceListQuery";
import useAdminCustomPerformanceRowsStore from "../../stores/AdminPerformanceCustomRowsStore";

export const useDeletePerformanceMutation = () => {
  const { setRows, setRowsEmpty } = useAdminCustomPerformanceRowsStore();
  const { refetch } = useCustomPerformanceListQuery();

  return useMutation({
    mutationFn: (performanceId) => reqDeletePerformanceApi(performanceId),
    onSuccess: async () => {
      const result = await refetch();
      setRowsEmpty();
      setRows([...result?.data?.data?.body]);
    },
    onError: (error) => {
      console.error("삭제 실패:", error);
    },
  });
};
