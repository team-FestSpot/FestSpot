import { useState } from "react";
import { getLocalDate, getLocalDateAfterMonths } from "./getLocalDate";

export const getPublicApiSearchResultUrl = (searchMutationParams) => {
  return `/kopis/api?service=a65dc49e0db540c985f6e41ff1865fca&stdate=${getLocalDate()}&eddate=${getLocalDateAfterMonths()}&cpage=${
    searchMutationParams.page
  }&rows=${searchMutationParams.size}&shcate=CCCD&shprfnm=${
    searchMutationParams.name
  }&shprfnmfct=${searchMutationParams.venue}`;
};
