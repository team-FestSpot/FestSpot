import React from "react";
import { Route, Routes } from "react-router-dom";
import PostWrite from "../page/Auth/post/PostWrite";
import FestivalBoard from "../page/Auth/Post/Board/FestivalBoard";
import usePostCategoryQuery from "../querys/post/usePostCategoryQuery";
import PostDetail from "../page/Auth/Post/PostDetail/PostDetail";

function CommunityBoardRouter(props) {
  const postCategoryQuery = usePostCategoryQuery();
  const boardKeys =
    postCategoryQuery?.data?.data?.body.map(
      (postCategory) => postCategory.postCategoryKey
    ) || [];

  return (
    <>
      {postCategoryQuery.isFetched && (
        <Routes>
          <Route path="/write" element={<PostWrite />} />
          {boardKeys.map((boardKey) => (
            <>
              <Route path={`/${boardKey}`} element={<FestivalBoard />} />
              <Route path={`/${boardKey}/:id`} element={<PostDetail />} />
            </>
          ))}
          <Route path={"all"} element={<FestivalBoard />} />
        </Routes>
      )}
    </>
  );
}

export default CommunityBoardRouter;
