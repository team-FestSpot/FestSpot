import { useMutation } from "@tanstack/react-query";
import { convertXmlToJson } from "../../api/xmlToJson";
import { publicSearchResultApi } from "../../api/publicSearchResultApi";

export const getPublicApiSearchResultMutation = () =>
  useMutation({
    mutationFn: async (searchMutationParams) => {
      const xmlText = (await publicSearchResultApi(searchMutationParams)).data;
      const jsonData = await convertXmlToJson(xmlText);
      return jsonData?.dbs?.db;
    },
  });
