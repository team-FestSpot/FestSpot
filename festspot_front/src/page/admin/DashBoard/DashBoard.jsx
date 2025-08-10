/** @jsxImportSource @emotion/react */
// import * as s from "./styles";
import React, { useEffect } from "react";
import { usePublicApiQuery } from "../../../querys/admin/usePublicApiQuery";
import { tempDataStore } from "../../../stores/tempDataStore";

function DashBoard(props) {
  const { listData, setListData } = tempDataStore();

  let dataMess = [];
  const { data: data1, isFetched1, error1 } = usePublicApiQuery(1, 100);
  // const { data: data2, isFetched2, error2 } = usePublicApiQuery(2, 100);
  // const { data: data3, isFetched3, error3 } = usePublicApiQuery(3, 100);
  // const { data: data4, isFetched4, error4 } = usePublicApiQuery(4, 100);
  // const { data: data5, isFetched5, error5 } = usePublicApiQuery(5, 100);
  // if (!!data1 && !!data2 && !!data3 && !!data4 && !!data5) {
  //   dataMess = [...data1, ...data2, ...data3, ...data4, ...data5];
  // }
  if (!!data1) {
    dataMess = [...data1];
  }

  useEffect(() => {
    if (!!dataMess) {
      console.log(dataMess);
      localStorage.setItem("data", JSON.stringify(dataMess));
    }
  }, [data1]);

  return <></>;
}

export default DashBoard;
