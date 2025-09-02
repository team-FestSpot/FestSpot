import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { reqPerformanceCommentRegister } from "../../api/performanceApi";

export const usePerformanceCommentRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["performanceCommentSubmit"],
    mutationFn: async (data) => await reqPerformanceCommentRegister(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["performanceCommentList"] }),
  });
};
