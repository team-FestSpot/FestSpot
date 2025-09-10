import { Navigate, Route, Routes } from "react-router-dom";
import MyPageMain from "../page/myPage/MyPageMain/MyPageMain";
import MyPageUserInfo from "../page/myPage/UserInfo/MyPageUserInfo";
import usePrincipalQuery from "../querys/auth/usePrincipalQuery";
import MyPageModifyUserInfo from "../page/myPage/ModifyUserInfo/MyPageModifyUserInfo";

function MyPageRouter() {
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
        <Route path="/" element={<MyPageUserInfo />} />

        <Route path="*" element={<></>} />
      </Routes>
    </MyPageMain>
  );
}

export default MyPageRouter;
