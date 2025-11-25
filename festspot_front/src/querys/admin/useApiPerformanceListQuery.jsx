import { useQuery } from "@tanstack/react-query";
import { reqGetApiPerformanceListApi } from "../../api/adminApi";

export const useApiPerformanceListQuery = () =>
  useQuery({
    queryKey: ["getApiPerformanceList"],
    queryFn: async () => {
      return await reqGetApiPerformanceListApi();
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
