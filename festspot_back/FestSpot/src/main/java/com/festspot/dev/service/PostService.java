package com.festspot.dev.service;

import com.festspot.dev.domain.post.Post;
import com.festspot.dev.domain.post.PostLikeMapper;
import com.festspot.dev.domain.post.PostMapper;
import com.festspot.dev.domain.post.PostSearchOption;
import com.festspot.dev.domain.postCategory.PostCategory;
import com.festspot.dev.domain.postCategory.PostCategoryMapper;
import com.festspot.dev.domain.postImg.PostImg;
import com.festspot.dev.domain.postImg.PostImgMapper;
import com.festspot.dev.domain.user.UserMapper;
import com.festspot.dev.dto.post.PostDetailRespDto;
import com.festspot.dev.dto.post.PostRegisterReqDto;
import com.festspot.dev.dto.post.PostsRespDto;
import com.festspot.dev.security.model.PrincipalUtil;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
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
  private final PostImgMapper postImgMapper;
  private final UserMapper userMapper;
  private final FileService fileService;

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

  public List<PostCategory> getPostCategory() {
    return postCategoryMapper.findAll();
  }

  // 게시글 가져오기
  @Transactional(readOnly = true)
  public PostDetailRespDto getPost(Integer postId) {
    Integer currentUserId = principalUtil.getUserIdOrNull();
    Post post = postMapper.findByPostId(postId, currentUserId);

    if (post == null) {
      return null;
    }

    return post.toRespDto(userMapper.findByUserId(post.getUserId()),
        postImgMapper.findByPostId(postId));
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

  @Transactional(rollbackFor = Exception.class)
  public String register(PostRegisterReqDto dto) {

    Post post = dto.toPost(
        principalUtil.getPrincipal().getUser(),
        postCategoryMapper.findeByCategoryKey(dto.getBoardKey()).getPostCategoryId()
    );

    if (dto.getFiles() != null) {

      List<String> filePaths = dto.getFiles().stream()
          .map(file -> fileService.uploadFile(file, "post")).toList();
      postMapper.insert(post);

      AtomicInteger atomicInteger = new AtomicInteger(0);
      List<PostImg> postImgs = filePaths.stream().map(filePath -> PostImg.builder()
          .postId(post.getPostId())
          .postImgUrl(filePath)
          .seq(atomicInteger.getAndIncrement() + 1)
          .build()).toList();

      postImgMapper.insert(postImgs);
    }

    return "게시글 등록 완료";
  }

}
