/** @jsxImportSource @emotion/react */
import { useLocation } from "react-router-dom";
import * as s from "./styles";
import React from "react";
import {
  MdMessage,
  MdOutlineRateReview,
  MdOutlineFestival,
} from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import { usePostsQuery } from "../../../querys/post/usePostsQuery";

function FestivalBoard(props) {
  const location = useLocation();
  const response = usePostsQuery(location.pathname, 1);

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

  return;
  <>
    <ResponsiveMasonry
      style={{
        display: "-webkit-box",
        display: "-ms-flexbox",
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
      }}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
      columnsCountBreakPoints={{
        1: 3,
        768: 4,
        1024: 3, // 반응형
      }}
    >
      <Masonry
        itemStyle={{
          backgroundClip: "padding-box",
          marginTop: "5px",
        }}
        style={{}}
      ></Masonry>
    </ResponsiveMasonry>
    <PerformanceDetailModal
      isOpen={open}
      setOpen={setOpen}
      performance={clickedPerformance}
    />
  </>;
}

export default FestivalBoard;
