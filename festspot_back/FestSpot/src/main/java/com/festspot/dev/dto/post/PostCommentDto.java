package com.festspot.dev.dto.post;

import com.festspot.dev.domain.post.PostComment;
import com.festspot.dev.dto.auth.UserSummaryDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostCommentDto {
    private Integer postCommentId;
    private Integer parentCommentId;
    private Integer userId;
    private String commentContent;
    private LocalDateTime createdAt;
    private UserSummaryDto user;

    public static PostCommentDto toComment(PostComment postComment) {
        if (postComment == null) return null;
        return PostCommentDto.builder()
                .postCommentId(postComment.getPostCommentId())
                .parentCommentId(postComment.getParentCommentId())
                .userId(postComment.getUserId())
                .commentContent(postComment.getCommentContent())
                .createdAt(postComment.getCreatedAt())
                .user(UserSummaryDto.toUser(postComment.getUser()))
                .build();
    }
}
