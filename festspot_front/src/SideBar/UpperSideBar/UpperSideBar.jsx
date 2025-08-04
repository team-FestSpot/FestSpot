/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import * as s from "./styles";
import UpperSideBarModal from "./UpperSideBarModal/UpperSideBarModal";
import useUpperSideBarStore from "../../stores/upperSideBarStore";

function UpperSideBar(props) {
  const { openDetailMenus, setOpenDetailMenus, closeMenu } =
    useUpperSideBarStore();

  const handleMenuOnClick = () => {
    setOpenDetailMenus();
  };

  const handleModalOnClose = () => {
    closeMenu();
  };

  return (
    <div css={s.layout}>
      <div css={s.modalContainer}>
        <div css={s.logoSection}>
          <div>
            <img src="src\SideBar\UpperSideBar\FestSpotLogoImg.png" />
          </div>
          <div>
            <img src="src\SideBar\UpperSideBar\FestSpotLogoText.png" />
          </div>
        </div>
        <div css={s.searchSection}>
          <div css={s.searchContainer}>
            <input
              css={s.searchInput}
              type="text"
              placeholder="검색어를 입력하세요"
            />
            <IoSearch css={s.searchIcon} />
          </div>
        </div>
        <div css={s.actionSection}>
          <button css={s.loginButton}>Login</button>
          <GiHamburgerMenu css={s.menuIcon} onClick={handleMenuOnClick} />
        </div>
      </div>
      {openDetailMenus && (
        <div>
          <UpperSideBarModal onClose={handleModalOnClose} />
        </div>
      )}
    </div>
  );
}

export default UpperSideBar;
