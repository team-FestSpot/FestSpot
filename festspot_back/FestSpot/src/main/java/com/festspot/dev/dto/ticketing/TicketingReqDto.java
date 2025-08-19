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

<<<<<<< HEAD
    private String relatenm;
    private String relateurl;

    public TicketingUrl toEntity(Integer performanceId) {
        return TicketingUrl.builder()
                .performanceId(performanceId)
                .ticketingUrl(relateurl)
                .ticketingAgencyName(relatenm)
                .build();
    }
=======
  private String relatenm;
  private String relateurl;

  public TicketingUrl toEntity(Integer performanceId) {
    return TicketingUrl.builder()
        .performanceId(performanceId)
        .ticketingUrl(relateurl)
        .ticketingAgencyName(relatenm)
        .build();
  }
>>>>>>> 370a1d7a1ed1d9e5b170a9847197b521560ba496
}