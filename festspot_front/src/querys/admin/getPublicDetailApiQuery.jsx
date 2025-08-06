import { useQuery } from "@tanstack/react-query";
import { reqPublicDetailApi } from "../../api/publicDetailApi";
import { convertXmlToJson } from "../../api/xml";

// 공연 ID 넣으면 공연상세정보 반환하는 쿼리
export const getPublicApiQuery = (performanceApiId) =>
  useQuery({
    queryKey: ["publicDetailApi"],
    queryFn: async () => {
      const xmlText = (await reqPublicDetailApi(performanceApiId)).data;
      return (await convertXmlToJson(xmlText)).dbs.db;
    },
  });
