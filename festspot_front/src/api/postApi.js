import { options } from "@fullcalendar/core/preact.js";
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

export const reqPostPageNum = async (postId, postCategoryId) =>
  await api.get(`/api/board/${postId}/posts`, {
    params: {
      postCategoryId: postCategoryId,
      size: PAGE_SIZE,
    },
  });

export const reqPostCategory = () => api.get(`/api/board/category`);

export const reqPostRegister = (data) =>
  api.post(`/api/board/${data.boardKey}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const reqPostUpdate = ({ postId }) =>
  api.put(`/api/board/${postId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const reqPostDelete = ({ postId }) => api.delete(`/api/board/${postId}`);

export const reqPostLike = async (postId) =>
  await api.post(`/api/board/${postId}/like`);

export const reqPostDislike = async (postId) =>
  await api.delete(`/api/board/${postId}/dislike`);
