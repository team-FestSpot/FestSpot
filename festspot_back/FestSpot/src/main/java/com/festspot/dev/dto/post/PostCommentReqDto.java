package com.festspot.dev.dto.post;

import com.festspot.dev.domain.post.PostComment;
import lombok.Data;

@Data
public class PostCommentReqDto {

  private Integer postId;
  private Integer postCommentId;
  private String commentContent;
  private Integer parentCommentId;

  public PostComment toPostComment(Integer postId, Integer userId) {
    return PostComment.builder()
        .postId(postId)
        .userId(userId)
        .commentContent(commentContent)
        .parentCommentId(parentCommentId)
        .build();
  }
}
