/** @jsxImportSource @emotion/react */
import { useLocation } from "react-router-dom";
import { BoardContext } from "../../../constants/BoardContext";
import PostSideBar from "../../sideBar/PostSideBar/PostSideBar";
import UpperSideBar from "../../sideBar/UpperSideBar/UpperSideBar";
import * as s from "./styles";
import React, { useEffect, useState } from "react";

function MainLayout({ children }) {
  const location = useLocation();
  const [hidePostSideBar, setHidePostSideBar] = useState(true);

  //게시글 쓰기 화면에서는 PostSideBar 안보여줌
  const hiddenSidebarPaths = ["/board/write"];

  useEffect(() => {
    setHidePostSideBar(
      hiddenSidebarPaths.some((path) => location.pathname.startsWith(path))
    );
  }, [location]);

  return (
    <div css={s.layout}>
      <div css={s.upperSideBar}>
        <UpperSideBar />
      </div>
      {hidePostSideBar || (
        <div css={s.postSideBar}>
          <PostSideBar />
        </div>
      )}
      <div css={s.container}>
        <div css={s.children}>{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
