package com.festspot.dev.domain.performance.performanceState;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PerformanceStateMapper {

  PerformanceState findById(Integer performanceStateId);

  PerformanceState findByState(String performanceState);
}
