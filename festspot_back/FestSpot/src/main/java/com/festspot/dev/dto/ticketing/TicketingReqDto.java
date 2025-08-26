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
    private Integer ticketingUrlId; // 공연 정보 수정할 때 씀
    private String relatenm;
    private String relateurl;


    public TicketingUrl toEntity(Integer performanceId) {
        return TicketingUrl.builder()
                .ticketingUrlId(ticketingUrlId)
                .performanceId(performanceId)
                .ticketingUrl(relateurl)
                .ticketingAgencyName(relatenm)
                .build();
    }
}