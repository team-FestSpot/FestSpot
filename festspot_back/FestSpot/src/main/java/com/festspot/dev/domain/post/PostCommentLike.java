package com.festspot.dev.domain.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostCommentLike {
    private Integer postCommentLikeId;
    private Integer userId;
    private Integer postCommentId;
}
