import api from "./axios";

// 목록의 게시글 
export const reqGetBoardPosts = (boardKey, pageParam) =>
  api.get(`/api/board/${boardKey}/posts`, {
    params: { page: pageParam, size: 20 },
  });

// 상세 게시글 
export const fetchPostDetail = (postId) => get(`/posts/${postId}`); 

// 파일 업로드 
export const createPostForm = async ({ boardKey, title, content, allowComments, files }) => {
  const formData = new FormData();
  formData.append("boardKey", boardKey);
  formData.append("title", title);
  formData.append("content", content);
  formData.append("allowComments", String(allowComments));
  (files || []).forEach(file => formData.append("images", file));

  const { data } = await api.post(`/api/post/form`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const createPostJson = ({ boardKey, title, content, allowComments, imageUrls }) =>
  api.post("/post/form", { boardKey, title, content, allowComments, imageUrls });