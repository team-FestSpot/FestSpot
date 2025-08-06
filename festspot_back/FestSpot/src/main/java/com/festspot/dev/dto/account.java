package com.festspot.dev.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class account {
    private MultipartFile profileFile;
}
