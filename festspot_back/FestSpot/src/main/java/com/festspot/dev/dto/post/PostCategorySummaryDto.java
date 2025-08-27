package com.festspot.dev.dto.post;

import com.festspot.dev.domain.postCategory.PostCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostCategorySummaryDto {
    private Integer postCategoryId;
    private String postCategoryName;

    public static PostCategorySummaryDto toCategory(PostCategory postCategory) {
        if (postCategory == null) return null;
        PostCategorySummaryDto dto = new PostCategorySummaryDto();
        dto.setPostCategoryId(postCategory.getPostCategoryId());
        dto.setPostCategoryName(postCategory.getPostCategoryName());
        return dto;
    }
}
