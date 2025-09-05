import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reqAddComment } from "../../api/postApi";

export const usePostCommentAddQuery = (boardKey, postId) => {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["postCommentAdd", boardKey, postId],
    mutationFn: ({ commentContent, commentLevel }) =>
      reqAddComment({ boardKey, postId, commentContent, commentLevel }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["allPostComments", boardKey, postId] });
      qc.invalidateQueries({ queryKey: ["postDetail", boardKey, postId] });
    },
  });

  // ✅ 함수처럼 바로 쓸 수 있게 래핑
  const addCommentQuery = mutation.mutateAsync;

  // isPending 등도 그대로 넘겨줌
  return { addCommentQuery, ...mutation };
};
