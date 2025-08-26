import { useQuery } from "@tanstack/react-query";
import { reqGetCustomPerformanceListApi } from "../../api/adminApi";

export const useCustomPerformanceListQuery = () =>
  useQuery({
    queryKey: ["getCustomPerformanceList"],
    queryFn: async () => {
      return await reqGetCustomPerformanceListApi();
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
