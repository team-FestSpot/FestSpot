import { useQuery } from "@tanstack/react-query";
import { reqGetBoardPosts } from "../../api/boardApi";

export const useBoardPosts = ({boardKey, page}) =>
  useQuery({
    queryKey: ["boardPosts", boardKey, page],
    queryFn: async () => await reqGetBoardPosts(boardKey, page, 20),
    staleTime: 1000 * 10,
  });
