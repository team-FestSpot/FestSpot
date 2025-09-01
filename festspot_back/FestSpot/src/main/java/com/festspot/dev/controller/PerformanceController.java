package com.festspot.dev.controller;

import com.festspot.dev.domain.performance.performanceComment.PerformanceComment;
import com.festspot.dev.dto.performance.PerformanceCommentRegisterDto;
import com.festspot.dev.dto.reponse.ResponseDto;
import com.festspot.dev.service.PerformanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

  @GetMapping("/{performanceId}")
  public ResponseEntity<ResponseDto<?>> getPerformanceById(@PathVariable Integer performanceId) {
    return ResponseEntity.ok(ResponseDto.success(performanceService.getPerformanceDetailById(performanceId)));
  }

  @PostMapping("/comment")
  public ResponseEntity<ResponseDto<?>> registerPerformanceComment(@RequestBody PerformanceCommentRegisterDto dto) {
    int result = performanceService.registerPerformanceComment(dto);
    if(result < 1) {
      return ResponseEntity.ok(ResponseDto.fail(HttpStatus.BAD_REQUEST, "댓글 등록 중 오류가 발생했습니다.", result));
    }
    return ResponseEntity.ok(ResponseDto.success("댓글이 등록되었습니다."));
  }

  @GetMapping("/comment/{performanceId}")
  public ResponseEntity<ResponseDto<?>> getPerformanceCommentsByPerformanceId(@PathVariable Integer performanceId) {
    List<PerformanceComment> result = performanceService.getPerformanceCommentsByPerformanceId(performanceId);
    return ResponseEntity.ok(ResponseDto.success(result));
  }
}
