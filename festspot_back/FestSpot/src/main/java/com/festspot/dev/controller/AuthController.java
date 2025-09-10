package com.festspot.dev.controller;

import com.festspot.dev.dto.auth.UserLoginDto;
import com.festspot.dev.dto.auth.UserSignUpDto;
import com.festspot.dev.dto.auth.UserWithdrawDto;
import com.festspot.dev.dto.reponse.ResponseDto;
import com.festspot.dev.dto.user.UserInfoModifyReqDto;
import com.festspot.dev.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  @PostMapping("/signup")
  public ResponseEntity<ResponseDto<?>> signup(@RequestBody @Valid UserSignUpDto dto)
      throws BindException {
    return ResponseEntity.ok(ResponseDto.success(authService.signUp(dto)));
  }

  @PostMapping("/login")
  public ResponseEntity<ResponseDto<?>> login(@RequestBody UserLoginDto dto) {
    System.out.println(dto);
    return ResponseEntity.ok(ResponseDto.success(authService.login(dto)));
  }

  @PutMapping("/withdraw")
  public ResponseEntity<ResponseDto<?>> withdraw(@RequestBody UserWithdrawDto dto) {
    return ResponseEntity.ok(ResponseDto.success(authService.withdraw(dto)));
  }
}
