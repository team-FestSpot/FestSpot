package com.festspot.dev.controller;

import com.festspot.dev.dto.reponse.ResponseDto;
import com.festspot.dev.dto.user.UserInfoModifyReqDto;
import com.festspot.dev.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PutMapping("/update/image")
    public ResponseEntity<ResponseDto<?>> updateUserProfileImg (@RequestParam MultipartFile file) {
        String result = userService.updateUserProfileImg(file);
        if(result.isEmpty()) {
            return ResponseEntity.ok(ResponseDto.fail(HttpStatus.BAD_REQUEST, "프로필 변경에 실패했습니다.", result));
        }
        return ResponseEntity.ok(ResponseDto.success(result));

    }@PutMapping("/update/info")
    public ResponseEntity<ResponseDto<?>> updateUserInfo (@RequestBody UserInfoModifyReqDto dto) {
        return ResponseEntity.ok(ResponseDto.success(userService.updateUserInfo(dto)));
    }
}
