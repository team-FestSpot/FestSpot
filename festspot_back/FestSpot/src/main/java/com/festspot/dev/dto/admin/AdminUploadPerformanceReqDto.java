package com.festspot.dev.dto.admin;

import com.festspot.dev.domain.performance.Performance;
import com.festspot.dev.domain.performance.performanceRegion.PerformanceRegion;
import com.festspot.dev.domain.performance.performanceState.PerformanceState;
import com.festspot.dev.dto.ticketing.TicketingReqDto;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;

import lombok.Builder;
import lombok.Data;

@Data
public class AdminUploadPerformanceReqDto {

    // api 기준으로 변수명 작성됨
    private String mt20id;    // performanceApiId
    private String poster;    // 포스터 url
    private String prfnm;
    private String area;      // 지역명(문자열)
    private String fcltynm;
    private String genrenm;
    private String openrun;
    private String prfstate;  // 공연 상태(문자열)
    private String prfpdfrom;
    private String prfpdto;
    private String visit;
    private String festival;
    private String prfcast;
    private List<TicketingReqDto> relates;

    public LocalDate localDateParser(String stringDate) {
        // 문자열 형식에 맞는 포매터 지정
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
        // 문자열을 LocalDate로 파싱
        return LocalDate.parse(stringDate, formatter);
    }

    public Performance toEntity(PerformanceRegion performanceRegion,
                                PerformanceState performanceState) {
        LocalDateTime now = LocalDateTime.now();
        return Performance.builder()
                .performanceApiId(mt20id)
                .performanceTitle(prfnm)
                .performancePosterUrl(poster)
                .performanceStartDate(localDateParser(prfpdfrom))
                .performanceEndDate(localDateParser(prfpdto))
                .performanceVenue(fcltynm)
                .performanceLastModified(now)
                .isForeign(Objects.equals(visit, "Y") ? 1 : 0)
                .isFestival(Objects.equals(festival, "Y") ? 1 : 0)
                .updatedAt(now)
                .performanceCast(prfcast)
                .performanceRegion(performanceRegion)
                .performanceState(performanceState)
                .build();
    }
}