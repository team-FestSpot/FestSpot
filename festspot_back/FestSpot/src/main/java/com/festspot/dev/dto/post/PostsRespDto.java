package com.festspot.dev.dto.post;

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

  private List<PostDetailRespDto> postList;
  private Integer totalPage;
  private Integer size;

}
