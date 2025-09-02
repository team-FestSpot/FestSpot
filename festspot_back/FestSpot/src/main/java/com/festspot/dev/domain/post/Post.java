package com.festspot.dev.domain.post;

import com.festspot.dev.domain.postCategory.PostCategory;
import com.festspot.dev.domain.postImg.PostImg;
import com.festspot.dev.domain.user.User;
import com.festspot.dev.dto.post.PostDetailRespDto;
import com.festspot.dev.util.ImageUrlUtil;
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
public class Post {

  private Integer postId;
  private Integer userId;
  private Integer postCategoryId;
  private String postTitle;
  private String postContent;
  private Integer viewCount;
  private Integer likeCount;
  private Integer isLike;
  private Integer commentCount;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  private User user;
  private PostCategory postCategory;
  private List<PostComment> postComments;
  private List<PostImg> postImgs;

  public PostDetailRespDto toRespDto(ImageUrlUtil imageUrlUtil) {
    return PostDetailRespDto.builder()
        .postId(postId)
        .postCategoryId(postCategoryId)
        .postTitle(postTitle)
        .postContent(postContent)
        .viewCount(viewCount)
        .likeCount(likeCount)
        .isLike(isLike)
        .commentCount(commentCount)
        .createdAt(createdAt)
        .updatedAt(updatedAt)
        .postCategory(postCategory)
        .user(user.toRespDto(imageUrlUtil))
        .postImgs(postImgs.stream().map(postImg -> postImg.toRespDto(imageUrlUtil)).toList())
        .build();
  }
}
