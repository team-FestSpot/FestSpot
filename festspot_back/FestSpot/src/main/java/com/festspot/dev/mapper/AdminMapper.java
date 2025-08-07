package com.festspot.dev.mapper;

import com.festspot.dev.domain.entity.Performance;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminMapper {
    int insert(Performance performance);
    int insertMany(List<Performance> performanceList);
    int getRegionCodeByRegionName(String regionName);
    int getStateCodeByState(String state);
    Performance findByPerformanceApiId(String performanceApiId);
}
