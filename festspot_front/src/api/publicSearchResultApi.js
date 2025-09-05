import axios from "axios";
import { getPublicApiSearchResultUrl } from "../utils/getPublicApiSearchResultUrl";

export const publicSearchResultApi = (page, size, name, venue) => {
  return axios.get(getPublicApiSearchResultUrl(page, size, name, venue), {
    responseType: "text",
  });
};
