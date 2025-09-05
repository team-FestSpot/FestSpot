import { useQuery } from "@tanstack/react-query";
import React from "react";
import { reqPostComments } from "../../api/postApi";

export const usePostCommentsQuery = (boardKey, postId) =>
  useQuery({
    queryKey: ["postComments", boardKey, postId],
    queryFn: async () => await reqPostComments(boardKey, postId),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
  });
