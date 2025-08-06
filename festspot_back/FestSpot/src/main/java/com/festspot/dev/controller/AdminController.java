package com.festspot.dev.controller;

import com.festspot.dev.dto.admin.AdminUploadPerformanceReqDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/admin")
public class AdminController {
    @PostMapping("/upload")
    public ResponseEntity<?> uploadPerformance(@RequestBody AdminUploadPerformanceReqDto dto) {
        System.out.println(dto);
        return ResponseEntity.ok("공연 정보 업로드 성공");
    }
}
