package com.festspot.dev.service;

import com.festspot.dev.domain.performance.Performance;
import com.festspot.dev.domain.performance.PerformanceMapper;
import java.util.List;

import com.festspot.dev.domain.performance.performanceComment.PerformanceComment;
import com.festspot.dev.dto.performance.PerformanceCommentRegisterDto;
import com.festspot.dev.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

  @Transactional
  public int registerOrUpdatePerformanceComment(PerformanceCommentRegisterDto dto) {
    Integer userId = principalUtil.getPrincipal().getUser().getUserId();
    if(userId == null || userId < 0) {
      return 0;
    }
    PerformanceComment comment = dto.toEntity();
    comment.setUserId(userId);
    return performanceMapper.insertOrUpdateComment(comment);
  }

  public List<PerformanceComment> getPerformanceCommentsByPerformanceId(Integer performanceId) {
    return performanceMapper.findCommentsByPerformanceId(performanceId);
  }

  public int deletePerformanceCommentById(Integer performanceCommentId) {
    // 댓글 삭제 기능 (실제로는 데이터를 삭제하지 않고 삭제일(deleted_at)만 추가함)
    Integer userId = principalUtil.getPrincipal().getUser().getUserId();
    if(userId == null || userId < 0) {
      return 0;
    }
    return performanceMapper.updateCommentDeletedAtById(performanceCommentId);
  }
}
