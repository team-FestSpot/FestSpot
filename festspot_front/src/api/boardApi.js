import api from "./axios";

// 목록의 게시글
export const reqGetBoardPosts = (boardKey, pageParam) =>
  api.get(`/api/board/${boardKey}/posts`, {
    params: { page: pageParam, size: 20 },
  });

// 상세 게시글
export const fetchPostDetail = (postId) => get(`/posts/${postId}`);

// 파일 업로드
export const createPostReq = async ({ data }) => api.post("/api/post", data);
