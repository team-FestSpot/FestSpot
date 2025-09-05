package com.festspot.dev.dto.post;

import com.festspot.dev.domain.post.Post;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PostRegisterReqDto {

  private String boardKey;
  private String postTitle;
  private String postContent;

  private List<MultipartFile> files;

  public Post toPost(Integer userId, Integer postCategoryId) {
    return Post.builder()
        .userId(userId)
        .postCategoryId(postCategoryId)
        .postTitle(postTitle)
        .postContent(postContent)
        .viewCount(0)
        .likeCount(0)
        .commentCount(0)
        .createdAt(LocalDateTime.now())
        .build();
  }
}
