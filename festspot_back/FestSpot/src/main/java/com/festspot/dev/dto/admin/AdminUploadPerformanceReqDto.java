package com.festspot.dev.dto.admin;

import com.festspot.dev.domain.entity.Performance;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

@Data
public class AdminUploadPerformanceReqDto {
    private String mt20id;
    private String poster;
    private String prfnm;
    private String area;
    private String fcltynm;
    private String genrenm;
    private String openrun;
    private String prfstate;
    private String prfpdfrom;
    private String prfpdto;
    private String visit;
    private String festival;

    public LocalDate localDateParser(String stringDate) {
        // 문자열 형식에 맞는 포매터 지정
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
        // 문자열을 LocalDate로 파싱
        return LocalDate.parse(stringDate, formatter);
    }

    public Performance toEntity(Integer regionCode, Integer statusCode) {
        LocalDateTime now = LocalDateTime.now();
        return Performance.builder()
                .performanceApiId(mt20id)
                .performanceTitle(prfnm)
                .performanceRegionId(regionCode)
                .performancePosterUrl(poster)
                .performanceStartDate(localDateParser(prfpdfrom))
                .performanceEndDate(localDateParser(prfpdto))
                .performanceVenue(fcltynm)
                .performanceLastModified(now)
                .performanceStatus(statusCode)
                .isForeign(Objects.equals(visit, "Y") ? 1 : 0)
                .isFestival(Objects.equals(festival, "Y") ? 1 : 0)
                .updatedAt(now)
                .build();
    }
}
