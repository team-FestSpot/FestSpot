package com.festspot.dev.controller;

import com.festspot.dev.dto.post.PostDetailDto;
import com.festspot.dev.dto.post.PostListRespDto;
import com.festspot.dev.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping("/board/{boardKey}/posts")
    public ResponseEntity<PostListRespDto> getList(@PathVariable String boardKey, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(postService.getPosts(boardKey, page, size));
    }

    @GetMapping("/posts/{postId}")
    public ResponseEntity<PostDetailDto> detail(@PathVariable int postId) {
        return ResponseEntity.ok(postService.getPost(postId));
    }

    @PostMapping(value = "/boards/{boardKey}/posts", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> create(
            @PathVariable String boardKey,
            @RequestPart String postTitle,
            @RequestPart String postContent,
            @RequestPart(required = false) List<MultipartFile> images,
            Principal principal // 또는 @AuthenticationPrincipal
    ) {
        int authorId = /* principal에서 추출 */ 1;
        int id = postService.createPost(boardKey, authorId, postTitle, postContent, images);
        return ResponseEntity.ok(Map.of("postId", id));
    }
}
