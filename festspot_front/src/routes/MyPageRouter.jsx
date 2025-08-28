import React from "react";
import { Route, Routes } from "react-router-dom";
import MyPageModifyUserInfo from "../page/myPage/ModifyUserInfo/myPageModifyUserInfo";
import MyPageMain from "../page/myPage/MyPageMain/MyPageMain";
import MyPageUserInfo from "../page/myPage/UserInfo/MyPageUserInfo";

function MyPageRouter(props) {
  return (
    <MyPageMain>
      <Routes>
        <Route path="/info" element={<MyPageModifyUserInfo />} />
        <Route path="/" element={<MyPageUserInfo />} />
        <Route path="*" element={<></>} />
      </Routes>
    </MyPageMain>
  );
}

export default MyPageRouter;
