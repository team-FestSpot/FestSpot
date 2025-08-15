package com.festspot.dev.domain.admin;

import com.festspot.dev.domain.entity.Performance;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminMapper {
    int insert(Performance performance);
    int insertMany(List<Performance> performanceList);
    int getRegionIdByRegionName(String regionName);
    int getStateIdByState(String state);
    Performance findByPerformanceApiId(String performanceApiId);
}
