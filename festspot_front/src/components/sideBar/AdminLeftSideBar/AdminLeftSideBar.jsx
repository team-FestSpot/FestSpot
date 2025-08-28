import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import usePrincipalQuery from "../../../querys/auth/usePrincipalQuery";

function AdminLeftSideBar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const principalQuery = usePrincipalQuery();
  const menus = [
    {
      id: "dashboard",
      to: "/admin/dashboard",
      placeholder: "관리자 메인",
    },
    {
      id: "detail",
      to: "/admin/detail",
      placeholder: "상세 페이지 추가",
    },
    {
      id: "user",
      to: "/admin/user",
      placeholder: "사용자 관리",
    },
    {
      id: "performance",
      to: "/admin/performance",
      placeholder: "API 외 공연 정보 관리",
    },
  ];

  const handleLogoutButtonClick = () => {
    Swal.fire({
      title: "로그아웃 되었습니다.",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    })
      .then(localStorage.clear())
      .then(principalQuery.refetch())
      .then(navigate("/admin/login"));
  };

  return (
    <div css={s.container}>
      <div css={s.sidebar}>
        <header css={s.header}>
          <div>
            <h4>FestSpot 관리자 페이지</h4>
          </div>
          <div>
            <Button onClick={handleLogoutButtonClick}>로그아웃</Button>
          </div>
        </header>
        <main>
          {menus.map((menu) => (
            <Link
              id={menu.id}
              to={menu.to}
              css={[
                s.navItem,
                location.pathname.slice(7) === menu.id && s.activeNavItem,
              ]}
            >
              {menu.placeholder}
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
}

export default AdminLeftSideBar;
