package com.festspot.dev.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Performance {
    private Integer performanceId;
    private Integer performanceRegionId;
    private String performanceApiId;
    private String performanceTitle;
    private String performancePosterUrl;
    private LocalDate performanceStartDate;
    private LocalDate performanceEndDate;
    private String performanceVenue;
    private Integer performanceStatus;
    private LocalDateTime performanceLastModified;
    private Integer isForeign;
    private Integer isFestival;
    private LocalDateTime updatedAt;

    private Region region;
    private PerformanceState performanceState;
}
