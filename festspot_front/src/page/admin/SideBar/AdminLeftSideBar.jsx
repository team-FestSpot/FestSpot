import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { Link, useLocation } from "react-router-dom";

function AdminLeftSideBar(props) {
  const location = useLocation();

  return (
    <div css={s.container}>
      <div css={s.sidebar}>
        <header css={s.header}>
          <div>FestSpot 관리자 페이지</div>
        </header>
        <main>
          <Link
            id="dashboard"
            to="/admin/dashboard"
            css={[
              s.navItem,
              location.pathname.slice(7) === "main" && s.activeNavItem,
            ]}
          >
            관리자 메인
          </Link>
          <Link
            id="detail"
            to="/admin/detail"
            css={[
              s.navItem,
              location.pathname.slice(7) === "detail" && s.activeNavItem,
            ]}
          >
            상세 페이지 추가
          </Link>
          <Link
            id="user"
            to="/admin/user"
            css={[
              s.navItem,
              location.pathname.slice(7) === "user" && s.activeNavItem,
            ]}
          >
            사용자 관리
          </Link>
          <Link
            id="userperformance"
            to="/admin/userperformance"
            css={[
              s.navItem,
              location.pathname.slice(7) === "user" && s.activeNavItem,
            ]}
          >
            사용자 등록 공연 정보 관리
          </Link>
          <Link
            id="config"
            to="/admin/user/performance"
            css={[
              s.navItem,
              location.pathname.slice(7) === "config" && s.activeNavItem,
            ]}
          >
            설정
          </Link>
        </main>
      </div>
    </div>
  );
}

export default AdminLeftSideBar;
