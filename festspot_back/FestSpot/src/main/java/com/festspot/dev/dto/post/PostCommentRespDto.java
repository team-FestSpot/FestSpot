package com.festspot.dev.dto.post;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostCommentRespDto {

  private Integer postCommentId;
  private Integer postId;
  private Integer userId;
  private String commentContent;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private boolean isDeleted;
  private String userNickName;
  private String userProfileImgUrl;
  private Integer isLike;
  private Integer likeCount;
  private Integer parentCommentId;
  private String parentUserNickName;
  private boolean hasChild;
  private Integer level;
  private String path;
  private Integer orderNumber;
}
