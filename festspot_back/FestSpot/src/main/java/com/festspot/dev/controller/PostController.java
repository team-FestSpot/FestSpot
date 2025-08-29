package com.festspot.dev.controller;

import com.festspot.dev.domain.post.PostMapper;
import com.festspot.dev.domain.post.PostSearchOption;
import com.festspot.dev.domain.user.UserMapper;
import com.festspot.dev.dto.post.PostDetailRespDto;
import com.festspot.dev.dto.post.PostRegisterReqDto;
import com.festspot.dev.dto.reponse.ResponseDto;
import com.festspot.dev.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
        postService.getAllPosts(PostSearchOption.builder()
            .startIndex((page - 1) * size + 1)
            .endIndex((page - 1) * size + size)
            .size(size)
            .build()
        )
    ));
  }

  @GetMapping("/{boardKey}")
  public ResponseEntity<ResponseDto<?>> getPosts(@PathVariable String boardKey,
      @RequestParam Integer page, @RequestParam Integer size) {
    return ResponseEntity.ok(ResponseDto.success(postService.getPostsByCategory(
            PostSearchOption.builder()
                .startIndex((page - 1) * size + 1)
                .endIndex((page - 1) * size + size)
                .size(size)
                .build(),
            boardKey
        )
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
    System.out.println(postId);
    postService.disLike(postId);
    return ResponseEntity.ok(ResponseDto.success("좋아요 요청 취소 완료"));
  }

  @PostMapping("/{boardKey}")
  public ResponseEntity<ResponseDto<?>> postRegister(@ModelAttribute PostRegisterReqDto dto) {
    return ResponseEntity.ok(ResponseDto.success(postService.register(dto)));
  }
}
