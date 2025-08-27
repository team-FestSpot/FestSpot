package com.festspot.dev.dto.error;

import java.io.File;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FileErrorDto {

  private File file;
  private String title;
  private String errorMessage;

}
