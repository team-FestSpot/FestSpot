/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import * as s from "./styles";
import UpperSideBarModal from "./UpperSideBarModal/UpperSideBarModal";
import useUpperSideBarStore from "../../stores/upperSideBarStore";
import { LOGO_IMG, LOGO_IMG_TEXT } from "../../constants/logoImgPath";

function UpperSideBar(props) {
  const { isMenuOpen, setOpenDetailMenus, closeMenu } = useUpperSideBarStore();

  const handleMenuOnClick = () => {
    setOpenDetailMenus();
  };

  const handleModalOnClose = () => {
    closeMenu();
  };

  return (
    <div css={s.upperBarLayout}>
      <div css={s.container}>
        <div css={s.logoSection}>
          <div css={s.logo}>
            <img src={LOGO_IMG} />
          </div>
          <div css={s.logoText}>
            <img src={LOGO_IMG_TEXT} />
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
          <div css={s.loginButtonContainer}>
            <button css={s.loginButton}>Login</button>
          </div>
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
