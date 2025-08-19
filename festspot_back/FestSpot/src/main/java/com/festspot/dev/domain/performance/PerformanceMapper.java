package com.festspot.dev.domain.performance;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PerformanceMapper {

  List<Performance> findAll();

  List<Performance> findByPerformanceApiIdIsNotNull();

  Performance findByPerformanceApiId(String performanceApiId);

  Performance findById(Integer performanceId);

  int insert(Performance performance);

  int insertMany(List<Performance> performanceList);

}