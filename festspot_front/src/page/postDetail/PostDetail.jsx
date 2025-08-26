/** @jsxImportSource @emotion/react */
import { useQueryClient } from "@tanstack/react-query";
import * as s from "./styles";
import React, { useState } from "react";
import { usePostsQuery } from "../../querys/post/usePostsQuery";

function PostDetail(props) {
  const postDetailQuery = usePostsQuery();
  const postContent = postDetailQuery.data?.data?.body;

  console.log(postContent.commentCount);

  return (
    <div>
      <span>{postContent.commentCount}</span>
    </div>
  );
}

export default PostDetail;
