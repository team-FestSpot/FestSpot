import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import PostWrite from "../page/Auth/post/PostWrite";
import FestivalBoard from "../page/Auth/Post/Board/FestivalBoard";
import PostDetail from "../page/Auth/post/PostDetail/PostDetail";
import usePostCategoryQuery from "../querys/post/usePostCategoryQuery";

function CommunityBoardRouter(props) {
  const pathname = useLocation().pathname;
  const postCategoryQuery = usePostCategoryQuery();
  const boardKeys =
    postCategoryQuery?.data?.data?.body.map(
      (postCategory) => postCategory.postCategoryKey
    ) || [];

  const currentBoardKey = pathname.slice(7).split("/")[0];

  return (
    <>
      {postCategoryQuery.isFetched && (
        <Routes>
          <Route path="/write" element={<PostWrite />} />
          {boardKeys.includes(currentBoardKey) && (
            <Route
              path={`/${currentBoardKey}/:postId`}
              element={<PostDetail />}
            />
          )}
          <Route path="/*" element={<FestivalBoard />} />
        </Routes>
      )}
    </>
  );
}

export default CommunityBoardRouter;
