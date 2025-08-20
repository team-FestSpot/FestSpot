import api from "./axios";

export const fetchPostDetail = (postId) =>
  api.get(`/posts/${postId}`).then((res) => res.data);

// 조회수 +1
export const incrementPostView = (postId) =>
  api.patch(`/posts/${postId}/views`).then((res) => res.data);

// 좋아요 토글
export const likePost = (postId) =>
  api.post(`/posts/${postId}/likes`).then((res) => res.data);

export const unlikePost = (postId) =>
  api.delete(`/posts/${postId}/likes`).then((res) => res.data);

// 댓글
export const fetchComments = (postId) =>
  api.get(`/posts/${postId}/comments`).then((res) => res.data);

export const createComment = (postId, content) =>
  api.post(`/posts/${postId}/comments`, { content }).then((res) => res.data);