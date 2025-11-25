import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import { useQueryClient } from "@tanstack/react-query";
import { FiX } from "react-icons/fi";
import usePrincipalQuery from "../../../querys/auth/usePrincipalQuery";
import useAdminAddPerformanceStore from "../../../stores/AdminAddPerformanceStore";

function AdminLeftSideBar({ setIsSideBar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const principalQuery = usePrincipalQuery();
  const principal = principalQuery?.data?.data?.body || {};
  const queryClient = useQueryClient();
  const { setDetailEmpty } = useAdminAddPerformanceStore();

  const menus = [
    {
      id: "dashboard",
      to: "/admin/dashboard",
      placeholder: "API 공연 정보 검색/등록",
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
      id: "apiperformance",
      to: "/admin/apiperformance",
      placeholder: "공연 정보 관리",
    },
    {
      id: "performance",
      to: "/admin/performance",
      placeholder: "추가한 공연 정보 관리",
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
    .then(setIsSideBar(false))
    .then(localStorage.clear())
    .then(queryClient.invalidateQueries("pricipal"))
    .then(navigate("/admin/login"));
  };

  return (
    <div css={s.container}>
      <div css={s.sidebar}>
        <header css={s.header}>
          <div css={s.closeButton}>
            <Button
              variant="outline"
              sx={{ fontSize: "1.5rem" }}
              onClick={() => setIsSideBar(false)}
            >
              <FiX />
            </Button>
          </div>
          <div css={s.headerContentsContainer}>
            <div>
              <h4>FestSpot 관리자 페이지</h4>
            </div>
            <div>
              <p>{principal?.user?.userNickName}</p>
            </div>
            <div>
              <Button
                variant="contained"
                color="error"
                onClick={handleLogoutButtonClick}
              >
                로그아웃
              </Button>
            </div>
          </div>
        </header>
        <main>
          {menus.map((menu) => (
            <Link
              key={menu.id}
              id={menu.id}
              to={menu.to}
              css={[
                s.navItem,
                location.pathname.slice(7) === menu.id && s.activeNavItem,
              ]}
              onClick={() => setDetailEmpty()}
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
