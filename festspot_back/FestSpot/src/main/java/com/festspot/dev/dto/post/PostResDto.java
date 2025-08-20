package com.festspot.dev.dto.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostResDto {
    private Long postId;
    private String boardKey;
    private String title;
    private String contentHtml;
    private Long authorId;
    private String authorName;
    private Boolean allowComments;
    private Long viewCount;
    private Long likeCount;
    private Long commentCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private List<String> images;          // 상세 전체 이미지
    private String thumbnailImageUrl;     // 목록 대표 이미지(첫 장)
}
