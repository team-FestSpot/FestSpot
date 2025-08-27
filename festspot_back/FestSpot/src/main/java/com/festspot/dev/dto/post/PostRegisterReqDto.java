package com.festspot.dev.dto.post;

import com.festspot.dev.domain.post.Post;
import com.festspot.dev.domain.user.User;
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

  public Post toPost(User user, Integer postCategoryId) {
    return Post.builder()
        .userId(user.getUserId())
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
