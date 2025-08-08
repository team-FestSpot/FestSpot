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
public class PostDetailDto {
    private Integer postId;
    private Integer postCategoryId;
    private String postTitle;
    private String postContent;
    private String userNickname;
    private LocalDateTime createdAt;
    private List<PostImgDto> images;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PostImgDto {
        private Integer postImgId;
        private String postImgUrl;
        private Integer seq;
    }
}
