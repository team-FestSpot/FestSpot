package com.festspot.dev.domain.post;

import com.festspot.dev.domain.postCategory.PostCategory;
import com.festspot.dev.domain.postImg.PostImg;
import com.festspot.dev.domain.user.User;
import com.festspot.dev.dto.post.PostDetailRespDto;
import java.time.LocalDateTime;
import java.util.List;

import com.festspot.dev.dto.post.PostImgRespDto;
import com.festspot.dev.util.ImageUrlUtil;
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
  private Integer commentCount;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  private User user;
  private PostCategory postCategory;
  private List<PostComment> postComments;
  private List<PostImg> postImgs;

  public PostDetailRespDto toRespDto(User user, ImageUrlUtil imageUrlUtil) {
    return PostDetailRespDto.builder()
        .postCategoryId(postCategoryId)
        .postTitle(postTitle)
        .postContent(postContent)
        .viewCount(viewCount)
        .likeCount(likeCount)
        .commentCount(commentCount)
        .createdAt(createdAt)
        .updatedAt(updatedAt)
        .user(user)
        .postImgs(postImgs.stream().map(postImg -> postImg.toRespDto(imageUrlUtil)).toList())
        .build();
  }
}
