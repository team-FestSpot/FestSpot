package com.festspot.dev.controller;

import com.festspot.dev.dto.admin.AdminUploadPerformanceReqDto;
import com.festspot.dev.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
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
    public ResponseEntity<?> uploadPerformance(@RequestBody AdminUploadPerformanceReqDto dto) throws Exception {
        int result = adminService.uploadPerformance(dto);
        if(result < 1) {
            throw new BadRequestException();
        }
        return ResponseEntity.ok("공연 정보 업로드 성공");
    }
}
