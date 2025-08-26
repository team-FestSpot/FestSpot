package com.festspot.dev.controller;

import com.festspot.dev.domain.post.PostSearchOption;
import com.festspot.dev.dto.reponse.ResponseDto;
import com.festspot.dev.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class PostController {

  private final PostService postService;

  @GetMapping()
  public ResponseEntity<ResponseDto<?>> getAllPosts(@RequestParam Integer page, Integer size) {

    return ResponseEntity.ok(ResponseDto.success(
        postService.getAllPosts(PostSearchOption.builder()
            .startIndex((page - 1) * size)
            .size(size)
            .build()
        )
    ));
  }

  @GetMapping("/{boardKey}")
  public ResponseEntity<ResponseDto<?>> getPosts(@PathVariable String boardKey,
      @RequestParam Integer page, Integer size) {
    return ResponseEntity.ok(ResponseDto.success(postService.getPostsByCategory(
            PostSearchOption.builder()
                .startIndex((page - 1) * size)
                .size(size)
                .build(),
            boardKey
        )
    ));
  }

  @GetMapping("/{boardKey}/{postId}")
  public ResponseEntity<ResponseDto<?>> getPost(@PathVariable Integer postId) {
    System.out.println(postId);
    postService.getPost(postId);
    return ResponseEntity.ok(ResponseDto.success(postService.getPost(postId)));
  }
}
