package com.festspot.dev.service;

import com.festspot.dev.domain.performance.Performance;
import com.festspot.dev.domain.performance.PerformanceMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PerformanceService {

  private final PerformanceMapper performanceMapper;

  public List<Performance> getAllPerformance() {
    return performanceMapper.findAll();
  }

  public void getPerformance() {

  }
}
