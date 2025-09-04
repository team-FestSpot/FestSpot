package com.festspot.dev.service;

import com.festspot.dev.domain.post.Post;
import com.festspot.dev.domain.post.PostCommentMapper;
import com.festspot.dev.domain.post.PostLikeMapper;
import com.festspot.dev.domain.post.PostMapper;
import com.festspot.dev.domain.post.PostSearchOption;
import com.festspot.dev.domain.postCategory.PostCategory;
import com.festspot.dev.domain.postCategory.PostCategoryMapper;
import com.festspot.dev.domain.postImg.PostImg;
import com.festspot.dev.domain.postImg.PostImgMapper;
import com.festspot.dev.domain.user.UserMapper;
import com.festspot.dev.dto.post.PostCommentRespDto;
import com.festspot.dev.dto.post.PostDetailRespDto;
import com.festspot.dev.dto.post.PostRegisterReqDto;
import com.festspot.dev.dto.post.PostsRespDto;
import com.festspot.dev.exception.auth.NotLoginException;
import com.festspot.dev.security.model.PrincipalUtil;
import com.festspot.dev.util.ImageUrlUtil;
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
  private final PostCommentMapper postCommentMapper;
  private final PostCategoryMapper postCategoryMapper;
  private final PrincipalUtil principalUtil;
  private final PostImgMapper postImgMapper;
  private final UserMapper userMapper;
  private final FileService fileService;
  private final ImageUrlUtil imageUrlUtil;

  // 모든 게시글 가져오기
  public PostsRespDto getAllPosts(Integer page, Integer size) {
    PostSearchOption postSearchOption = PostSearchOption.builder()
        .startIndex((page - 1) * size + 1)
        .endIndex((page - 1) * size + size)
        .size(size)
        .userId(principalUtil.getUserIdOrNull())
        .build();

    return PostsRespDto.builder()
        .postList(
            postMapper.findAll(postSearchOption).stream().map(post -> post.toRespDto(imageUrlUtil))
                .toList())
        .totalPage(
            (int) Math.ceil(postMapper.countAll(postSearchOption) / postSearchOption.getSize()))
        .size(postSearchOption.getSize())
        .build();

  }

  // 카테고리별 게시글 가져오기
  public PostsRespDto getPostsByCategory(Integer page, Integer size, String boardKey) {
    PostSearchOption postSearchOption = PostSearchOption.builder()
        .startIndex((page - 1) * size + 1)
        .endIndex((page - 1) * size + size)
        .size(size)
        .categoryId(postCategoryMapper.findeByCategoryKey(boardKey).getPostCategoryId())
        .userId(principalUtil.getUserIdOrNull())
        .build();

    return PostsRespDto.builder()
        .postList(postMapper.findByCategoryId(postSearchOption).stream()
            .map(post -> post.toRespDto(imageUrlUtil)).toList())
        .totalPage((int) Math.ceil(
            postMapper.countByCategoryId(postSearchOption) / postSearchOption.getSize()))
        .size(postSearchOption.getSize())
        .build();
  }

  public List<PostCategory> getPostCategory() {
    return postCategoryMapper.findAll();
  }

  // 조회수 증가
  public void increaseViewCount(Integer postId) {
    int updated = postMapper.increaseViewCount(postId);
    if (updated == 0) {
      throw new IllegalArgumentException(postId + "의 게시글을 찾을 수 없습니다.");
    }
  }

  @Transactional(rollbackFor = Exception.class)
  public String register(PostRegisterReqDto dto) {
    if (principalUtil.getUserIdOrNull() == null) {
      throw new NotLoginException("NotLoginException", "로그인 정보 없음");
    }

    Post post = dto.toPost(
        principalUtil.getPrincipal().getUser(),
        postCategoryMapper.findeByCategoryKey(dto.getBoardKey()).getPostCategoryId()
    );

    postMapper.insert(post);

    if (dto.getFiles() != null) {
      List<String> filePaths = dto.getFiles().stream()
          .map(file -> fileService.uploadFile(file, "post")).toList();

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

  // 특정 글 클릭해서 보기 (본문)
  public PostDetailRespDto getPost(Integer postId) {
    Integer userId = principalUtil.getUserIdOrNull();
    return postMapper.findById(postId, userId).toRespDto(imageUrlUtil);
  }

  public List<PostCommentRespDto> getPostComment(Integer postId) {
    Integer userId = principalUtil.getUserIdOrNull();
    return postCommentMapper.findById(postId, userId).stream()
        .map(postComment -> postComment.toRespDto(imageUrlUtil)).toList();
  }

  public int postLike(Integer postId) {
    Integer userId = principalUtil.getUserIdOrNull();
    if (userId == null) {
      throw new NotLoginException("NotLoginException", "로그인 정보 없음");
    }
    return postLikeMapper.insert(postId, userId);
  }

  public int postDislike(Integer postId) {
    Integer userId = principalUtil.getUserIdOrNull();
    if (userId == null) {
      throw new NotLoginException("NotLoginException", "로그인 정보 없음");
    }
    return postLikeMapper.delete(postId, userId);
  }
}
