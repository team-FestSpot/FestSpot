package com.festspot.dev.service;

import com.festspot.dev.domain.performance.Performance;
import com.festspot.dev.domain.performance.PerformanceMapper;
import java.util.List;

import com.festspot.dev.domain.performance.performanceComment.PerformanceComment;
import com.festspot.dev.dto.performance.PerformanceCommentRegisterDto;
import com.festspot.dev.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PerformanceService {

  private final PerformanceMapper performanceMapper;
  private final PrincipalUtil principalUtil;

  public List<Performance> getAllPerformance() {
    return performanceMapper.findAll();
  }

  public void getPerformance() {

  }

  public Performance getPerformanceDetailById (Integer performanceId) {
    return performanceMapper.findById(performanceId);
  }

  public int registerPerformanceComment(PerformanceCommentRegisterDto dto) {
    PerformanceComment comment = dto.toEntity();
    comment.setUserId(principalUtil.getPrincipal().getUser().getUserId());
    return performanceMapper.insertComment(comment);
  }

  public List<PerformanceComment> getPerformanceCommentsByPerformanceId(Integer performanceId) {
    return performanceMapper.findCommentsByPerformanceId(performanceId);
  }
}
