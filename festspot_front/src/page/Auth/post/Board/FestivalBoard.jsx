/** @jsxImportSource @emotion/react */
import { useLocation, useSearchParams } from "react-router-dom";
import * as s from "./styles";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { useAllPostsQuery } from "../../../../querys/post/useAllPostsQuery";
import { usePostsQuery } from "../../../../querys/post/usePostsQuery";
import PaginationBar from "../../../../components/PaginationBar/PaginationBar";
import { FaHeart, FaRegHeart, FaRegEye } from "react-icons/fa";
import { reqPostDislike, reqPostLike } from "../../../../api/postApi";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { style } from "@mui/system";

function FestivalBoard(props) {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [postList, setPostList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const queryClient = useQueryClient();

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

    console.log(response);
  }, [response]);

  const handleCardOnClick = (e) => {};

  const handleLikeOnClick = (postId) => {
    try {
      reqPostLike(postId);

      if (!!boardKey) {
      } else {
        queryClient.setQueryData(["posts", page], (prev) => {
          console.log(prev);
          return {
            ...prev,
            data: {
              ...prev.data,
              body: {
                ...prev.data.body,
                postList: prev.data.body.postList.map((post) => {
                  if (post.postId === postId) {
                    return {
                      ...post,
                      likeCount: post.likeCount + 1,
                      isLike: true,
                    };
                  }
                  return post;
                }),
              },
            },
          };
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(response);

  const handleDislikeOnClick = (postId) => {
    try {
      reqPostDislike(postId);

      if (!!boardKey) {
      } else {
        queryClient.setQueryData(["posts", page], (prev) => {
          console.log(prev);
          return {
            ...prev,
            data: {
              ...prev.data,
              body: {
                ...prev.data.body,
                postList: prev.data.body.postList.map((post) => {
                  if (post.postId === postId) {
                    return {
                      ...post,
                      likeCount: post.likeCount - 1,
                      isLike: false,
                    };
                  }
                  return post;
                }),
              },
            },
          };
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!!postList && !!response && (
        <div css={s.boardLayout}>
          <div css={s.postContainer}>
            {postList.map((post, idx) => (
              <Card key={idx} onClick={handleCardOnClick}>
                <div css={s.imageContainer}>
                  {!!post.postImgs[0] && (
                    <img
                      src={post.postImgs[0].postImgUrl}
                      alt="게시글 이미지"
                    />
                  )}
                </div>
                <div css={s.contentBox}>
                  <div css={s.titleContainer}>{post.postTitle}</div>
                  <div css={s.contentContainer}>
                    <div css={s.userContainer}>
                      <div css={s.profileImgContainer}>
                        <img src={post.user.userProfileImgUrl} />
                      </div>
                      <div>{post.user.userNickName}</div>
                    </div>
                    <div css={s.countContainer}>
                      <div>
                        <FaRegEye />
                        {post.viewCount}
                      </div>
                      <div>
                        {!!post.isLike ? (
                          <FaHeart
                            onClick={() => handleDislikeOnClick(post.postId)}
                            style={{ color: "red" }}
                          />
                        ) : (
                          <FaRegHeart
                            onClick={() => handleLikeOnClick(post.postId)}
                          />
                        )}
                        {post.likeCount}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
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
