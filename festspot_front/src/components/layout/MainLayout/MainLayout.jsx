/** @jsxImportSource @emotion/react */
import { useLocation } from "react-router-dom";
import PostSideBar from "../../sideBar/PostSideBar/PostSideBar";
import UpperSideBar from "../../sideBar/UpperSideBar/UpperSideBar";
import * as s from "./styles";
import React, { useEffect, useRef, useState } from "react";
import { useFixQuillToolBarStore } from "../../../stores/useFixQuillToolBarStore";

function MainLayout({ children }) {
  const location = useLocation();
  const scrollRef = useRef();
  const [hidePostSideBar, setHidePostSideBar] = useState(true);
  const { isFixed, setIsFixed } = useFixQuillToolBarStore();

  //게시글 쓰기 화면에서는 PostSideBar 안보여줌
  const hiddenSidebarPaths = ["/board/write"];

  useEffect(() => {
    setHidePostSideBar(
      hiddenSidebarPaths.some((path) => location.pathname.startsWith(path))
    );
  }, [location]);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const handleScroll = () => {
      if (scrollEl.scrollTop > 205) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    scrollEl.addEventListener("scroll", handleScroll);

    return () => {
      scrollEl.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      <div css={s.container(hidePostSideBar)}>
        <div css={s.children} ref={scrollRef}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
