/** @jsxImportSource @emotion/react */
import { BoardContext } from "../../../constants/BoardContext";
import PostSideBar from "../../../SideBar/PostSideBar/PostSideBar";
import UpperSideBar from "../../../SideBar/UpperSideBar/UpperSideBar";
import * as s from "./styles";
import React, { useState } from "react";

function MainLayout({ children }) {
  const [currentBoard, setCurrentBoard] = useState("free");
  const [loading, setLoading] = useState(false);

  const handleBoardOnChange = (boardId) => {
    console.log("MainLayout: 게시판 변경됨 ->", boardId);
    setCurrentBoard(boardId);
  };

  return (
    <BoardContext.Provider
      value={{ currentBoard, onBoardChange: handleBoardOnChange, loading }}
    >
      <div css={s.layout}>
        <UpperSideBar />
        <PostSideBar
          currentBoard={currentBoard}
          onBoardChange={handleBoardOnChange}
          loading={loading}
        />
        <div css={s.container}>
          <div css={s.children}>{children}</div>
        </div>
      </div>
    </BoardContext.Provider>
  );
}

export default MainLayout;
