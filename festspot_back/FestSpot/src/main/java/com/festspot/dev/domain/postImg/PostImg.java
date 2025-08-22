package com.festspot.dev.domain.postImg;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostImg {
    private Integer postImgId;
    private Integer postId;
    private String postImgUrl;
    private Integer seq;
}
