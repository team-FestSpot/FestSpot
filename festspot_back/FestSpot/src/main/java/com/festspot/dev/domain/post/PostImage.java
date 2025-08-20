package com.festspot.dev.domain.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostImage {
    private Long postImgId;
    private Long postId;
    private String postImgUrl;
    private Integer seq;
    private LocalDateTime createdAt;
}
