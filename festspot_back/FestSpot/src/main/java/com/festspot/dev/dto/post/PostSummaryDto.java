package com.festspot.dev.dto.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostSummaryDto {
    private Integer postId;
    private String postTitle;
    private String authorName;
    private String thumbnailImageUrl;
    private LocalDateTime createdAt;
}
