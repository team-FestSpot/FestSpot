package com.festspot.dev.controller;

import com.festspot.dev.domain.post.PostMapper;
import com.festspot.dev.domain.user.UserMapper;
import com.festspot.dev.dto.post.PostCommentReqDto;
import com.festspot.dev.dto.post.PostDetailRespDto;
import com.festspot.dev.dto.post.PostRegisterReqDto;
import com.festspot.dev.dto.reponse.ResponseDto;
import com.festspot.dev.security.model.PrincipalUser;
import com.festspot.dev.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class PostController {

  private final PostService postService;
  private final PostMapper postMapper;
  private final UserMapper userMapper;

  @GetMapping()
  public ResponseEntity<ResponseDto<?>> getAllPosts(@RequestParam Integer page, Integer size) {
    return ResponseEntity.ok(ResponseDto.success(
        postService.getAllPosts(page, size)
    ));
  }

  @GetMapping("/{boardKey}")
  public ResponseEntity<ResponseDto<?>> getPosts(
      @RequestParam Integer page, Integer size, @PathVariable String boardKey) {
    return ResponseEntity.ok(
        ResponseDto.success(postService.getPostsByCategory(page, size, boardKey)
        ));
  }

  @GetMapping("/category")
  public ResponseEntity<ResponseDto<?>> getPostCategory() {
    return ResponseEntity.ok(ResponseDto.success(postService.getPostCategory()));
  }

  @GetMapping("/{boardKey}/{postId}")
  public ResponseEntity<ResponseDto<PostDetailRespDto>> getPost(@PathVariable String boardKey,
      @PathVariable Integer postId) {
    postService.increaseViewCount(postId); // 조회수를 우선 증가
    return ResponseEntity.ok(ResponseDto.success(postService.getPost(postId)));
  }

  @GetMapping("/{boardKey}/{postId}/like")
  public ResponseEntity<ResponseDto<?>> like(@PathVariable String boardKey,
      @PathVariable Integer postId) {
    System.out.println(postId);
    postService.like(postId);
    return ResponseEntity.ok(ResponseDto.success("좋아요 요청 완료"));
  }

  @GetMapping("/{boardKey}/{postId}/dislike")
  public ResponseEntity<ResponseDto<?>> disLike(@PathVariable String boardKey,
      @PathVariable Integer postId) {
    postService.disLike(postId);
    return ResponseEntity.ok(ResponseDto.success("좋아요 요청 취소 완료"));
  }

  @PostMapping("/{boardKey}")
  public ResponseEntity<ResponseDto<?>> postRegister(@ModelAttribute PostRegisterReqDto dto) {
    return ResponseEntity.ok(ResponseDto.success(postService.register(dto)));
  }

  @PostMapping("/{postId}/like")
  public ResponseEntity<ResponseDto<?>> postLike(@PathVariable Integer postId) {
    return ResponseEntity.ok(
        ResponseDto.success(postService.postLike(postId)));
  }

  @DeleteMapping("/{postId}/dislike")
  public ResponseEntity<ResponseDto<?>> postDislike(@PathVariable Integer postId) {
    return ResponseEntity.ok(
        ResponseDto.success(postService.postDislike(postId)));
  }

  // 좋아요
  @PostMapping("/{boardKey}/{postId}/like")
  public ResponseEntity<ResponseDto<?>> toggleLike(@PathVariable String boardKey, @PathVariable Integer postId, @AuthenticationPrincipal PrincipalUser principalUser) {
    if (principalUser == null) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");

    Integer userId = principalUser.getUser().getUserId();
    boolean liked = postService.toggleLike(postId, userId);
    int likeCount = postService.getLikeCount(postId);

    Map<String, Object> body = new HashMap<>();
    body.put("liked", liked);
    body.put("likeCount", likeCount);

    return ResponseEntity.ok(ResponseDto.success(body));
  }

  // 댓글 목록
  @GetMapping("/{boardKey}/{postId}/comments")
  public ResponseEntity<ResponseDto<?>> commentsList(@PathVariable String boardKey, @PathVariable Integer postId) {
    System.out.println(postId);
    return ResponseEntity.ok(ResponseDto.success(postService.getComment(postId)));
  }

  // 댓글 작성
  @PostMapping("/{boardKey}/{postId}/comments")
  public ResponseEntity<ResponseDto<?>> insertComment(@PathVariable String boardKey, @PathVariable Integer postId, @RequestBody PostCommentReqDto dto, @AuthenticationPrincipal PrincipalUser principalUser) {
    if (principalUser == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
    }
    if (dto == null || dto.getCommentContent() == null || dto.getCommentContent().isBlank()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "댓글 내용이 비었습니다.");
    }

    Integer userId = principalUser.getUser().getUserId();
    System.out.println(postId);
    System.out.println(dto);
    postService.addComment(postId, userId, dto);
    return ResponseEntity.ok(ResponseDto.success("댓글 작성 성공"));
  }

  // 댓글 수정(본인)
  @PutMapping("/{boardKey}/{postId}/comments/{postCommentId}")
  public ResponseEntity<ResponseDto<?>> updateComment(@PathVariable String boardKey,
                                                      @PathVariable Integer postId,
                                                      @PathVariable Integer postCommentId,   // ★ 경로에서 받기
                                                      @RequestBody PostCommentReqDto dto,    // body에는 commentContent만 있으면 됨
                                                      @AuthenticationPrincipal PrincipalUser principalUser) {
    if (principalUser == null) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
    if (dto == null || dto.getCommentContent() == null || dto.getCommentContent().isBlank())
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "댓글 내용이 비었습니다.");

    Integer userId = principalUser.getUser().getUserId();
    System.out.println(postId);
    System.out.println(dto);
    int updated = postService.updateComment(postId, postCommentId, userId, dto.getCommentContent());

    if (updated == 0) {
      // 존재X/권한X/파라미터 불일치 중 하나
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "수정할 수 없습니다.");
    }

    return ResponseEntity.ok(ResponseDto.success("댓글 수정 성공"));
  }

  // 댓글 삭제(본인)
  @DeleteMapping("/{boardKey}/{postId}/comments/{postCommentId}")
  public ResponseEntity<ResponseDto<?>> deleteComment(@PathVariable String boardKey, @PathVariable Integer postId, @PathVariable Integer postCommentId, @AuthenticationPrincipal PrincipalUser principalUser) {
    if (principalUser == null) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "삭제할 수 없습니다.");
    }

    Integer userId = principalUser.getUser().getUserId();
    postService.deleteComment(postId, postCommentId,userId);
    return ResponseEntity.ok(ResponseDto.success("댓글 삭제 성공"));
  }
}
