import { useQuery } from "@tanstack/react-query";
import { reqPublicDetailApi } from "../../api/publicDetailApi";
import { convertXmlToJson } from "../../api/xml";

export const getPublicApiQuery = (page, size) =>
  useQuery({
    queryKey: ["publicDetailApi"],
    queryFn: async () => {
      const xmlText = (await reqPublicDetailApi(page, size)).data;
      return (await convertXmlToJson(xmlText)).dbs.db;
    },
  });
