/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import * as s from "./styles";
import UpperSideBarModal from "./UpperSideBarModal/UpperSideBarModal";
<<<<<<< HEAD:festspot_front/src/SideBar/UpperSideBar/UpperSideBar.jsx
import useUpperSideBarStore from "../../stores/upperSideBarStore";
import { useNavigate } from "react-router-dom";
=======
import useUpperSideBarStore from "../../../stores/upperSideBarStore";
import festSpotLogo from "./UpperSideBarModal/img/FestSpotLogoImg.png";
import festSpotLogoText from "./UpperSideBarModal/img/FestSpotLogoText.png";
>>>>>>> fb44a73779a1409b066a050d81dad80779ba4216:festspot_front/src/components/sideBar/UpperSideBar/UpperSideBar.jsx

function UpperSideBar(props) {
  const navigate = useNavigate();
  const { isMenuOpen, setOpenDetailMenus, closeMenu } = useUpperSideBarStore();

  const handleMenuOnClick = () => {
    setOpenDetailMenus();
  };

  const handleModalOnClose = () => {
    closeMenu();
  };

  const handleLoginOnClick = () => {
    navigate(`/auth/login`);
  };

  return (
    <div css={s.upperBarLayout}>
      <div css={s.container}>
        <div css={s.logoSection}>
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
          <div css={s.loginButtonContainer}>
            <button css={s.loginButton} onClick={handleLoginOnClick}>
              Login
            </button>
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
