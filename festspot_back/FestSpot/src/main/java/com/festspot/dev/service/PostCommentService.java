package com.festspot.dev.service;

import com.festspot.dev.domain.post.PostComment;
import com.festspot.dev.domain.post.PostCommentMapper;
import com.festspot.dev.dto.post.PostCommentReqDto;
import com.festspot.dev.dto.post.PostCommentRespDto;
import com.festspot.dev.security.model.PrincipalUtil;
import com.festspot.dev.util.ImageUrlUtil;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostCommentService {

  private final PrincipalUtil principalUtil;
  private final PostCommentMapper postCommentMapper;
  private final ImageUrlUtil imageUrlUtil;

  public List<PostCommentRespDto> getPostComment(Integer postId) {
    Integer userId = principalUtil.getUserIdOrNull();
    return postCommentMapper.findByPostId(postId, userId).stream()
        .map(postComment -> postComment.toRespDto(imageUrlUtil)).toList();
  }

  public int postCommentRegister(PostCommentReqDto dto, Integer postId) {
    Integer userId = principalUtil.getUserIdOrNull();
    return postCommentMapper.insert(dto.toPostComment(postId, userId));
  }

  public int update(PostCommentReqDto dto, Integer postCommentId) {
    PostComment postComment = postCommentMapper.findById(postCommentId);
    postComment.setCommentContent(dto.getCommentContent());
    return postCommentMapper.update(postComment);
  }

  public int delete(Integer postCommentId) {
    return postCommentMapper.softDelete(postCommentId);
  }
}
