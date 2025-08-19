package com.festspot.dev.domain.performance;

import com.festspot.dev.domain.performance.performanceRegion.PerformanceRegion;
import com.festspot.dev.domain.performance.performanceState.PerformanceState;
import com.festspot.dev.domain.ticketing.TicketingUrl;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.festspot.dev.dto.admin.AdminGetCustomPerformanceRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Performance {

  private Integer performanceId;
  private String performanceApiId;
  private String performanceTitle;
  private String performanceCast;
  private String performancePosterUrl;
  private LocalDate performanceStartDate;
  private LocalDate performanceEndDate;
  private String performanceVenue;
  private LocalDateTime performanceLastModified;
  private Integer isForeign;
  private Integer isFestival;
  private LocalDateTime updatedAt;

  private PerformanceRegion performanceRegion;
  private PerformanceState performanceState;
  private List<TicketingUrl> ticketingUrls;

  public AdminGetCustomPerformanceRespDto toDto() {
    return AdminGetCustomPerformanceRespDto.builder()
            .prfnm(performanceTitle)
            .area(performanceRegion.getRegionName())
            .performanceId(performanceId)
            .poster(performancePosterUrl)
            .prfpdfrom(performanceStartDate)
            .prfpdto(performanceEndDate)
            .visit(isForeign == 1 ? "Y" : "N")
            .festival(isFestival == 1 ? "Y" : "N")
            .fcltynm(performanceVenue)
            .prfcast(performanceCast)
            .prfstate(performanceState.getPerformanceState())
            .build();
  }
}