package com.festspot.dev.domain.performance;

import java.util.List;

import com.festspot.dev.domain.performance.performanceComment.PerformanceComment;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PerformanceMapper {

  List<Performance> findAll();

  List<Performance> findByPerformanceApiIdIsNull();

  Performance findByPerformanceApiId(String performanceApiId);

  Performance findById(Integer performanceId);

  List<String> findAllPerformanceApiId();

  int insert(Performance performance);

  int insertMany(List<Performance> performanceList);

  int update(Performance performance);

  int updateManyByApiIds(List<Performance> performanceList);

  int deleteById(Integer performanceId);

  int insertOrUpdateComment(PerformanceComment comment);

  List<PerformanceComment> findCommentsByPerformanceId(Integer performanceId);

  int updateCommentDeletedAtById(Integer performanceCommentId);
}