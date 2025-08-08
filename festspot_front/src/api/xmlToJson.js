import { XMLParser } from "fast-xml-parser";

export const convertXmlToJson = async (xmlText) => {
  const parser = new XMLParser();
  return parser.parse(xmlText);
};
