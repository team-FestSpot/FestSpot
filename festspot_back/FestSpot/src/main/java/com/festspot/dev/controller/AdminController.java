package com.festspot.dev.controller;

import com.festspot.dev.dto.admin.AdminUploadPerformanceReqDto;
import com.festspot.dev.service.AdminService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadPerformance(@RequestBody AdminUploadPerformanceReqDto dto) {
        if (adminService.uploadPerformance(dto) == 0) {
            return ResponseEntity.badRequest().body(HttpStatus.SERVICE_UNAVAILABLE);
        }
        return ResponseEntity.ok("공연 정보 업로드 성공");
    }

    @PostMapping("/uploads")
    public ResponseEntity<?> uploadManyPerformances(
            @RequestBody List<AdminUploadPerformanceReqDto> dtos) {
        int result = adminService.uploadManyPerformance(dtos);
        if (result < 1) {
            return ResponseEntity.badRequest().body(HttpStatus.SERVICE_UNAVAILABLE);
        }
        return ResponseEntity.ok("공연 정보 다중 업로드 성공");
    }

}