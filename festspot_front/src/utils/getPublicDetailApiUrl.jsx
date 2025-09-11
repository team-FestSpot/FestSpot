import { randomApiKey } from "../constants/apiKeys";

export const getPublicDetailApiUrl = (performanceApiId) => {
  return `/kopis/api/${performanceApiId}?service=${randomApiKey()}`;
};
