package com.festspot.dev.domain.performance.performanceComment;

import com.festspot.dev.domain.performance.Performance;
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
public class PerformanceComment {
    private Integer performanceCommentId;
    private Integer userId;
    private Integer performanceId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime deletedAt;

    private User user;
    private Performance performance;
}
