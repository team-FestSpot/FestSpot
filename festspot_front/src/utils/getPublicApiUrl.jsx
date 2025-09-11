import { randomApiKey } from "../constants/apiKeys";
import { getLocalDate, getLocalDateAfterMonths } from "./getLocalDate";

export const getPublicApiUrl = (page, size) => {
  return `/kopis/api?service=${randomApiKey()}&stdate=${getLocalDate()}&eddate=${getLocalDateAfterMonths()}&cpage=${page}&rows=${size}&shcate=CCCD`;
};
