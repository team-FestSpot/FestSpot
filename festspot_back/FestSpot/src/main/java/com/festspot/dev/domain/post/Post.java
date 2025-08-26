package com.festspot.dev.domain.post;

import com.festspot.dev.domain.postCategory.PostCategory;
import com.festspot.dev.domain.postImg.PostImg;
import com.festspot.dev.domain.user.User;
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
  private String postTitle;
  private String postContent;
  private Integer viewCount;
  private Integer likeCount;
  private Integer commentCount;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  private User user;
  private PostCategory postCategory;
  private List<PostImg> postImgs;
  private List<PostComment> postComments;
}
