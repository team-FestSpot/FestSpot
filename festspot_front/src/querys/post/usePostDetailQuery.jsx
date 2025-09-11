import { useQuery } from "@tanstack/react-query";
import { reqPostDetail } from "../../api/postApi";

export const usePostDetailQuery = ({ boardKey, postId }) =>
  useQuery({
    queryKey: ["post", boardKey, postId],
    queryFn: async () => await reqPostDetail(boardKey, postId),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
  });
