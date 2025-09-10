import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MyPageModifyUserInfo from "../page/myPage/ModifyUserInfo/MyPageModifyUserInfo";
import MyPageMain from "../page/myPage/MyPageMain/MyPageMain";
import MyPageUserInfo from "../page/myPage/UserInfo/MyPageUserInfo";
import usePrincipalQuery from "../querys/auth/usePrincipalQuery";
import MyPageWithdrawUserInfo from "../page/myPage/MyPageWithDrawUserInfo/MyPageWithdrawUserInfo";

function MyPageRouter(props) {
  const principalQuery = usePrincipalQuery();
  const principal = principalQuery?.data?.data?.body;

  if (principalQuery.isFetched) {
    if (!principal?.authorities || principal?.authorities?.length < 1) {
      return <Navigate to={"/auth/login"} />;
    }
  }

  return (
    <MyPageMain>
      <Routes>
        <Route path="/info" element={<MyPageModifyUserInfo />} />
        <Route path="/withdraw" element={<MyPageWithdrawUserInfo />} />
        <Route path="/" element={<MyPageUserInfo />} />
        <Route path="*" element={<></>} />
      </Routes>
    </MyPageMain>
  );
}

export default MyPageRouter;
