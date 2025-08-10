import api from "./axios";

export const reqGetBoardPosts = (boardKey, pageParam) =>
  api.get(`/api/board/${boardKey}/posts`, {
    params: { page: pageParam, size: 20 },
  });