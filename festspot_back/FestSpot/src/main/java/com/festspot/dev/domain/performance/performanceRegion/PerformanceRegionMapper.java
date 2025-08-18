package com.festspot.dev.domain.performance.performanceRegion;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PerformanceRegionMapper {

  PerformanceRegion findByCode(Integer regionCode);

  PerformanceRegion findByRegionName(String regionName);
}
