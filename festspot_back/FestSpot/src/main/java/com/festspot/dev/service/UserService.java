package com.festspot.dev.service;

import com.festspot.dev.domain.user.User;
import com.festspot.dev.domain.user.UserMapper;
import com.festspot.dev.dto.user.UserInfoModifyReqDto;
import com.festspot.dev.dto.user.UserProfileImgModifyReqDto;
import com.festspot.dev.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserService {
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final FileService fileService;
    private final PrincipalUtil principalUtil;

    @Transactional(rollbackFor = Exception.class)
    public String updateUserProfileImg (MultipartFile file) {
        Integer userId = principalUtil.getPrincipal().getUser().getUserId();
        UserProfileImgModifyReqDto dto = new UserProfileImgModifyReqDto();
        dto.setUserId(userId);
        if (!Objects.isNull(file) && file.getSize() > 0) {
            fileService.deleteFile(userMapper.findByUserId(userId).getUserProfileImgUrl(), "profile");
            dto.setUserProfileImgUrl(fileService.uploadFile(file, "profile"));
        }

        if (dto.getUserId() > -1) {
            User user = dto.toEntity();
            User beforeUser = userMapper.findByUserId(user.getUserId());
            User userBefore = User.builder()
                    .userId(beforeUser.getUserId())
                    .userProfileImgUrl(beforeUser.getUserProfileImgUrl())
                    .build();
            if (userBefore.equals(user) && Objects.isNull(file)) {
                return "변경된 값이 없습니다.";
            }
            userMapper.updateProfileImgPathById(userId, user.getUserProfileImgUrl());
            return "프로필 이미지가 성공적으로 변경되었습니다.";
        }
        return "프로필 이미지 변경에 실패했습니다.";
    }

    @Transactional(rollbackFor = Exception.class)
    public String updateUserInfo (UserInfoModifyReqDto dto) {
        System.out.println(dto);
        User foundUser = userMapper.findByUserId(dto.getUserId());
        boolean isCorrect = passwordEncoder.matches(dto.getUserCurrentPassword(),
                foundUser.getUserPassword());
        boolean isDuplicated = passwordEncoder.matches(dto.getUserNewPassword(),
                foundUser.getUserPassword());

        if(dto.getUserNewPassword().isEmpty() &&
            dto.getUserNickName().equals(foundUser.getUserNickName())) {
            return "입력한 닉네임이 기존 닉네임과 동일합니다.";
        }

        if(!isCorrect) {
            return "기존 비밀번호가 일치하지 않습니다.";
        }

        if(!dto.getUserNewPassword().isEmpty() && isDuplicated) {
            return "기존 비밀번호와 새 비밀번호가 동일합니다.";
        }

        userMapper.updateNicknameOrPassword(dto.toEntity(passwordEncoder.encode(dto.getUserNewPassword())));
        return "사용자 정보가 정상적으로 변경되었습니다.";
    }
}
