package com.festspot.dev.domain.post;

import com.festspot.dev.domain.user.User;
import com.festspot.dev.dto.post.PostCommentRespDto;
import com.festspot.dev.util.ImageUrlUtil;
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
  private Integer commentLevel;
  private LocalDateTime createdAt;
  private LocalDateTime deletedAt;
  private LocalDateTime updatedAt;
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

  private User user;

  public PostCommentRespDto toRespDto(ImageUrlUtil imageUrlUtil) {
    return PostCommentRespDto.builder()
        .postCommentId(postCommentId)
        .postId(postId)
        .userId(userId)
        .commentContent(commentContent)
        .createdAt(createdAt)
        .updatedAt(updatedAt)
        .isDeleted(deletedAt != null)
        .userNickName(userNickName)
        .userProfileImgUrl(imageUrlUtil.buildImageUrl(userProfileImgUrl, "profile"))
        .isLike(isLike)
        .likeCount(likeCount)
        .parentCommentId(parentCommentId)
        .parentUserNickName(parentUserNickName)
        .hasChild(hasChild)
        .level(level)
        .path(path)
        .orderNumber(orderNumber)
        .build();
  }
}
