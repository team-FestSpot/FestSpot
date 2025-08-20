package com.festspot.dev.service;

import com.festspot.dev.domain.performance.Performance;
import com.festspot.dev.domain.performance.PerformanceMapper;
import com.festspot.dev.domain.performance.performanceRegion.PerformanceRegion;
import com.festspot.dev.domain.performance.performanceRegion.PerformanceRegionMapper;
import com.festspot.dev.domain.performance.performanceState.PerformanceState;
import com.festspot.dev.domain.performance.performanceState.PerformanceStateMapper;
import com.festspot.dev.domain.ticketing.TicketingUrl;
import com.festspot.dev.domain.ticketing.TicketingUrlMapper;
import com.festspot.dev.dto.admin.AdminGetCustomPerformanceRespDto;
import com.festspot.dev.dto.admin.AdminUploadPerformanceReqDto;
import com.festspot.dev.dto.ticketing.TicketingReqDto;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final PerformanceMapper performanceMapper;
    private final PerformanceRegionMapper performanceRegionMapper;
    private final PerformanceStateMapper performanceStateMapper;
    private final TicketingUrlMapper ticketingUrlMapper;
    private final FileService fileService;

    @Transactional(rollbackFor = Exception.class)
    public int uploadPerformance(AdminUploadPerformanceReqDto dto) {
        System.out.println(dto);
        if (performanceMapper.findByPerformanceApiId(dto.getMt20id()) != null) {
            return 0;
        }

        PerformanceRegion performanceRegion = performanceRegionMapper.findByRegionName(
                dto.getArea());
        PerformanceState performanceState = performanceStateMapper.findByState(dto.getPrfstate());

        Performance performance = dto.toEntity(performanceRegion, performanceState);
        int performanceInsert = performanceMapper.insert(performance);

        // 예매처 dto 객체가 담긴 List 생성
        // 예매처 링크는 배열 안에 객체(예매처명, 예매처링크)가 들어있는 형태로 날아옴
        List<TicketingUrl> ticketingUrls = dto.getRelates().stream()
                .map(relate -> relate.toEntity(performance.getPerformanceId())).toList();
        int ticketingUrlInsert = ticketingUrlMapper.insert(ticketingUrls);

        return performanceInsert * ticketingUrlInsert;
    }

    @Transactional(rollbackFor = Exception.class)
    public int uploadManyPerformance(List<AdminUploadPerformanceReqDto> dtos) {

        List<Performance> performanceList = dtos.stream().map(dto -> {
            PerformanceRegion performanceRegion = performanceRegionMapper.findByRegionName(
                    dto.getArea());
            PerformanceState performanceState = performanceStateMapper.findByState(dto.getPrfstate());
            return dto.toEntity(performanceRegion, performanceState);
        }).toList();
        int result = performanceMapper.insertMany(performanceList);

        // 예매처 dto들이 담긴 list가 담긴 list를 예매처 entity들이 담긴 list가 담긴 list로 변환
        List<List<TicketingUrl>> TicketingUrls = performanceList.stream().map(perform -> {
            List<TicketingReqDto> relates = dtos.stream()
                    .filter(dto -> Objects.equals(dto.getMt20id(), perform.getPerformanceApiId()))
                    .findFirst().orElseThrow()
                    .getRelates();
            return relates.stream().map(relate -> relate.toEntity(perform.getPerformanceId())).toList();
        }).toList();

        // 각 공연들의 예매처 정보들을 relate 테이블에 저장
        ticketingUrlMapper.insertMany(TicketingUrls);

        return result;
    }

    @Transactional(rollbackFor = Exception.class)
    public int uploadCustomPerformance(AdminUploadPerformanceReqDto dto, MultipartFile file) {
        String newFileName = fileService.uploadFile(file, "/poster");
        String url = "/upload/poster/" + newFileName;
        dto.setPoster(url);
        PerformanceRegion performanceRegion = performanceRegionMapper.findByRegionName(
                dto.getArea());
        PerformanceState performanceState = performanceStateMapper.findByState(dto.getPrfstate());

        Performance performance = dto.toEntity(performanceRegion, performanceState);

        int performanceInsert = performanceMapper.insert(performance);

        List<TicketingUrl> ticketingUrls = dto.getRelates().stream()
                .map(relate -> relate.toEntity(performance.getPerformanceId())).toList();
        int ticketingUrlInsert = ticketingUrlMapper.insert(ticketingUrls);

        return performanceInsert * ticketingUrlInsert;
    }

    public List<AdminGetCustomPerformanceRespDto> getCustomPerformanceInfoList() {
        List<Performance> performanceList = performanceMapper.findByPerformanceApiIdIsNull();
        return performanceList.stream().map(performance -> performance.toPerformanceDto()).toList();
    }
}
