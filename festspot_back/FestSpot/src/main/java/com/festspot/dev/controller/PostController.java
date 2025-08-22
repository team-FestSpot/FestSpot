package com.festspot.dev.controller;

import com.festspot.dev.dto.reponse.ResponseDto;
import com.festspot.dev.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping("/board")
    public ResponseEntity<ResponseDto<?>> getAllPosts(@RequestParam Integer page, Integer size) {
        return ResponseEntity.ok(ResponseDto.success(null));
    }

    @GetMapping("{boardKey}")
    public ResponseEntity<ResponseDto<?>> getPosts(@RequestParam String boardKey,Integer page, Integer size) {
        return ResponseEntity.ok(ResponseDto.success(null));
    }
}
