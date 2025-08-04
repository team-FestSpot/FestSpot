import { useQuery } from "@tanstack/react-query";
import { reqPublicApi } from "../../api/publicApi";
import { convertXmlToJson } from "../../api/xml";

export const getPublicApiQuery = (page, size) =>
  useQuery({
    queryKey: ["publicApi"],
    queryFn: async () => {
      const xmlText = (await reqPublicApi(page, size)).data;
      return (await convertXmlToJson(xmlText)).dbs.db;
    },
  });
