import { useQuery } from "@tanstack/react-query";
import { reqPostPageNum } from "../../api/postApi";

export const usePostPageNumQuery = ({ postId, postCategoryId }) =>
  useQuery({
    queryKey: ["postPageNum", postId, postCategoryId],
    queryFn: async () => await reqPostPageNum(postId, postCategoryId),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
  });
