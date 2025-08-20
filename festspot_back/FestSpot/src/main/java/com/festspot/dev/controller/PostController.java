package com.festspot.dev.controller;

import com.festspot.dev.dto.post.PostCreateReq;
import com.festspot.dev.dto.post.PostDetailDto;
import com.festspot.dev.dto.post.BoardListResDto;
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

    @PostMapping("/post/form")
    public ResponseEntity<PostDetailDto> createPost( @RequestParam String boardKey,
                                                     @RequestParam String title,
                                                     @RequestParam String content,
                                                     @RequestParam(defaultValue = "true") boolean allowComments,
                                                     @RequestPart(value = "images", required = false) List<MultipartFile> images,
                                                     Principal principal) {

        Long userId = principal != null ? Long.parseLong(principal.getName()) : null;
        if (userId == null) { // 사용자가 아닌 경우
            return ResponseEntity.status(401).build();
        }

        PostCreateReq postCreateReq = PostCreateReq.builder()
                .boardKey(boardKey)
                .title(title)
                .content(content)
                .allowComments(allowComments)
                .build();

        PostDetailDto dto = postService.createPost(userId, postCreateReq, images);
        return ResponseEntity.ok(dto);
    }
}
