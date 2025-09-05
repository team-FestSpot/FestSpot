package com.festspot.dev.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.festspot.dev.domain.performance.Performance;
import com.festspot.dev.dto.admin.AdminUploadPerformanceReqDto;
import com.festspot.dev.dto.admin.AdminUserInfoModifyReqDto;
import com.festspot.dev.dto.auth.TokenDto;
import com.festspot.dev.dto.auth.UserLoginDto;
import com.festspot.dev.dto.reponse.ResponseDto;
import com.festspot.dev.dto.ticketing.TicketingReqDto;
import com.festspot.dev.service.AdminService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.el.parser.Token;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadPerformance(@RequestBody AdminUploadPerformanceReqDto dto) {
        int result = adminService.uploadPerformance(dto);
        if (result == 0) {
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

    @PostMapping("/upload/custom")
    public ResponseEntity<?> uploadCustomPerformance (@RequestPart("data") AdminUploadPerformanceReqDto dto, @RequestPart MultipartFile file) {
        int result = adminService.uploadCustomPerformance(dto, file);
        if (result < 1) {
            return ResponseEntity.badRequest().body(HttpStatus.SERVICE_UNAVAILABLE);
        }
        return ResponseEntity.ok("공연 정보 업로드 성공");
    }

    @GetMapping("/list/custom")
    public ResponseEntity<?> getCustomPerformanceInfoList () {
        return ResponseEntity.ok(ResponseDto.success(adminService.getCustomPerformanceInfoList()));
    }

    @GetMapping("/user/list")
    public ResponseEntity<?> getUserInfoList(){
        return ResponseEntity.ok(ResponseDto.success(adminService.getUserInfoList()));
    }

    @PutMapping("/update/custom")
    public ResponseEntity<?> updateCustomPerformanceInfo (@RequestPart("data") AdminUploadPerformanceReqDto dto,
                                                          @RequestPart("performanceId") Integer performanceId,
                                                          @RequestPart("deletedTicketingList") List<TicketingReqDto> deletedTicketingListDto,
                                                          @RequestPart(required = false) MultipartFile file) {
        adminService.updateCustomPerformanceInfo(dto, performanceId, deletedTicketingListDto, file);
        return ResponseEntity.ok("공연 정보 수정 성공");
    }

    @PutMapping("/update/user")
    public ResponseEntity<ResponseDto<?>> updateCustomPerformanceInfo (@RequestPart("data") AdminUserInfoModifyReqDto dto,
                                                          @RequestPart(required = false) MultipartFile file) {
        return ResponseEntity.ok(ResponseDto.success(adminService.updateUserInfo(dto, file)));
    }

    @DeleteMapping("/delete/performance/{performanceId}")
    public ResponseEntity<?> deletePerformanceInfo (@PathVariable Integer performanceId) {
        adminService.deletePerformanceInfo(performanceId);
        return ResponseEntity.ok("공연 정보 삭제 성공");
    }

    @PutMapping("/delete/user/{userId}")
    public ResponseEntity<?> deleteUser (@PathVariable Integer userId) {
        adminService.deleteUser(userId);
        return ResponseEntity.ok("사용자 삭제 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseDto<?>> login(@RequestBody UserLoginDto dto) {
        TokenDto tokenDto = adminService.adminLogin(dto);
        return ResponseEntity.ok(ResponseDto.success(tokenDto));
    }
}
