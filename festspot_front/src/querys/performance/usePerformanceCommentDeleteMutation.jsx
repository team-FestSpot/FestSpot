import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { reqPerformanceCommentDelete } from "../../api/performanceApi";

export const usePerformanceCommentDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["performanceCommentDelete"],
    mutationFn: async (performanceCommentId) => {
      await reqPerformanceCommentDelete(performanceCommentId);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["performanceCommentList"] }),
  });
};
