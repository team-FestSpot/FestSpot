package com.festspot.dev.controller;

import com.festspot.dev.dto.post.PostCreateReq;
import com.festspot.dev.dto.post.PostDetailDto;
import com.festspot.dev.dto.post.BoardListResDto;
import com.festspot.dev.dto.reponse.ResponseDto;
import com.festspot.dev.security.model.PrincipalUser;
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

    @PostMapping("/post")
    public ResponseEntity<ResponseDto<?>> createPost(@ModelAttribute PostCreateReq postCreateReq) {
        System.out.println(postCreateReq);
//
//        Integer userId = principalUser.getUser().getUserId();
//
//        PostCreateReq postCreateReq = PostCreateReq.builder()
//                .boardKey(boardKey)
//                .title(title)
//                .content(content)
//                .allowComments(allowComments)
//                .build();
//
//        PostDetailDto dto = postService.createPost(userId, postCreateReq, images);
        return ResponseEntity.ok(ResponseDto.success(null));
    }
}
