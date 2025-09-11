package com.festspot.dev.service;

import com.festspot.dev.domain.user.User;
import com.festspot.dev.domain.user.UserMapper;
import com.festspot.dev.dto.user.UserInfoModifyReqDto;
import com.festspot.dev.dto.user.UserProfileImgModifyReqDto;
import com.festspot.dev.security.model.PrincipalUtil;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class UserService {

  private final BCryptPasswordEncoder passwordEncoder;
  private final UserMapper userMapper;
  private final FileService fileService;
  private final PrincipalUtil principalUtil;

  @Transactional(rollbackFor = Exception.class)
  public String updateUserProfileImg(MultipartFile file) {
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
  public String updateUserInfo(UserInfoModifyReqDto dto) {
    User principalUser = principalUtil.getPrincipal().getUser();
    User foundUser = userMapper.findByUserId(principalUser.getUserId());
    String userPassword = userMapper.findPasswordByUserId(principalUser.getUserId());

    boolean isNicknameDuplicated = dto.getUserNickName().equals(foundUser.getUserNickName());
    boolean isCurrentPasswordCorrect = passwordEncoder.matches(dto.getUserCurrentPassword(),
        userPassword); // 기존 비밀번호 일치 여부 확인 (비밀번호 입력 안했으면 안씀)
    boolean isNewPasswordDuplicated = passwordEncoder.matches(dto.getUserNewPassword(),
        userPassword); // 새 비밀번호가 기존 비밀번호와 같은지(중복인지) 확인 (비밀번호 입력 안했으면 안씀)

    // 비밀번호 입력 안함 + 닉네임 빈칸으로 수정버튼 누름
    if (dto.getUserNewPassword().isEmpty() &&
        dto.getUserCurrentPassword().isEmpty() &&
        dto.getUserNickName().isEmpty()) {
      return "빈 값은 입력할 수 없습니다.";
    }

    // 비밀번호 입력 안함 + 입력한 새 닉네임이 db의 기존 닉네임과 동일함(중복됨)
    else if (dto.getUserNewPassword().isEmpty() && isNicknameDuplicated
    ) {
      return "변경 사항이 없습니다.";
    }

    // 입력한 기존 비밀번호가 db에 저장된 기존 비밀번호와 일치하지 않음
    else if (!dto.getUserCurrentPassword().isEmpty() && !isCurrentPasswordCorrect) {
      return "기존 비밀번호가 일치하지 않습니다.";
    }

    // 입력한 새 비밀번호가 db에 저장된 기존 비밀번호와 같음(중복됨)
    else if (!dto.getUserNewPassword().isEmpty() && isNewPasswordDuplicated) {
      return "기존 비밀번호와 새 비밀번호가 동일합니다.";
    } else {
      // 비밀번호 입력 안 했으면(닉네임만 변경하면) null, 값 있으면(비밀번호만 또는 닉네임이랑 비밀번호 둘 다 변경하면) 암호화해서 넣음
      String encodedPassword = !dto.getUserNewPassword().trim().isEmpty()
          ? passwordEncoder.encode(dto.getUserNewPassword())
          : null;
      User newUserInfo = dto.toEntity(encodedPassword);
      newUserInfo.setUserId(principalUser.getUserId());
      newUserInfo.setUserPassword(encodedPassword);

      if (newUserInfo.getUserNickName().equals(foundUser.getUserNickName())) {
        newUserInfo.setUserNickName(null);
      }
      userMapper.updateNicknameOrPassword(newUserInfo);
      return "사용자 정보가 정상적으로 변경되었습니다.";
    }
  }
}
