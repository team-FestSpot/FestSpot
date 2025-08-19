package com.festspot.dev.dto.ticketing;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketingRespDto {
    private Integer ticketingUrlId;
    private Integer performanceId;
    private String relatenm;
    private String relateurl;
}
