package com.festspot.dev.dto.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostListRespDto {
    private List<PostSummaryDto> posts;
    private long totalCount;
    private int totalPages;
}
