import axios from "axios";
import { getPublicDetailApiUrl } from "../utils/getPublicDetailApiUrl";

// 공연상세정보 쿼리 실행하는 api
export const reqPublicDetailApi = (performanceApiId) => {
  return axios.get(getPublicDetailApiUrl(performanceApiId), {
    responseType: "text",
  });
};
