package com.festspot.dev.service;

import com.festspot.dev.domain.entity.Performance;
import com.festspot.dev.dto.admin.AdminUploadPerformanceReqDto;
import com.festspot.dev.mapper.AdminMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminMapper adminMapper;
    public int uploadPerformance(AdminUploadPerformanceReqDto dto) {
        Integer statusCode = adminMapper.getStateCodeByState(dto.getPrfstate());
        Integer regionCode = adminMapper.getRegionCodeByRegionName(dto.getArea());
        Performance performance = dto.toEntity(regionCode, statusCode);
        return adminMapper.insert(performance);
    }
}
