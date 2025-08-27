import { useQuery } from "@tanstack/react-query";
import { reqPostDetail, reqPosts } from "../../api/postApi";

export const usePostsQuery = (boardKey, postId) =>
  useQuery({
    queryKey: ["posts", boardKey, postId],
    queryFn: async () => await reqPostDetail(boardKey, postId),
    staleTime: 1000 * 10,
  });
