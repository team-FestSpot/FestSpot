import React from "react";
import UpperSideBarModalList from "./UpperSideBarModalList/UpperSideBarModalList";
import { IoClose } from "react-icons/io5";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { css } from "@emotion/react";
import useUpperSideBarStore from "../../../stores/upperSideBarStore";

function UpperSideBarModal(props) {
  const { openDetailMenus, closeMenu } = useUpperSideBarStore();

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
      <div css={() => s.modalContainer(openDetailMenus)}>
        <div css={s.closeButton}>
          <IoClose onClick={handleCloseOnClick} />
        </div>
        <div css={s.modalUserInfo}>
          <img src="src\SideBar\UpperSideBar\FestSpotLogoImg.png" alt="" />
          <div>nickname</div>
        </div>
        {modalMenus.map((modalMenu, index) => (
          <div key={index} css={s.modalMinorCategory}>
            <UpperSideBarModalList props={modalMenu} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpperSideBarModal;
