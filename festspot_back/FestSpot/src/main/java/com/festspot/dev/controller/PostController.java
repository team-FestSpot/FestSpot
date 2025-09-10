package com.festspot.dev.controller;

import com.festspot.dev.dto.post.PostDetailRespDto;
import com.festspot.dev.dto.post.PostRegisterReqDto;
import com.festspot.dev.dto.reponse.ResponseDto;
import com.festspot.dev.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class PostController {

  private final PostService postService;

  @GetMapping("/{boardKey}")
  public ResponseEntity<ResponseDto<?>> getPosts(
      @RequestParam Integer page, Integer size, @PathVariable String boardKey) {
    if (boardKey.equals("all")) {
      return ResponseEntity.ok(ResponseDto.success(
          postService.getAllPosts(page, size)
      ));
    }
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
    return ResponseEntity.ok(ResponseDto.success(postService.getPost(postId)));
  }

  @GetMapping("/{postId}/posts")
  public ResponseEntity<ResponseDto<?>> getPageNumByPostId(@PathVariable Integer postId,
      @RequestParam Integer size,
      @RequestParam Integer postCategoryId) {
    return ResponseEntity.ok(
        ResponseDto.success(postService.getPageNumByPostId(postId, postCategoryId, size)));
  }

  @PostMapping("/{boardKey}")
  public ResponseEntity<ResponseDto<?>> postRegister(@ModelAttribute PostRegisterReqDto dto) {
    return ResponseEntity.ok(ResponseDto.success(postService.register((dto))));
  }

  @PutMapping("/{postId}")
  public ResponseEntity<ResponseDto<?>> postPut(@ModelAttribute PostRegisterReqDto dto,
      @PathVariable Integer postId) {
    return ResponseEntity.ok(ResponseDto.success(postService.update(dto, postId)));
  }

  @DeleteMapping("/{postId}")
  public ResponseEntity<ResponseDto<?>> postDelete(@PathVariable Integer postId) {
    return ResponseEntity.ok(ResponseDto.success(postService.delete(postId)));
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

}
