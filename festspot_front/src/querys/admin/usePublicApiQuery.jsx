import { useQuery } from "@tanstack/react-query";
import { reqPublicApi } from "../../api/publicApi";
import { convertXmlToJson } from "../../api/xmlToJson";

export const usePublicApiQuery = (page, size) =>
  useQuery({
    queryKey: ["publicApi", page, size],
    queryFn: async () => {
      const xmlText = (await reqPublicApi(page, size)).data;
      const json = await convertXmlToJson(xmlText);
      return json?.dbs?.db ?? [];
    },
  });
