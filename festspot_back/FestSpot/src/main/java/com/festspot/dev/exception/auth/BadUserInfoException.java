package com.festspot.dev.exception.auth;

import com.festspot.dev.dto.error.SimpleErrorDto;
import lombok.Data;

@Data
public class BadUserInfoException extends RuntimeException {

  private SimpleErrorDto errorDto;

  public BadUserInfoException(String title, String errorMessage) {
    super(errorMessage);
    this.errorDto = new SimpleErrorDto(title, errorMessage);
  }

}
