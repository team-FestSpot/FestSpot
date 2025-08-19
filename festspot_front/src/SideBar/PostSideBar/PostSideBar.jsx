/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import React from "react";
import { IoTicketOutline } from "react-icons/io5";
import {
  MdMessage,
  MdOutlineFestival,
  MdOutlineRateReview,
} from "react-icons/md";

function PostSideBar({ currentBoard, onBoardChange, loading }) {
  const boards = [
    {
      id: "free",
      name: "자유 게시판",
      icon: MdMessage,
      categoryId: 1,
    },
    {
      id: "review",
      name: "후기 게시판",
      icon: MdOutlineRateReview,
      categoryId: 2,
    },
    {
      id: "transfer",
      name: "양도 게시판",
      icon: IoTicketOutline,
      categoryId: 3,
    },
    {
      id: "small",
      name: "소규모 축제 게시판",
      icon: MdOutlineFestival,
      categoryId: 4,
    },
  ];

  return (
    <div css={s.sidebarContainer}>
      {/* 게시판 네비게이션 */}
      <div css={s.boardNavButtons}>
        {boards.map((board) => {
          const IconComponent = board.icon;
          return (
            <button
              key={board.id}
              onClick={() => onBoardChange(board.id)}
              css={[
                s.boardBtn,
                // currentBoard === board.id && s.boardBtnActive,
              ]}
              disabled={loading}
            >
              <IconComponent css={s.icon} />
              {board.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PostSideBar;
