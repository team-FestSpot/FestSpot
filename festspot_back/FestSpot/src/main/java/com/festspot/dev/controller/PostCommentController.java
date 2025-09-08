package com.festspot.dev.controller;

import com.festspot.dev.dto.post.PostCommentReqDto;
import com.festspot.dev.dto.reponse.ResponseDto;
import com.festspot.dev.service.PostCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/board/comments")
@RequiredArgsConstructor
public class PostCommentController {

  private final PostCommentService postCommentService;

  @GetMapping("/{postId}")
  public ResponseEntity<ResponseDto<?>> getPostComments(@PathVariable Integer postId) {
    System.out.println(postId);
    return ResponseEntity.ok(ResponseDto.success(postCommentService.getPostComment(postId)));
  }

  @PostMapping("/{postId}")
  public ResponseEntity<ResponseDto<?>> postCommentRegister(@PathVariable Integer postId,
      @RequestBody PostCommentReqDto dto) {
    return ResponseEntity.ok(
        ResponseDto.success(postCommentService.postCommentRegister(dto, postId)));
  }

  @PutMapping("/{postId}/{postCommentId}")
  public ResponseEntity<ResponseDto<?>> updatePostComment(@PathVariable Integer postId,
      @PathVariable Integer postCommentId, @RequestBody PostCommentReqDto dto) {
    return ResponseEntity.ok(
        ResponseDto.success(postCommentService.update(dto, postCommentId)));
  }
}
