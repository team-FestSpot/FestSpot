import { useQuery } from "@tanstack/react-query";
import React from "react";
import { reqPostComments } from "../../api/postCommentApi";

export const usePostCommentsQuery = (postId) =>
  useQuery({
    queryKey: ["postComments", postId],
    queryFn: async () => await reqPostComments(postId),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
  });
