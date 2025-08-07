package com.festspot.dev.service;

import com.festspot.dev.domain.entity.Performance;
import com.festspot.dev.dto.admin.AdminUploadPerformanceReqDto;
import com.festspot.dev.mapper.AdminMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminMapper adminMapper;
    public int uploadPerformance(AdminUploadPerformanceReqDto dto) {
        if(adminMapper.findByPerformanceApiId(dto.getMt20id()) != null) {
            return 0;
        }
        Integer statusCode = adminMapper.getStateCodeByState(dto.getPrfstate());
        Integer regionCode = adminMapper.getRegionCodeByRegionName(dto.getArea());
        Performance performance = dto.toEntity(regionCode, statusCode);
        return adminMapper.insert(performance);
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
