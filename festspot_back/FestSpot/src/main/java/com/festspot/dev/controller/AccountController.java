package com.festspot.dev.controller;

import com.festspot.dev.dto.reponse.ResponseDto;
import com.festspot.dev.security.model.PrincipalUser;
import com.festspot.dev.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @GetMapping("/account/principal")
    public ResponseEntity<?> pricipal(@AuthenticationPrincipal PrincipalUser principalUser) {
        return ResponseEntity.ok(ResponseDto.success(principalUser));
    }

    @PostMapping("/account/profile/img")
    public ResponseEntity<?> updateProfileImg(@AuthenticationPrincipal PrincipalUser principalUser, @RequestPart("profileFile") MultipartFile profileFile) {
        String filePath = accountService.updateProfileImg(principalUser.getUser(), profileFile);
        return ResponseEntity.ok(ResponseDto.success(filePath));
    }
}
