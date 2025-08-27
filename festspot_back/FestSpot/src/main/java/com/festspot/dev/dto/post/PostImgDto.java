package com.festspot.dev.dto.post;

import com.festspot.dev.domain.postImg.PostImg;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostImgDto {
    private Integer postImgId;
    private String postImgUrl;
    private Integer seq;

    public static PostImgDto toPostImg(PostImg postImg) {
        if (postImg == null) return null;
        return PostImgDto.builder()
                .postImgId(postImg.getPostImgId())
                .postImgUrl(postImg.getPostImgUrl())
                .seq(postImg.getSeq())
                .build();
    }
}
