import React from "react";
import { Route, Routes } from "react-router-dom";
import PostWrite from "../page/Auth/post/PostWrite/PostWrite";
import PostEdit from "../page/Auth/post/PostEdit/PostEdit";
import PostDetail from "../page/Auth/post/PostDetail/PostDetail";
import usePostCategoryQuery from "../querys/post/usePostCategoryQuery";
import FestivalBoard from "../page/Auth/post/Board/FestivalBoard";

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
          <Route path="/edit/:id" element={<PostEdit />} />
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
