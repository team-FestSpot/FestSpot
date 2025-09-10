/** @jsxImportSource @emotion/react */
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import * as s from "./styles";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import PaginationBar from "../../../components/PaginationBar/PaginationBar";
import { FaHeart, FaRegHeart, FaRegEye } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import { css, Global } from "@emotion/react";
import { usePerformanceListQuery } from "../../../querys/performance/usePerformanceListQuery";
import { PAGE_SIZE } from "../../../constants/performancePageSize";

function FestivalBoard(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [performanceList, setPerformanceList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page"));

  const [sortOption, setSortOption] = useState("default");

  // 페이지 기본 설정 : 1
  useEffect(() => {
    if (!searchParams.get("page")) {
      setSearchParams({ page: 1 });
    }
  }, [searchParams]);

  // 카테고리, 페이지 넘버 가져오기
  const performanceCategory = location.pathname.slice(13);
  const page = parseInt(searchParams.get("page")) || 1;

  const performanceListQuery = usePerformanceListQuery();
  const performances = performanceListQuery?.data?.data?.body || [];

  //게시글 리스트와 총 페이지 수 상태에 저장
  useEffect(() => {
    if (!!performances) {
      let filteredPerformances = [];
      if (performanceCategory === "all") {
        filteredPerformances = performances;
      } else if (performanceCategory === "concert") {
        filteredPerformances = performances.filter(
          (performance) => !performance.isForeign && !performance.isFestival
        );
      } else if (performanceCategory === "festival") {
        filteredPerformances = performances.filter(
          (performance) => !performance.isForeign && !!performance.isFestival
        );
      } else if (performanceCategory === "visit") {
        filteredPerformances = performances.filter(
          (performance) => !!performance.isForeign && !performance.isFestival
        );
      }
      setPerformanceList(filteredPerformances);
      setTotalPage(Math.ceil(filteredPerformances.length / PAGE_SIZE));
    }
  }, [performances, performanceCategory]);

  // const handleLikeOnClick = async (e, postId) => {
  //   try {
  //     await reqPostLike(postId);

  //     //좋아요 수 증가
  //     queryClient.setQueryData(["posts", boardKey, page], (prev) => ({
  //       ...prev,
  //       data: {
  //         ...prev.data,
  //         body: {
  //           ...prev.data.body,
  //           postList: prev.data.body.postList.map((post) => {
  //             if (post.postId === postId) {
  //               return {
  //                 ...post,
  //                 likeCount: post.likeCount + 1,
  //                 isLike: true,
  //               };
  //             }
  //             return post;
  //           }),
  //         },
  //       },
  //     }));
  //   } catch (error) {
  //     await Swal.fire({
  //       icon: "error",
  //       title: error.response.data.body,
  //       text: error.response.data.message,
  //       timer: 2000,
  //       timerProgressBar: true,
  //     });
  //   }
  // };

  // const handleDislikeOnClick = async (e, postId) => {
  //   try {
  //     await reqPostDislike(postId);

  //     //좋아요 수 감소
  //     queryClient.setQueryData(["posts", boardKey, page], (prev) => ({
  //       ...prev,
  //       data: {
  //         ...prev.data,
  //         body: {
  //           ...prev.data.body,
  //           postList: prev.data.body.postList.map((post) => {
  //             if (post.postId === postId) {
  //               return {
  //                 ...post,
  //                 likeCount: post.likeCount - 1,
  //                 isLike: false,
  //               };
  //             }
  //             return post;
  //           }),
  //         },
  //       },
  //     }));
  //   } catch (error) {
  //     await Swal.fire({
  //       icon: "error",
  //       title: error.response.data.body,
  //       text: error.response.data.message,
  //       timer: 2000,
  //       timerProgressBar: true,
  //     });
  //   }
  // };

  const handleCardOnClick = (performanceId) => {
    //조회수 증가
    // queryClient.setQueryData(["posts", boardKey, page], (prev) => ({
    //   ...prev,
    //   data: {
    //     ...prev.data,
    //     body: {
    //       ...prev.data.body,
    //       postList: prev.data.body.postList.map((post) => {
    //         if (post.postId === postId) {
    //           return {
    //             ...post,
    //             viewCount: post.viewCount + 1,
    //           };
    //         }
    //         return post;
    //       }),
    //     },
    //   },
    // }));
    navigate(`/performance/feed?performanceId=${performanceId}`);
  };

  return (
    <>
      <Global
        styles={css`
          .swal2-modal {
            font-size: 12px;
          }
        `}
      />
      {!!performanceList && !!performances && (
        <div css={s.boardLayout}>
          {!!performanceList.length ? (
            <div css={s.postContainer}>
              {performanceList
                .slice((pageParam - 1) * PAGE_SIZE, pageParam * PAGE_SIZE)
                .map((performance, idx) => (
                  <Card
                    key={idx}
                    onClick={
                      () => handleCardOnClick(performance.performanceId)
                      // post.postId,
                      // post.postCategory.postCategoryKey
                    }
                  >
                    <div css={s.imageContainer}>
                      {!!performance.performancePosterUrl && (
                        <img
                          src={performance.performancePosterUrl}
                          alt="게시글 이미지"
                        />
                      )}
                    </div>
                    <div css={s.contentBox}>
                      <div css={s.titleContainer}>
                        {performance.performanceTitle}
                      </div>
                      <div css={s.contentContainer}>
                        <div css={s.countContainer}>
                          <div>
                            <FaRegEye />
                            {/* {post.viewCount} */}
                          </div>
                          <div>
                            {/* {!!post.isLike ? (
                            <FaHeart
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDislikeOnClick(e, post.postId);
                              }}
                              style={{ color: "red" }}
                            />
                          ) : (
                            <FaRegHeart
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLikeOnClick(e, post.postId);
                              }}
                            />
                          )} */}
                            {/* {post.likeCount} */}
                            <FaRegHeart
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLikeOnClick(e, performance.performanceId);
                              }}
                            />
                            <p>0</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          ) : (
            <div css={s.notFound}>게시물이 없습니다.</div>
          )}
          <div css={s.paginationContainer}>
            <PaginationBar
              totalPage={totalPage}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default FestivalBoard;
