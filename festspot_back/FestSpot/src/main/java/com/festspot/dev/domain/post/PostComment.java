package com.festspot.dev.domain.post;

import com.festspot.dev.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostComment {
    private Integer commentId;
    private Integer postId;
    private Integer userId;
    private String commentContent;
    private LocalDateTime createdAt;
    private Integer parentCommentId;
    private LocalDateTime deletedAt;
    private LocalDateTime updatedAt;

    private User user;
}
