package com.festspot.dev.domain.post;

import com.festspot.dev.domain.user.User;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostComment {

  private Integer postCommentId;
  private Integer postId;
  private Integer userId;
  private String commentContent;
  private Integer likeCount;
  private Integer commentLevel;
  private LocalDateTime createdAt;
  private Integer parentCommentId;
  private LocalDateTime deletedAt;
  private LocalDateTime updatedAt;

  private User user;
}
