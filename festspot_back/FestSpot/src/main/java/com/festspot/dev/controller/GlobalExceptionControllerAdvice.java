package com.festspot.dev.controller;

import com.festspot.dev.dto.error.FileErrorDto;
import com.festspot.dev.dto.error.SimpleErrorDto;
import com.festspot.dev.dto.reponse.ResponseDto;
import com.festspot.dev.exception.auth.BadUserInfoException;
import com.festspot.dev.exception.auth.FileStoreException;
import com.festspot.dev.exception.auth.LoginException;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionControllerAdvice {

  @ExceptionHandler(BindException.class)
  public ResponseEntity<ResponseDto<?>> validException(BindException e) {
    Map<String, String> errorMap = e.getFieldErrors()
        .stream()
        .collect(Collectors
            .toMap(
                (fieldError) -> fieldError.getField(),
                (fieldError) -> fieldError.getDefaultMessage()
            ));
    System.out.println(errorMap);
    return ResponseEntity.badRequest()
        .body(ResponseDto.fail(HttpStatus.BAD_REQUEST, "요청 데이터 유효성 검사 오류", errorMap));
  }

  @ExceptionHandler(LoginException.class)
  public ResponseEntity<ResponseDto<SimpleErrorDto>> loginError(LoginException e) {
    return ResponseEntity.badRequest()
        .body(ResponseDto.fail(HttpStatus.BAD_REQUEST, "로그인 정보 오류", e.getErrorDto()));
  }

  @ExceptionHandler(DuplicateKeyException.class)
  public ResponseEntity<ResponseDto<String>> duplicateUsername(DuplicateKeyException e) {
    return ResponseEntity.badRequest()
        .body(ResponseDto.fail(HttpStatus.BAD_REQUEST, "중복 키 오류", e.getMessage()));
  }

  @ExceptionHandler(FileStoreException.class)
  public ResponseEntity<ResponseDto<FileErrorDto>> fileError(FileStoreException e) {
    return ResponseEntity.badRequest()
        .body(ResponseDto.fail(HttpStatus.BAD_REQUEST, "잘못된 파일 형식", e.getFileErrorDto()));
  }

  @ExceptionHandler(BadUserInfoException.class)
  public ResponseEntity<ResponseDto<?>> badUserInfoError(BadUserInfoException e) {
    return ResponseEntity.badRequest()
        .body(ResponseDto.fail(HttpStatus.UNAUTHORIZED, "잘못된 인증", e.getMessage()));
  }
}
