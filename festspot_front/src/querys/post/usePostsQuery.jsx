import { useQuery } from "@tanstack/react-query";
import { reqPosts } from "../../api/postApi";

export const usePostsQuery = ({ boardKey, page }) =>
  useQuery({
    queryKey: ["posts", boardKey, page],
    queryFn: async () => await reqPosts(boardKey, page),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
  });
