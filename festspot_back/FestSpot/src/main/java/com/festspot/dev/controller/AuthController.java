package com.festspot.dev.controller;

import com.festspot.dev.dto.auth.UserLoginDto;
import com.festspot.dev.dto.auth.UserSignUpDto;
import com.festspot.dev.dto.reponse.ResponseDto;
import com.festspot.dev.service.AuthService;
import com.festspot.dev.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> singup(@RequestBody @Valid UserSignUpDto dto) throws BindException {
        return ResponseEntity.ok(ResponseDto.success(authService.signUp(dto)));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDto dto) {
        System.out.println(dto);
        return ResponseEntity.ok(ResponseDto.success(authService.login(dto)));
    }
}
