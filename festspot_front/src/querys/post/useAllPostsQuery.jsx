import { useQuery } from "@tanstack/react-query";
import { reqAllPosts } from "../../api/postApi";

export const useAllPostsQuery = (page) =>
  useQuery({
    queryKey: ["posts", page],
    queryFn: async () => await reqAllPosts(page),
    staleTime: 1000 * 10,
  });
