package com.festspot.dev.service;

import com.festspot.dev.domain.post.Post;
import com.festspot.dev.domain.post.PostLikeMapper;
import com.festspot.dev.domain.post.PostMapper;
import com.festspot.dev.domain.post.PostSearchOption;
import com.festspot.dev.domain.postCategory.PostCategoryMapper;
import com.festspot.dev.dto.post.PostDetailRespDto;
import com.festspot.dev.dto.post.PostsRespDto;
import com.festspot.dev.security.model.PrincipalUser;
import com.festspot.dev.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PostService {

  private final PostMapper postMapper;
  private final PostLikeMapper postLikeMapper;
  private final PostCategoryMapper postCategoryMapper;
  private final PrincipalUtil principalUtil;

  // 모든 게시글 가져오기
  public PostsRespDto getAllPosts(PostSearchOption postSearchOption) {
    return PostsRespDto.builder()
        .postList(postMapper.findAll(postSearchOption))
        .totalPage((int) Math.ceil(postMapper.countAll(postSearchOption)))
        .build();

  }

  // 카테고리별 게시글 가져오기
  public PostsRespDto getPostsByCategory(PostSearchOption postSearchOption, String boardKey) {
    postSearchOption.setCategoryId(
        postCategoryMapper.findeByCategoryKey(boardKey).getPostCategoryId());

    return PostsRespDto.builder()
        .postList(postMapper.findByCategoryId(postSearchOption))
        .totalPage((int) Math.ceil(postMapper.countByCategoryId(postSearchOption)))
        .build();
  }

  // 게시글 가져오기
  @Transactional(readOnly = true)
  public PostDetailRespDto getPost(Integer postId) {
    Integer currentUserId = principalUtil.getUserIdOrNull();
    Post post = postMapper.findByPostId(postId, currentUserId);

    if (post == null) {
      throw new IllegalArgumentException(postId + "의 게시글을 찾을 수 없습니다.");
    }

    Boolean isLike = (currentUserId == null) ? null : postLikeMapper.exist(postId, currentUserId);
    return PostDetailRespDto.toEntity(post, isLike);
  }

  // 조회수 증가
  public void increaseViewCount(Integer postId) {
    int updated = postMapper.increaseViewCount(postId);
    if (updated == 0) {
      throw new IllegalArgumentException(postId + "의 게시글을 찾을 수 없습니다.");
    }
  }

  // 좋아요
  public void like(Integer postId) {
    Integer userId = principalUtil.getPrincipal().getUser().getUserId();
    postLikeMapper.insert(postId, userId);
  }

  // 좋아요 취소
  public void disLike(Integer postId) {
    Integer userId = principalUtil.getPrincipal().getUser().getUserId();
    postLikeMapper.delete(postId, userId);
  }

}
