import api from "./axios";

// 게시판 관련 API 함수들

// 게시판별 게시글 목록 조회 (메인 화면용)
export const reqGetPosts = async ({ categoryId, page, size }) =>
  await api.get(`/api/posts`, {
    params: {
      categoryId, // post_category_id (1: 자유, 2: 후기, 3: 양도, 4: 소규모축제)
      page,
      size,
    },
  });

// 게시글 상세 조회 (내용, 이미지, 댓글 포함)
export const reqGetPost = async (postId) =>
  await api.get(`/api/posts/${postId}`);

// 게시글 작성
export const reqCreatePost = async (data) =>
  await api.post("/api/posts", data, {
    headers: {
      "Content-Type": "multipart/form-data", // 이미지 업로드 포함
    },
  });

// 게시글 수정
export const reqUpdatePost = async ({ postId, data }) =>
  await api.put(`/api/posts/${postId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// 게시글 삭제
export const reqDeletePost = async (postId) =>
  await api.delete(`/api/posts/${postId}`);

// 게시글 검색
export const reqSearchPosts = async ({
  categoryId,
  page,
  size,
  searchText,
  searchType = "title",
}) =>
  await api.get("/api/posts/search", {
    params: {
      categoryId,
      page,
      size,
      searchText,
      searchType, // title, content, author
    },
  });

// 다중 이미지 업로드 (최대 10장)
export const reqUploadImages = async (formData) =>
  await api.post("/api/upload/images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// 이미지 삭제
export const reqDeleteImage = async (imageId) =>
  await api.delete(`/api/posts/images/${imageId}`);

// 조회수 증가
export const reqIncreaseViewCount = async (postId) =>
  await api.patch(`/api/posts/${postId}/view`);

// 게시글 좋아요/취소
export const reqToggleLike = async (postId) =>
  await api.post(`/api/posts/${postId}/like`);

// 댓글 목록 조회
export const reqGetComments = async ({ postId, page, size }) =>
  await api.get(`/api/posts/${postId}/comments`, {
    params: {
      page,
      size,
    },
  });

// 댓글 작성
export const reqCreateComment = async ({ postId, data }) =>
  await api.post(`/api/posts/${postId}/comments`, data);

// 댓글 수정
export const reqUpdateComment = async ({ commentId, data }) =>
  await api.put(`/api/comments/${commentId}`, data);

// 댓글 삭제
export const reqDeleteComment = async (commentId) =>
  await api.delete(`/api/comments/${commentId}`);

// 대댓글 작성
export const reqCreateReply = async ({ commentId, data }) =>
  await api.post(`/api/comments/${commentId}/replies`, data);

// 인기 게시글 조회
export const reqGetPopularPosts = async ({ categoryId, limit = 5 }) =>
  await api.get("/api/posts/popular", {
    params: {
      categoryId,
      limit,
    },
  });

// 최신 게시글 조회
export const reqGetRecentPosts = async ({ categoryId, limit = 10 }) =>
  await api.get("/api/posts/recent", {
    params: {
      categoryId,
      limit,
    },
  });

// 내가 작성한 게시글 조회
export const reqGetMyPosts = async ({ page, size }) =>
  await api.get("/api/user/posts", {
    params: {
      page,
      size,
    },
  });

/*
=== DB 테이블 구조 (현재) ===

1. post_tb (게시글 테이블)
- post_id (BIGINT, PK)                    : 게시글 ID
- original_poster_id (BIGINT)             : 작성자 ID  
- post_category_id (INT)                  : 카테고리 ID (1:자유, 2:후기, 3:양도, 4:소규모축제)
- post_title (VARCHAR(255))               : 제목
- post_content (TEXT)                     : 내용
- created_at (DATETIME)                   : 작성일

2. post_img_tb (게시글 이미지 테이블)
- post_img_id (BIGINT, PK)               : 이미지 ID
- post_id (BIGINT, FK)                   : 게시글 ID
- post_img_url (VARCHAR(255))            : 이미지 URL
- seq (INT)                              : 이미지 순서 (1번이 썸네일)

=== 추가 필요한 테이블들 ===

3. user_tb (사용자 테이블) - 이미 있을 것으로 예상
- user_id (BIGINT, PK)
- username (VARCHAR(50))
- email (VARCHAR(100))
- ...

4. post_view_tb (조회수 테이블) - 선택사항
- post_id (BIGINT, FK)
- user_id (BIGINT, FK) 
- viewed_at (DATETIME)

5. post_like_tb (좋아요 테이블) - 선택사항
- post_id (BIGINT, FK)
- user_id (BIGINT, FK)
- created_at (DATETIME)

6. comment_tb (댓글 테이블) - 선택사항
- comment_id (BIGINT, PK)
- post_id (BIGINT, FK)
- user_id (BIGINT, FK)
- comment_content (TEXT)
- parent_comment_id (BIGINT, FK) -- 대댓글용
- created_at (DATETIME)

=== 카테고리 ID 매핑 ===
1 = 자유 게시판 (free)
2 = 후기 게시판 (review) 
3 = 양도 게시판 (transfer)
4 = 소규모 축제 게시판 (small)
*/
