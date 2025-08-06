import axios from "axios";
import { getPublicApiUrl } from "../utils/getPublicApiUrl";

export const reqPublicApi = (page, size) => {
  return axios.get(getPublicApiUrl(page, size), {
    responseType: "text",
  });
};

