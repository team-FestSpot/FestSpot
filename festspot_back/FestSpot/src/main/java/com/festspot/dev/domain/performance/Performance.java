package com.festspot.dev.domain.performance;

import com.festspot.dev.domain.performance.performanceRegion.PerformanceRegion;
import com.festspot.dev.domain.performance.performanceState.PerformanceState;
import com.festspot.dev.domain.ticketing.TicketingUrl;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.festspot.dev.dto.admin.AdminGetCustomPerformanceRespDto;
import com.festspot.dev.dto.ticketing.TicketingRespDto;
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

  public AdminGetCustomPerformanceRespDto toPerformanceDto () {
    return AdminGetCustomPerformanceRespDto.builder()
            .performanceId(performanceId)
            .prfstate(performanceState.getPerformanceState())
            .prfcast(performanceCast)
            .visit(isForeign == 1 ? "Y" : "N")
            .area(performanceRegion.getRegionName())
            .prfnm(performanceTitle)
            .fcltynm(performanceVenue)
            .festival(isFestival == 1 ? "Y" : "N")
            .prfpdfrom(performanceStartDate)
            .prfpdto(performanceEndDate)
            .poster(performancePosterUrl)
            .relates(ticketingUrls.stream().map(ticketingUrl -> toTicktingDto(ticketingUrl)).toList())
            .build();
  }

  public TicketingRespDto toTicktingDto(TicketingUrl ticketingUrl) {
    return TicketingRespDto.builder()
            .ticketingUrlId(ticketingUrl.getTicketingUrlId())
            .performanceId(ticketingUrl.getPerformanceId())
            .relatenm(ticketingUrl.getTicketingAgencyName())
            .relateurl(ticketingUrl.getTicketingUrl())
            .build();
  }
}
