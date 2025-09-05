import { useQuery } from "@tanstack/react-query";
import { reqCommentsList } from "../../api/postApi";

export const useAllPostCommentQuery = (boardKey, postId) =>
  useQuery({
    queryKey: ["allComments", boardKey, postId],
    queryFn: async () => await reqCommentsList(boardKey, postId),
    staleTime: 1000 * 60 * 5,
  });
