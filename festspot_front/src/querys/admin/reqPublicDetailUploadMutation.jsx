import { useMutation, useQuery } from "@tanstack/react-query";
import { reqPublicDetailApi } from "../../api/publicDetailApi";
import { convertXmlToJson } from "../../api/xml";
import { reqUploadPerformanceApi } from "../../api/adminApi";

// 공연 ID 넣으면 공연상세정보 받아서 백엔드에 던지는 mutation
export const reqPublicDetailUploadMutation = () =>
  useMutation({
    mutationFn: async (performanceApiId) => {
      const xmlText = (await reqPublicDetailApi(performanceApiId)).data;
      const jsonData = (await convertXmlToJson(xmlText)).dbs.db;
      return reqUploadPerformanceApi(jsonData);
    },
  });
