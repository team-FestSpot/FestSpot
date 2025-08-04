/** @jsxImportSource @emotion/react */
// import * as s from "./styles";
import React from "react";
import { getPublicApiQuery } from "../../../querys/admin/getPublicApiQuery";

function DashBoard(props) {
  const response = getPublicApiQuery(1, 20);
  console.log(response.data);
  return <>asdf</>;
}

export default DashBoard;
