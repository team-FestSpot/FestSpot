package com.festspot.dev.controller;

import com.festspot.dev.dto.reponse.ResponseDto;
import com.festspot.dev.service.PerformanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/performance")
@RequiredArgsConstructor
public class PerformanceController {

  private final PerformanceService performanceService;

  @GetMapping
  public ResponseEntity<ResponseDto<?>> getAllPerformance() {
    return ResponseEntity.ok(ResponseDto.success(performanceService.getAllPerformance()));
  }

  @GetMapping("/apiId/{performanceApiId}")
  public ResponseEntity<ResponseDto<?>> getPerformanceByApiId(
      @PathVariable String performanceApiId) {
    return ResponseEntity.ok(ResponseDto.success(null));
  }

  @GetMapping("/id/{performanceId}")
  public ResponseEntity<ResponseDto<?>> getPerformanceById(@PathVariable String performanceId) {
    return ResponseEntity.ok(ResponseDto.success(null));
  }
}
