package com.festspot.dev.dto.post;

import com.festspot.dev.domain.postCategory.PostCategory;
import com.festspot.dev.dto.user.UserRespDto;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostDetailRespDto {

  private Integer postId;
  private Integer postCategoryId;
  private String postTitle;
  private String postContent;
  private Integer viewCount;
  private Integer likeCount;
  private Integer isLike;
  private Integer commentCount;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  private UserRespDto user;
  private PostCategory postCategory;
  private List<PostImgRespDto> postImgs;
}
