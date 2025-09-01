package com.festspot.dev.dto.post;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostCommentRespDto {
    private Integer postCommentId;
    private Integer postId;
    private Integer userId;
    private String userNickName;
    private String commentContent;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
