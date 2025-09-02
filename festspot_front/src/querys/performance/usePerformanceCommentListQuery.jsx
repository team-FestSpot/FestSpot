import { useQuery } from "@tanstack/react-query";
import { reqPerformanceCommentList } from "../../api/performanceApi";

export const usePerformanceCommentListQuery = (performanceId) =>
  useQuery({
    queryKey: ["performanceCommentList"],
    queryFn: async () => await reqPerformanceCommentList(performanceId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
