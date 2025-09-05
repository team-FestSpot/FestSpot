import { useQuery } from "@tanstack/react-query";
import { reqPerformanceApiIdList } from "../../api/performanceApi";

// db에서 api id 목록 받아오는 query
// kopis api에 요청 보내는 query 아님
// db에 없는 공연 정보만 대시보드에 표시하는 용도
export const usePerformanceApiIdListQuery = () =>
  useQuery({
    queryKey: ["getPerformanceApiIdList"],
    queryFn: async () => {
      return await reqPerformanceApiIdList();
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
