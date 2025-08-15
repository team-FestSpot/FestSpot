package com.festspot.dev.domain.ticketing;

import lombok.Data;

@Data
public class Ticketing {

  private Integer ticketingUrlId;
  private Integer performanceId;
  private String ticketingUrl;
  private String ticketingAgencyName;

}
