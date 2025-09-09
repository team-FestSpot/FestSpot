/** @jsxImportSource @emotion/react */
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import * as s from "./styles";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { useAllPostsQuery } from "../../../../querys/post/useAllPostsQuery";
import { usePostsQuery } from "../../../../querys/post/usePostsQuery";
import PaginationBar from "../../../../components/PaginationBar/PaginationBar";
import { FaHeart, FaRegHeart, FaRegEye, FaPlus } from "react-icons/fa";
import { reqPostDislike, reqPostLike } from "../../../../api/postApi";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { css, Global } from "@emotion/react";
import usePrincipalQuery from "../../../../querys/auth/usePrincipalQuery";

function FestivalBoard(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const queryClient = useQueryClient();
  const principalQuery = usePrincipalQuery();
  const userInfo = principalQuery.data?.data?.body?.user;
  const [searchParams, setSearchParams] = useSearchParams();

  // 페이지 기본 설정 : 1
  useEffect(() => {
    if (!searchParams.get("page")) {
      setSearchParams({ page: 1 });
    }
  }, [searchParams]);

  // 카테고리, 페이지 넘버 가져오기
  const boardKey = location.pathname.slice(7);
  const page = parseInt(searchParams.get("page")) || 1;

  const postsQuery = usePostsQuery({ boardKey, page });
  const posts = postsQuery.data?.data?.body || [];

  //게시글 리스트와 총 페이지 수 상태에 저장
  useEffect(() => {
    if (!!posts) {
      setPostList(posts.postList);
      setTotalPage(posts.totalPage);
    }
  }, [posts]);

  const handleLikeOnClick = async (e, postId) => {
    try {
      await reqPostLike(postId);

      //좋아요 수 증가
      queryClient.setQueryData(["posts", boardKey, page], (prev) => ({
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
      }));
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: error.response.data.body,
        text: error.response.data.message,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  const handleDislikeOnClick = async (e, postId) => {
    try {
      await reqPostDislike(postId);

      //좋아요 수 감소
      queryClient.setQueryData(["posts", boardKey, page], (prev) => ({
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
      }));
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: error.response.data.body,
        text: error.response.data.message,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  const handleCardOnClick = (postId, postCategoryKey) => {
    //조회수 증가
    queryClient.setQueryData(["posts", boardKey, page], (prev) => ({
      ...prev,
      data: {
        ...prev.data,
        body: {
          ...prev.data.body,
          postList: prev.data.body.postList.map((post) => {
            if (post.postId === postId) {
              return {
                ...post,
                viewCount: post.viewCount + 1,
              };
            }
            return post;
          }),
        },
      },
    }));
    navigate(`/board/${postCategoryKey}/${postId}`);
  };

  const handleWriteOnClick = (e) => {
    !!boardKey
      ? navigate(`/board/write?boardKey=${boardKey}`)
      : navigate(`/board/write`);
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
      {!!postList && !!posts && (
        <div css={s.boardLayout}>
          {!!postList.length ? (
            <div css={s.postContainer}>
              {postList.map((post, idx) => (
                <Card
                  key={idx}
                  onClick={() =>
                    handleCardOnClick(
                      post.postId,
                      post.postCategory.postCategoryKey
                    )
                  }
                >
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
                          )}
                          {post.likeCount}
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
          {!!userInfo && (
            <div css={s.writeButton} onClick={handleWriteOnClick}>
              <FaPlus />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default FestivalBoard;
