import { useState } from "react";
import { getLocalDate, getLocalDateAfterMonths } from "./getLocalDate";

export const getPublicApiSearchResultUrl = (page, size, name, venue) => {
  return `/kopis/api?service=a65dc49e0db540c985f6e41ff1865fca&stdate=${getLocalDate()}&eddate=${getLocalDateAfterMonths()}&cpage=${page}&rows=${size}&shcate=CCCD&shprfnm=${name}&shprfnmfct=${venue}`;
};
