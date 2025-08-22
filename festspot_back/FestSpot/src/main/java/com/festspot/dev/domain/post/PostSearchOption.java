package com.festspot.dev.domain.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostSearchOption {

  private Integer startIndex;
  private Integer endIndex;
  private Integer size;
  private Integer categoryId;
}
