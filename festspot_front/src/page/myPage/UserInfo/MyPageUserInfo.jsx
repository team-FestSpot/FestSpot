import React from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { USER_PROFILE_IMG_PATH } from "../../../constants/userProfileImgPath";
import usePrincipalQuery from "../../../querys/auth/usePrincipalQuery";

function MyPageUserInfo(props) {
  const principalQuery = usePrincipalQuery();
  const userInfo = principalQuery.data?.data?.body.user;
  return (
    <div css={s.contentsLayout}>
      <div css={s.contentContainer}>
        <div css={s.profileImgContainer}>
          <img src={`${USER_PROFILE_IMG_PATH}${userInfo?.userProfileImgUrl}`} />
        </div>
        <div>{`${userInfo?.userNickName}`} 님, 반갑습니다.</div>
      </div>
    </div>
  );
}

export default MyPageUserInfo;
