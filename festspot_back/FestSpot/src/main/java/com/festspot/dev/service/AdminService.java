package com.festspot.dev.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.festspot.dev.domain.entity.Performance;
import com.festspot.dev.domain.entity.relate.Relate;
import com.festspot.dev.domain.entity.relate.RelateMapper;
import com.festspot.dev.dto.admin.AdminUploadPerformanceReqDto;
import com.festspot.dev.dto.relate.RelateDto;
import com.festspot.dev.mapper.AdminMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminMapper adminMapper;
    private final RelateMapper relateMapper;

    @Transactional(rollbackFor = Exception.class)
    public int uploadPerformance(AdminUploadPerformanceReqDto dto) {
        if(adminMapper.findByPerformanceApiId(dto.getMt20id()) != null) {
            return 0;
        }

        Integer statusCode = adminMapper.getStateCodeByState(dto.getPrfstate());
        Integer regionCode = adminMapper.getRegionCodeByRegionName(dto.getArea());

        Performance performance = dto.toEntity(regionCode, statusCode);
        int performanceInsertResult = adminMapper.insert(performance);

        // 예매처 dto 객체가 담긴 List 생성
        // 예매처 링크는 배열 안에 객체(예매처명, 예매처링크)가 들어있는 형태로 날아옴
        List<RelateDto> relateDtos = dto.getRelates().stream().map(relate -> {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                String json = objectMapper.writeValueAsString(relate);
                RelateDto relateDto = objectMapper.readValue(json, RelateDto.class);
                relateDto.setPerformanceId(performance.getPerformanceId());
                return relateDto;
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }).collect(Collectors.toList());

        // 예매처 dto List를 반복문 돌려서 예매처 entity가 들어있는 List로 변환
        List<Relate> relates = relateDtos.stream().map(relateDto -> {
//            System.out.println("relateDto = " + relateDto);
            return relateDto.toEntity();
        }).collect(Collectors.toList());
        relateMapper.insert(relates); // 예매처 테이블에 예매처 정보 저장

        return performanceInsertResult;
    }

    @Transactional(rollbackFor = Exception.class)
    public int uploadManyPerformance(List<AdminUploadPerformanceReqDto> dtos) {
        List<Performance> performanceList = dtos.stream().map(adminUploadPerformanceReqDto -> {
            Integer statusCode = adminMapper.getStateCodeByState(adminUploadPerformanceReqDto.getPrfstate());
            Integer regionCode = adminMapper.getRegionCodeByRegionName(adminUploadPerformanceReqDto.getArea());
            return adminUploadPerformanceReqDto.toEntity(regionCode, statusCode);
        }).toList();
        System.out.println(performanceList);
        return adminMapper.insertMany(performanceList);
    }
}
