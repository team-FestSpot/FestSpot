package com.festspot.dev.dto.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostImgRespDto {
    private Integer postImgId;
    private Integer postId;
    private String postImgUrl;
    private Integer seq;
}

