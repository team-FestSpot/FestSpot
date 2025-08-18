package com.festspot.dev.dto.ticketing;

import com.festspot.dev.domain.ticketing.TicketingUrl;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketingReqDto {

  private String relatenm;
  private String relateurl;

  public TicketingUrl toEntity(Integer performanceId) {
    return TicketingUrl.builder()
        .performanceId(performanceId)
        .ticketingUrl(relateurl)
        .ticketingAgencyName(relatenm)
        .build();
  }
}