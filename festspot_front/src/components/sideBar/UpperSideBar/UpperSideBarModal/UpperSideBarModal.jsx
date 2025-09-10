import React from "react";
import { IoClose } from "react-icons/io5";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useUpperSideBarStore from "../../../../stores/upperSideBarStore";
import festSpotLogo from "./img/FestSpotLogoImg.png";
import festSpotLogoText from "./img/FestSpotLogoText.png";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

function UpperSideBarModal(props) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
      majorCategory: { content: "공연 정보", link: "/performance/all" },
      minorCategory: [
        { content: "국내 공연", link: "/performance/concert" },
        { content: "국내 페스티벌", link: "/performance/festival" },
        { content: "내한 공연", link: "/performance/visit" },
      ],
    },
    {
      id: 3,
      majorCategory: { content: "커뮤니티", link: "/board" },
      minorCategory: [
        { content: "자유 게시판", link: "/board/free" },
        { content: "양도 게시판", link: "/board/review" },
        { content: "후기 게시판", link: "/board/transfer" },
        { content: "소규모 축제 게시판", link: "/board/small" },
      ],
    },
  ];

  const handleCloseOnClick = () => {
    closeMenu();
  };

  const handleLogoutOnClick = async () => {
    localStorage.removeItem("AccessToken");
    await queryClient.invalidateQueries({
      queryKey: ["principal"],
    });

    await Swal.fire({
      title: "로그아웃 성공",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });
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
            <Link onClick={handleLogoutOnClick} css={s.logout}>
              로그아웃
            </Link>
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
