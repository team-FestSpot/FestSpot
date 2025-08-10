import axios from "axios";
import { getPublicApiSearchResultUrl } from "../utils/getPublicApiSearchResultUrl";

export const publicSearchResultApi = (searchMutationParams) => {
  return axios.get(getPublicApiSearchResultUrl(searchMutationParams), {
    responseType: "text",
  });
};
