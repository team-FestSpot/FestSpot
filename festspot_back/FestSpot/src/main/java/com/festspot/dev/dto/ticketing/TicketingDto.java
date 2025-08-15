package com.festspot.dev.dto.ticketing;

import com.festspot.dev.domain.entity.ticketing.TicketingUrl;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketingDto {
    private Integer relateId;
    private Integer performanceId;
    private String relatenm;
    private String relateurl;

    public TicketingUrl toEntity() {
        return TicketingUrl.builder()
                .performanceId(performanceId)
                .ticketingUrl(relateurl)
                .ticketingAgencyName(relatenm)
                .build();
    }

    public TicketingDto toDto(TicketingUrl ticketingUrl) {
        return TicketingDto.builder()
                .performanceId(ticketingUrl.getPerformanceId())
                .relatenm(ticketingUrl.getTicketingAgencyName())
                .relateurl(ticketingUrl.getTicketingUrl())
                .build();
    }
}
