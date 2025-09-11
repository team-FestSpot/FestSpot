/** @jsxImportSource @emotion/react */
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import * as s from "./styles";
import React, { use, useEffect, useState } from "react";
import { usePostsQuery } from "../../../querys/post/usePostsQuery";
import PaginationBar from "../../PaginationBar/PaginationBar";
import { LOGO_IMG_PATH } from "../../../constants/logoImgPath";

function PostListTable({ boardKey, postPageNum }) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [searchParams, setSerachParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("page") || searchParams.get("page") !== postPageNum) {
      setSerachParams({ page: postPageNum });
    }
  }, []);

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!!searchParams.get("page")) {
      setPage(Number(searchParams.get("page")));
    }
  }, [searchParams.get("page")]);

  const postsQuery = usePostsQuery({ boardKey, page });
  const postsInfo = postsQuery.data?.data?.body;
  const posts = postsInfo?.postList;

  const handlePostOnClick = (postId) => {
    const currentPost = pathname.split("/")[3];
    if (postId == currentPost) return;
    navigate(`/board/${boardKey}/${postId}`);
  };

  return (
    <>
      {!!posts && (
        <div css={s.listTableLayout}>
          <div css={s.tableContainer}>
            {posts.map((post) => (
              <React.Fragment key={post.postId}>
                <div
                  css={s.post}
                  onClick={() => handlePostOnClick(post.postId)}
                >
                  <div css={s.imgContainer}>
                    {!!post.postImgs.length ? (
                      <img src={post.postImgs[0].postImgUrl} alt="" />
                    ) : (
                      <img src={LOGO_IMG_PATH} alt="" />
                    )}
                  </div>
                  <div css={s.rightSection}>
                    <div css={s.title}>{post.postTitle}</div>
                    <div css={s.nickName}>{post.user.userNickName}</div>
                    <div css={s.time}>
                      {!!post.updatedAt ? (
                        <>
                          {new Date(post.updatedAt).toLocaleDateString()}
                          {new Date(post.updatedAt).toLocaleTimeString()}
                          <div>{"(수정됨)"}</div>
                        </>
                      ) : (
                        <>
                          {new Date(post.createdAt).toLocaleDateString()}
                          {new Date(post.createdAt).toLocaleTimeString()}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div css={s.paginationContainer}>
            <PaginationBar
              searchParams={searchParams}
              setSearchParams={setSerachParams}
              totalPage={postsInfo.totalPage}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default PostListTable;
