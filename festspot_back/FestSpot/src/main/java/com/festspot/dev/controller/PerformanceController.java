package com.festspot.dev.controller;

import com.festspot.dev.domain.performance.performanceComment.PerformanceComment;
import com.festspot.dev.dto.performance.PerformanceCommentRegisterDto;
import com.festspot.dev.dto.reponse.ResponseDto;
import com.festspot.dev.service.PerformanceService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
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

  @GetMapping("/apiId")
  public ResponseEntity<ResponseDto<?>> getPerformanceApiIdList() {
    return ResponseEntity.ok(ResponseDto.success(performanceService.getPerformanceApiIdList()));
  }

  @PostMapping("/comment")
  public ResponseEntity<ResponseDto<?>> registerOrUpdatePerformanceComment(@RequestBody PerformanceCommentRegisterDto dto) throws BadRequestException {
    if(dto.getContent().isEmpty()) {
      return ResponseEntity.ok(ResponseDto.fail(HttpStatus.BAD_REQUEST, "댓글을 입력하세요.", 0));
    }
    
    int result = performanceService.registerOrUpdatePerformanceComment(dto);
    if(result < 1) {
      throw new BadRequestException();
    }
    return ResponseEntity.ok(ResponseDto.success("댓글이 등록되었습니다."));
  }

  @GetMapping("/comment/{performanceId}")
  public ResponseEntity<ResponseDto<?>> getPerformanceCommentsByPerformanceId(@PathVariable Integer performanceId) {
    List<PerformanceComment> result = performanceService.getPerformanceCommentsByPerformanceId(performanceId);
    return ResponseEntity.ok(ResponseDto.success(result));
  }

  @PutMapping("/comment/delete/{performanceCommentId}")
  public ResponseEntity<ResponseDto<?>> deletePerformanceComment(@PathVariable Integer performanceCommentId) throws BadRequestException {
    int result = performanceService.deletePerformanceCommentById(performanceCommentId);
    if(result < 1) {
      throw new BadRequestException();
    }
    return ResponseEntity.ok(ResponseDto.success("댓글이 삭제되었습니다."));
  }
}
