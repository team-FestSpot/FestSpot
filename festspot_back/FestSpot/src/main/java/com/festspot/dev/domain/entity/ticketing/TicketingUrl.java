package com.festspot.dev.domain.entity.ticketing;

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

    public TicketingUrl toEntity() {
        return TicketingUrl.builder()
                .ticketingUrl(ticketingUrl)
                .ticketingAgencyName(ticketingAgencyName)
                .build();
    }
}
