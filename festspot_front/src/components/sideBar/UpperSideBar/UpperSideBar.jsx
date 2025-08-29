/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import * as s from "./styles";
import UpperSideBarModal from "./UpperSideBarModal/UpperSideBarModal";
import useUpperSideBarStore from "../../../stores/upperSideBarStore";
import festSpotLogo from "./UpperSideBarModal/img/FestSpotLogoImg.png";
import festSpotLogoText from "./UpperSideBarModal/img/FestSpotLogoText.png";
import { useNavigate } from "react-router-dom";
import usePrincipalQuery from "../../../querys/auth/usePrincipalQuery";
import { USER_PROFILE_IMG_PATH } from "../../../constants/userProfileImgPath";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

function UpperSideBar(props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const principalQuery = usePrincipalQuery();
  const userInfo = principalQuery.data?.data?.body?.user;
  const { isMenuOpen, setOpenDetailMenus, closeMenu } = useUpperSideBarStore();

  const accessToken = localStorage.getItem("AccessToken");

  const handleMenuOnClick = () => {
    setOpenDetailMenus();
  };

  const handleModalOnClose = () => {
    closeMenu();
  };

  const handleLoginOnClick = () => {
    navigate(`/auth/login`);
  };

  const handleToHomeOnClick = (e) => {
    navigate("/");
  };

  const badUserInfo = () => {
    Swal.fire({
      title: "잘못된 유저 정보입니다.",
      icon: "error",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    })
      .then(localStorage.clear())
      .then(queryClient.invalidateQueries("pricipal"))
      .then(navigate("/admin/login"));
  };

  return (
    <div css={s.upperBarLayout}>
      <div css={s.container}>
        <div css={s.logoSection} onClick={handleToHomeOnClick}>
          <div css={s.logo}>
            <img src={festSpotLogo} />
          </div>
          <div css={s.logoText}>
            <img src={festSpotLogoText} />
          </div>
        </div>
        <div css={s.searchSection}>
          <div css={s.searchContainer}>
            <input
              css={s.searchInput}
              type="text"
              placeholder="검색어를 입력하세요"
            />
            <div css={s.iconContainer}>
              <IoSearch css={s.searchIcon} />
            </div>
          </div>
        </div>
        <div css={s.actionSection}>
          {!!accessToken && principalQuery.isSuccess ? (
            <>
              {!!userInfo && (
                <div css={s.profileContainer}>
                  <div css={s.profileImgContainer}>
                    <img
                      src={`${USER_PROFILE_IMG_PATH}${userInfo.userProfileImgUrl}`}
                      alt=""
                    />
                  </div>
                  <div css={s.nicknameContainer}>
                    <span>{userInfo.userNickName}</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div css={s.loginButtonContainer}>
              <button css={s.loginButton} onClick={handleLoginOnClick}>
                Login
              </button>
            </div>
          )}
          <div css={s.menuIconContainer}>
            <GiHamburgerMenu css={s.menuIcon} onClick={handleMenuOnClick} />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div>
          <UpperSideBarModal onClose={handleModalOnClose} />
        </div>
      )}
    </div>
  );
}

export default UpperSideBar;
