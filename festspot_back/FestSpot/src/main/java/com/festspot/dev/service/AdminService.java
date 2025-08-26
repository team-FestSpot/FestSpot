package com.festspot.dev.service;

import com.festspot.dev.domain.performance.Performance;
import com.festspot.dev.domain.performance.PerformanceMapper;
import com.festspot.dev.domain.performance.performanceRegion.PerformanceRegion;
import com.festspot.dev.domain.performance.performanceRegion.PerformanceRegionMapper;
import com.festspot.dev.domain.performance.performanceState.PerformanceState;
import com.festspot.dev.domain.performance.performanceState.PerformanceStateMapper;
import com.festspot.dev.domain.ticketing.TicketingUrl;
import com.festspot.dev.domain.ticketing.TicketingUrlMapper;
import com.festspot.dev.domain.user.User;
import com.festspot.dev.domain.user.UserMapper;
import com.festspot.dev.domain.userRole.UserRole;
import com.festspot.dev.domain.userRole.UserRoleMapper;
import com.festspot.dev.dto.admin.AdminGetCustomPerformanceRespDto;
import com.festspot.dev.dto.admin.AdminUploadPerformanceReqDto;
import com.festspot.dev.dto.admin.AdminUserInfoModifyReqDto;
import com.festspot.dev.dto.auth.TokenDto;
import com.festspot.dev.dto.auth.UserLoginDto;
import com.festspot.dev.dto.ticketing.TicketingReqDto;

import java.util.List;
import java.util.Objects;

import com.festspot.dev.exception.auth.LoginException;
import com.festspot.dev.security.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final PerformanceMapper performanceMapper;
    private final PerformanceRegionMapper performanceRegionMapper;
    private final PerformanceStateMapper performanceStateMapper;
    private final TicketingUrlMapper ticketingUrlMapper;
    private final FileService fileService;
    private final UserMapper userMapper;
    private final UserRoleMapper userRoleMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // 관리자용 로그인 서비스
    @Transactional(rollbackFor = Exception.class)
    public TokenDto adminLogin(UserLoginDto dto) {
        User foundUser = userMapper.findByUserLoginId(dto.getUserLoginId());
        System.out.println(foundUser);

        // 권한 확인해서 관리자(roleId == 1) 아니면 예외 처리
        List<UserRole> result = userRoleMapper.findByUserId(foundUser.getUserId());
        result.forEach(userRole -> {
            if (userRole.getRoleId() != 1) {
                throw new LoginException("로그인 오류", "사용자 정보를 다시 확인하세요.");
            }
        });

        if(foundUser == null) {
            throw new LoginException("로그인 오류", "사용자 정보를 다시 확인하세요.");
        }

        if(!passwordEncoder.matches(dto.getUserPassword(), foundUser.getUserPassword())) {
            throw new LoginException("로그인 오류", "비밀번호를 다시 확인하세요.");
        }

        return TokenDto.builder()
                .accessToken(jwtUtil.generateAccessToken(foundUser))
                .build();
    }

    @Transactional(rollbackFor = Exception.class)
    public int uploadPerformance(AdminUploadPerformanceReqDto dto) {
        System.out.println(dto);
        if (performanceMapper.findByPerformanceApiId(dto.getMt20id()) != null) {
            return 0;
        }

        PerformanceRegion performanceRegion = performanceRegionMapper.findByRegionName(
                dto.getArea());
        PerformanceState performanceState = performanceStateMapper.findByState(dto.getPrfstate());

        Performance performance = dto.toEntity(performanceRegion, performanceState);
        int performanceInsert = performanceMapper.insert(performance);

        // 예매처 dto 객체가 담긴 List 생성
        // 예매처 링크는 배열 안에 객체(예매처명, 예매처링크)가 들어있는 형태로 날아옴
        List<TicketingUrl> ticketingUrls = dto.getRelates().stream()
                .map(relate -> relate.toEntity(performance.getPerformanceId())).toList();
        int ticketingUrlInsert = ticketingUrlMapper.insert(ticketingUrls);

        return performanceInsert * ticketingUrlInsert;
    }

    @Transactional(rollbackFor = Exception.class)
    public int uploadManyPerformance(List<AdminUploadPerformanceReqDto> dtos) {

        List<Performance> performanceList = dtos.stream().map(dto -> {
            PerformanceRegion performanceRegion = performanceRegionMapper.findByRegionName(
                    dto.getArea());
            PerformanceState performanceState = performanceStateMapper.findByState(dto.getPrfstate());
            return dto.toEntity(performanceRegion, performanceState);
        }).toList();
        int result = performanceMapper.insertMany(performanceList);

        // 예매처 dto들이 담긴 list가 담긴 list를 예매처 entity들이 담긴 list가 담긴 list로 변환
        List<List<TicketingUrl>> TicketingUrls = performanceList.stream().map(perform -> {
            List<TicketingReqDto> relates = dtos.stream()
                    .filter(dto -> Objects.equals(dto.getMt20id(), perform.getPerformanceApiId()))
                    .findFirst().orElseThrow()
                    .getRelates();
            return relates.stream().map(relate -> relate.toEntity(perform.getPerformanceId())).toList();
        }).toList();

        // 각 공연들의 예매처 정보들을 relate 테이블에 저장
        ticketingUrlMapper.insertMany(TicketingUrls);

        return result;
    }

    @Transactional(rollbackFor = Exception.class)
    public int uploadCustomPerformance(AdminUploadPerformanceReqDto dto, MultipartFile file) {
        String newFileName = fileService.uploadFile(file, "/poster");
        String url = "/upload/poster/" + newFileName;
        dto.setPoster(url);
        PerformanceRegion performanceRegion = performanceRegionMapper.findByRegionName(
                dto.getArea());
        PerformanceState performanceState = performanceStateMapper.findByState(dto.getPrfstate());

        Performance performance = dto.toEntity(performanceRegion, performanceState);

        int performanceInsert = performanceMapper.insert(performance);

        List<TicketingUrl> ticketingUrls = dto.getRelates().stream()
                .map(relate -> relate.toEntity(performance.getPerformanceId())).toList();
        int ticketingUrlInsert = ticketingUrlMapper.insert(ticketingUrls);

        return performanceInsert * ticketingUrlInsert;
    }

    public List<AdminGetCustomPerformanceRespDto> getCustomPerformanceInfoList() {
        List<Performance> performanceList = performanceMapper.findByPerformanceApiIdIsNull();
        return performanceList.stream().map(performance -> performance.toPerformanceDto()).toList();
    }

    public List<User> getUserInfoList() {
        return userMapper.findAllUsers();
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateCustomPerformanceInfo(AdminUploadPerformanceReqDto dto, Integer performanceId, List<TicketingReqDto> deletedTicketingDto, MultipartFile file) {
        if(!Objects.isNull(file) && file.getSize() > 0) {
            fileService.deleteFile(dto.getPoster());
            dto.setPoster("/upload/poster/" + fileService.uploadFile(file, "/poster"));
        }

        PerformanceRegion performanceRegion = performanceRegionMapper.findByRegionName(
                dto.getArea());
        PerformanceState performanceState = performanceStateMapper.findByState(dto.getPrfstate());
        Performance performance = dto.toEntity(performanceRegion, performanceState);
        performance.setPerformanceId(performanceId);
        performanceMapper.update(performance);

        List<TicketingUrl> ticketingUrls = dto.getRelates().stream()
                .map(relate -> relate.toEntity(performanceId)).toList();
        List<TicketingUrl> deletedTicketingUrls = deletedTicketingDto.stream()
                .map(relate -> relate.toEntity(performanceId)).toList();
        System.out.println(ticketingUrls);
        if(!deletedTicketingUrls.isEmpty()) {
            ticketingUrlMapper.deleteMissing(deletedTicketingUrls);
        }
        ticketingUrlMapper.insert(ticketingUrls);
    }

    @Transactional(rollbackFor = Exception.class)
    public int updateUserInfo(AdminUserInfoModifyReqDto dto, MultipartFile file) {
        if(!Objects.isNull(file) && file.getSize() > 0) {
            fileService.deleteFile(dto.getUserProfileImgUrl());
            dto.setUserProfileImgUrl("/upload/profile/" + fileService.uploadFile(file, "/profile"));
        }
            if(dto.getUserId() > -1) {
            User user = dto.toEntity();
            User beforeUser = userMapper.findByUserId(user.getUserId());
            User userBefore = User.builder()
                    .userId(beforeUser.getUserId())
                    .userNickName(beforeUser.getUserNickName())
                    .userProfileImgUrl(beforeUser.getUserProfileImgUrl())
                    .build();
            if(userBefore.equals(user) && Objects.isNull(file)) {
                System.out.println("수정된 값 없음");
                return 0;
            }
            return userMapper.updateByUserId(user);
        }
        return 0;
    }

    public void deletePerformanceInfo (Integer performanceId) {
        System.out.println(performanceId);
        performanceMapper.deleteById(performanceId);
    }

    public void deleteUser (Integer userId) {
        userMapper.updateDeletedDateByUserId(userId);
    }
}
