package com.festspot.dev.dto.post;

import com.festspot.dev.domain.post.PostComment;
import lombok.Data;

@Data
public class PostCommentReqDto {
    private Integer postCommentId;
    private String commentContent;
    private Integer commentLevel;
    private Integer parentCommentId;

    public PostComment toEntity() {
        return PostComment.builder()
                .postCommentId(postCommentId)
                .commentContent(commentContent)
                .commentLevel(commentLevel)
                .parentCommentId(parentCommentId)
                .build();
    }
}
