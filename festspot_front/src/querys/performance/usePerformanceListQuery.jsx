import { useQuery } from "@tanstack/react-query";
import { reqPerformanceList } from "../../api/performanceApi";

export const usePerformanceListQuery = () =>
  useQuery({
    queryKey: ["performanceList"],
    queryFn: async () => await reqPerformanceList(),
  });
