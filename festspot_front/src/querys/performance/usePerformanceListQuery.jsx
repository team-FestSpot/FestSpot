import { useQuery } from "@tanstack/react-query";
import { reqPerformanceList } from "../../api/performanceApi";

export const usePerformanceListQuery = () =>
  useQuery({
    queryKey: ["performanceList"],
    queryFn: async () => await reqPerformanceList(),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });
