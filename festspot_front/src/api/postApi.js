import { PAGE_SIZE } from "../constants/BoardContext";
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
export const reqPostDetail = (boardKey, postId) =>
  get(`/api/board/${boardKey}/${postId}`);
