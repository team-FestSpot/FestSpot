package com.festspot.dev.domain.postImg;

import com.festspot.dev.dto.post.PostImgRespDto;
import com.festspot.dev.util.ImageUrlUtil;
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

    public PostImgRespDto toRespDto(ImageUrlUtil imageUrlUtil) {
        return PostImgRespDto.builder()
                .postImgId(postImgId)
                .postId(postId)
                .postImgUrl(imageUrlUtil.buildImageUrl(postImgUrl, "post"))
                .seq(seq)
                .build();
    }
}
