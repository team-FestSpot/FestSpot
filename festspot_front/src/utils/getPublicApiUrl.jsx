import { useState } from "react";
import { getLocalDate, getLocalDateAfterMonths } from "./getLocalDate";

export const getPublicApiUrl = (page, size) => {
  //round robin 구현해야 함 근데 어케 함?
  //상태까지 신경쓰면서 만들려니까 너무 머리 아픈데
  //   return `https://kopis.or.kr/openApi/restful/pblprfr?service=a65dc49e0db540c985f6e41ff1865fca&stdate=20250804&eddate=20260204&cpage=1&rows=20&shcate=CCCD`;
  return `/kopis/api?service=a65dc49e0db540c985f6e41ff1865fca&stdate=${getLocalDate()}&eddate=${getLocalDateAfterMonths()}&cpage=${page}&rows=${size}&shcate=CCCD`;
};