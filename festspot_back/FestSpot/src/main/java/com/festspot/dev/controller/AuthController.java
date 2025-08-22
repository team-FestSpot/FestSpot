package com.festspot.dev.controller;

import com.festspot.dev.dto.auth.UserLoginDto;
import com.festspot.dev.dto.auth.UserSignUpDto;
import com.festspot.dev.dto.reponse.ResponseDto;
import com.festspot.dev.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
  public ResponseEntity<ResponseDto<?>> signup(@RequestBody @Valid UserSignUpDto dto)
      throws BindException {
    System.out.println(dto);
    return ResponseEntity.ok(ResponseDto.success(authService.signUp(dto)));
  }

  @PostMapping("/login")
  public ResponseEntity<ResponseDto<?>> login(@RequestBody UserLoginDto dto) {
    System.out.println(dto);
    return ResponseEntity.ok(ResponseDto.success(authService.login(dto)));
  }
}
