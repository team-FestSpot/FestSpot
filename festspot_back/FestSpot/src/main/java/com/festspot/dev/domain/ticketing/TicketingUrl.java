package com.festspot.dev.domain.ticketing;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketingUrl {

  private Integer ticketingUrlId;
  private Integer performanceId;
  private String ticketingUrl;
  private String ticketingAgencyName;

}
