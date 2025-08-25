import React from "react";
import { reqDeletePerformanceApi } from "../../api/adminApi";
import { useMutation } from "@tanstack/react-query";

export const useDeletePerformanceMutation = () =>
  useMutation({
    mutationFn: async (performanceId) =>
      await reqDeletePerformanceApi(performanceId),
  });
