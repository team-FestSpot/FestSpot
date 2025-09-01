package com.festspot.dev.dto.performance;

import com.festspot.dev.domain.performance.performanceComment.PerformanceComment;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PerformanceCommentRegisterDto {
    private Integer performanceCommentId;
    private Integer userId;
    private Integer performanceId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime deletedAt;

    public PerformanceComment toEntity() {
        return PerformanceComment.builder()
                .performanceId(performanceId)
                .content(content)
                .build();
    }
}
