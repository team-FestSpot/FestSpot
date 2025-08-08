import { useQuery } from "@tanstack/react-query";
import { reqPublicApi } from "../../api/publicApi";
import { convertXmlToJson } from "../../api/xml";
import { useState } from "react";

// api에서 받아올 수 있는 공연정보 전부 받아오는 쿼리
export const usePublicApiAllQuery = () =>
  useQuery({
    queryKey: ["publicApiAll"],
    queryFn: async () => {
      let page = 1; // 1페이지부터 시작
      const size = 100; // 100개씩 요청(1번에 요청할 수 있는 최대 개수)
      // let hasResponse = true;
      let dataList = [];
      while (true) {
        const xmlText = (await reqPublicApi(page, size)).data;
        const jsonData = await convertXmlToJson(xmlText);
        // console.log(jsonData?.dbs?.db);
        if (!jsonData?.dbs?.db) {
          // hasResponse = false;
          break; // 마지막 페이지를 넘기면 undefined가 오는데 그걸 spread로 펼치려고 하면 오류가 발생해서 return을 못해줘서 break 걸어줘야함
        }
        dataList = [...dataList, ...jsonData?.dbs?.db];
        page++;
      }
      return dataList;
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
