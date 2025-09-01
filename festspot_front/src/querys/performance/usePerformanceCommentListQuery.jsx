import { useQuery } from "@tanstack/react-query";
import { reqPerformanceCommentList } from "../../api/performanceApi";

export const usePerformanceCommentListQuery = (performanceId) =>
  useQuery({
    queryKey: ["performanceCommentList"],
    queryFn: async () => await reqPerformanceCommentList(performanceId),
  });
