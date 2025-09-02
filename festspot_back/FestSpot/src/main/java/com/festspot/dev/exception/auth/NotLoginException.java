package com.festspot.dev.exception.auth;

import com.festspot.dev.dto.error.SimpleErrorDto;
import lombok.Data;

@Data
public class NotLoginException extends RuntimeException {

  private SimpleErrorDto errorDto;

  public NotLoginException(String title, String errorMessage) {
    super(errorMessage);
    this.errorDto = new SimpleErrorDto(title, errorMessage);
  }

}
