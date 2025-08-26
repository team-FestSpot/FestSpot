/** @jsxImportSource @emotion/react */
import { useLocation, useSearchParams } from "react-router-dom";
import * as s from "./styles";
import React, { useEffect, useState } from "react";
import {
  MdMessage,
  MdOutlineRateReview,
  MdOutlineFestival,
} from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ReactPaginate from "react-paginate";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useAllPostsQuery } from "../../../../querys/post/useAllPostsQuery";
import { usePostsQuery } from "../../../../querys/post/usePostsQuery";

function FestivalBoard(props) {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [postList, setPostList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  // 페이지 기본 설정 : 1
  useEffect(() => {
    if (!searchParams.get("page")) {
      setSearchParams({ page: 1 });
    }
  }, [searchParams]);

  // 카테고리, 페이지 넘버 가져오기
  const boardKey = location.pathname.slice(7);
  const page = parseInt(searchParams.get("page")) || 1;

  let response;
  if (!!boardKey) {
    const postsQuery = usePostsQuery(boardKey, page);
    response = postsQuery.data?.data?.body;
  } else {
    const postsQuery = useAllPostsQuery(page);
    response = postsQuery.data?.data?.body;
  }

  //게시글 리스트와 총 페이지 수 상태에 저장
  useEffect(() => {
    if (!!response) {
      setPostList(response.postList);
      setTotalPage(response.totalPage);
    }
  }, [response]);

  return (
    <>
      {!!postList && postList.map((post) => <Card>{post.postTitle}</Card>)}
      <ReactPaginate
        previousLabel={"이전"}
        nextLabel={"다음"}
        breakLabel={"..."}
        pageCount={!!totalPage && totalPage}
      />
    </>
  );
}

export default FestivalBoard;
