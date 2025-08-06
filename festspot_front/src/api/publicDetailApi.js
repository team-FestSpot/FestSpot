import axios from "axios";
import { getPublicDetailApiUrl } from "../utils/getPublicDetailApiUrl";

export const reqPublicDetailApi = (performanceApiId) => {
  return axios.get(getPublicDetailApiUrl(performanceApiId), {
    responseType: "text",
  });
};
