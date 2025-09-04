import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reqDeleteComment } from "../../api/postApi";

export const usePostCommentDeleteQuery = (boardKey, postId) => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: ["postCommentDelete", boardKey, postId],
    mutationFn: ({ postCommentId }) =>
      reqDeleteComment({ boardKey, postId, postCommentId }),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["allComments", boardKey, postId] });
      query.invalidateQueries({ queryKey: ["postDetail", boardKey, postId] });
    },
  });
};
