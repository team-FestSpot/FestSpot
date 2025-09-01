import { useQuery } from "@tanstack/react-query";
import { reqPerformanceDetail } from "../../api/performanceApi";

export const usePerformanceDetailQuery = (performanceId) =>
  useQuery({
    queryKey: ["performanceDetail"],
    queryFn: async () => await reqPerformanceDetail(performanceId),
  });
