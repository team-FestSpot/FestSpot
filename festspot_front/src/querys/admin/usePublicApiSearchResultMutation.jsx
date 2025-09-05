import { useMutation } from "@tanstack/react-query";
import { convertXmlToJson } from "../../api/xmlToJson";
import { publicSearchResultApi } from "../../api/publicSearchResultApi";

export const usePublicApiSearchResultMutation = () =>
  useMutation({
    mutationFn: async (searchMutationParams) => {
      // searchMutationParams = 페이지 1, 사이즈 100, 공연명, 공연장소
      let dataList = [];
      const { size, name, venue } = searchMutationParams;
      let page = searchMutationParams.page;
      let isContinue = true;
      while (isContinue) {
        const xmlText = (await publicSearchResultApi(page, size, name, venue))
          .data;
        const jsonData = await convertXmlToJson(xmlText);
        const dbData = jsonData?.dbs?.db;

        // dbs 자체가 없거나 빈 문자열일 경우 종료
        if (!jsonData?.dbs || jsonData.dbs === "") {
          console.log("종료조건1");
          isContinue = false;
          break;
        }

        // dbData가 없거나 비정상일 때 종료
        if (!dbData) {
          console.log("종료조건2");
          isContinue = false;
          break;
        }
        console.log(isContinue);

        dataList = [...dataList, ...dbData];
        page++;
      }
      return dataList;
    },
  });
