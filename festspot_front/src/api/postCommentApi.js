import api from "./axios";

//댓글
export const reqPostComments = async (postId) =>
  await api.get(`/api/board/comments/${postId}`);

export const reqCommentRegister = async ({
  postId,
  commentContent,
  parentCommentId,
}) => {
  console.log(postId, commentContent, parentCommentId);
  await api.post(`/api/board/comments/${postId}`, {
    commentContent,
    parentCommentId,
  });
};

export const reqCommentUpdate = async ({
  postId,
  commentContent,
  postCommentId,
}) =>
  api.put(`/api/board/comments//${postId}/${postCommentId}`, {
    commentContent,
  });

export const reqCommentDelete = async ({ postId, postCommentId }) =>
  await api.delete(`/api/board/comments//${postId}/${postCommentId}`);
