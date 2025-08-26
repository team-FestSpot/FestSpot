package com.festspot.dev.service;

import com.festspot.dev.domain.post.Post;
import com.festspot.dev.domain.post.PostMapper;
import com.festspot.dev.domain.post.PostSearchOption;
import com.festspot.dev.domain.postCategory.PostCategoryMapper;
import com.festspot.dev.dto.post.PostsRespDto;
import com.festspot.dev.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostService {

  private final PostMapper postMapper;
  private final PostCategoryMapper postCategoryMapper;
  private final PrincipalUtil principalUtil;

  public PostsRespDto getAllPosts(PostSearchOption postSearchOption) {
    return PostsRespDto.builder()
        .postList(postMapper.findAll(postSearchOption))
        .totalPage((int) Math.ceil(postMapper.countAll(postSearchOption)))
        .build();

  }

  public PostsRespDto getPostsByCategory(PostSearchOption postSearchOption, String boardKey) {
    postSearchOption.setCategoryId(
        postCategoryMapper.findeByCategoryKey(boardKey).getPostCategoryId());

    return PostsRespDto.builder()
        .postList(postMapper.findByCategoryId(postSearchOption))
        .totalPage((int) Math.ceil(postMapper.countByCategoryId(postSearchOption)))
        .build();
  }

  public Post getPost(Integer postId) {
    Integer userId = principalUtil.getUserIdOrNull();
    return postMapper.findByPostId(postId, userId);
  }

}
