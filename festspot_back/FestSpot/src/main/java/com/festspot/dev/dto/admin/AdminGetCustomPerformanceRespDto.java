package com.festspot.dev.dto.admin;

import com.festspot.dev.dto.ticketing.TicketingReqDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminGetCustomPerformanceRespDto {
    private Integer performanceId;
    private String poster;    // 포스터 url
    private String prfnm;
    private String area;      // 지역명(문자열)
    private String fcltynm;
    private String prfstate;  // 공연 상태(문자열)
    private LocalDate prfpdfrom;
    private LocalDate prfpdto;
    private String visit;
    private String festival;
    private String prfcast;
    
}
