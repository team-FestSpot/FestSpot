import React from "react";
import { IoClose } from "react-icons/io5";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { Link } from "react-router-dom";
import useUpperSideBarStore from "../../../../stores/upperSideBarStore";
import festSpotLogo from "./img/FestSpotLogoImg.png";
import festSpotLogoText from "./img/FestSpotLogoText.png";

function UpperSideBarModal(props) {
  const { isMenuOpen, closeMenu } = useUpperSideBarStore();

  const modalMenus = [
    {
      id: 1,
      majorCategory: { content: "마이페이지", link: "/mypage" },
      minorCategory: [
        { content: "회원정보 수정", link: "/mypage/info" },
        { content: "내가 작성한 글 목록", link: "/mypage/mylist" },
        { content: "즐겨찾기한 공연/페스티벌 목록", link: "/mypage/like" },
      ],
    },
    {
      id: 2,
      majorCategory: { content: "공연 정보", link: "/performance" },
      minorCategory: [
        { content: "국내 공연", link: "/performance/concert" },
        { content: "국내 페스티벌", link: "/performance/festival" },
        { content: "내한 공연", link: "/performance/foreign" },
      ],
    },
    {
      id: 3,
      majorCategory: { content: "커뮤니티", link: "/community" },
      minorCategory: [
        { content: "자유 게시판", link: "/community/public" },
        { content: "양도 게시판", link: "/community/review" },
        { content: "후기 게시판", link: "/community/assignment" },
      ],
    },
  ];

  const handleCloseOnClick = () => {
    closeMenu();
  };

  return (
    <div>
      <div css={() => s.modalContainer(isMenuOpen)}>
        <div css={s.closeButton}>
          <IoClose onClick={handleCloseOnClick} />
        </div>
        <div css={s.modalUserInfo}>
          <img src={festSpotLogo} alt="" />
          <Link css={s.username}>nickname</Link>
          <div css={s.logoutContainer}>
            <Link css={s.logout}>로그아웃</Link>
          </div>
        </div>
        {modalMenus.map((modalMenu, index) => {
          const major = modalMenu.majorCategory;
          const minors = modalMenu.minorCategory;

          return (
            <div key={index} css={s.modalMinorCategory}>
              <div css={s.container}>
                <div css={s.majorCategory}>
                  <a href={major.link} css={s.majorLink}>
                    {major.content}
                  </a>
                </div>
                <div css={s.minorCategoryContainer}>
                  {minors.map((minor, index) => (
                    <a key={index} href={minor.link} css={s.minorLink}>
                      {minor.content}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UpperSideBarModal;
