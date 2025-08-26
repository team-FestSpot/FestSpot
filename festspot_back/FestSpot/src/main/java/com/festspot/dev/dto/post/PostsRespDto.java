package com.festspot.dev.dto.post;

import com.festspot.dev.domain.post.Post;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostsRespDto {

  private List<Post> postList;
  private Integer totalPage;
  private Integer currentPage;
  private Integer size;

}
