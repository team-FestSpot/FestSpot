import { PAGE_SIZE } from "../constants/boardPageSize";
import api from "./axios";

// 목록의 게시글
export const reqAllPosts = async (page) =>
  await api.get(`/api/board`, {
    params: { page, size: PAGE_SIZE },
  });

export const reqPosts = async (boardKey, page) =>
  await api.get(`/api/board/${boardKey}`, {
    params: { page: page, size: PAGE_SIZE },
  });

// 상세 게시글
export const reqPostDetail = async (boardKey, postId) =>
  await api.get(`/api/board/${boardKey}/${postId}`);

export const reqPostCategory = () => api.get(`/api/board/category`);

export const reqPostRegister = (data) =>
  api.post(`/api/board/${data.boardKey}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const reqPostLike = async (postId) =>
  await api.post(`/api/board/${postId}/like`);

export const reqPostDislike = async (postId) =>
  await api.delete(`/api/board/${postId}/dislike`);

// 좋아요
export const reqToggleLike = async ({ boardKey, postId }) =>
  await api.post(`/api/board/${boardKey}/${postId}/like`);

//댓글
export const reqCommentsList = async (boardKey, postId) =>
  await api.get(`/api/board/${boardKey}/${postId}/comments`);
export const reqAddComment = async ({
  boardKey,
  postId,
  commentContent,
  commentLevel,
}) => {
  await api.post(`/api/board/${boardKey}/${postId}/comments`, {
    commentContent,
    commentLevel,
  });
};

export const reqUpdateComment = async ({boardKey, postId, postCommentId, commentContent}) =>
  api.put(`/api/board/${boardKey}/${postId}/comments/${postCommentId}`, {commentContent});

export const reqDeleteComment = async ({boardKey, postId, postCommentId}) =>
  await api.delete(
    `/api/board/${boardKey}/${postId}/comments/${postCommentId}`
  );
