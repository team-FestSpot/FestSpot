package com.festspot.dev.domain.postCategory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostCategory {
    private Integer postCategoryId;
    private String postCategoryKey;
    private String postCategoryName;
}
