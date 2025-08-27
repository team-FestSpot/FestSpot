package com.festspot.dev.exception.auth;

import com.festspot.dev.dto.error.FileErrorDto;
import java.io.File;
import lombok.Data;

@Data
public class FileStoreException extends RuntimeException {

  private FileErrorDto fileErrorDto;

  public FileStoreException(File file, String title, String errorMessage) {
    super(errorMessage);
    this.fileErrorDto = new FileErrorDto(file, title, errorMessage);
  }
}
