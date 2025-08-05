/** @jsxImportSource @emotion/react */
// import * as s from "./styles";
import React, { useEffect } from "react";
import { usePublicApiQuery } from "../../../querys/admin/usePublicApiQuery";
import { tempDataStore } from "../../../stores/tempDataStore";

function DashBoard(props) {
  const { listData, setListData } = tempDataStore();

  const { data, isFetched, error } = usePublicApiQuery(1, 100);

  useEffect(() => {
    if (!!data) {
      setListData(data);
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

  return <></>;
}

export default DashBoard;
