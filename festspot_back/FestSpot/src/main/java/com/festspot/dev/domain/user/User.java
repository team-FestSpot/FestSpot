package com.festspot.dev.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.festspot.dev.domain.userRole.UserRole;
import com.festspot.dev.dto.user.UserRespDto;
import com.festspot.dev.util.ImageUrlUtil;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

  private Integer userId;
  private String userLoginId;
  @JsonIgnore
  private String userPassword;
  private String userEmail;
  private String userNickName;
  private String userProfileImgUrl;
  private LocalDateTime createdAt;
  private String provider;
  private String providerId;
  private LocalDateTime deletedAt;

  private List<UserRole> userRoles;

  public UserRespDto toRespDto(ImageUrlUtil imageUrlUtil) {
    return UserRespDto.builder()
        .userId(userId)
        .userLoginId(userLoginId)
        .userEmail(userEmail)
        .userNickName(userNickName)
        .userProfileImgUrl(imageUrlUtil.buildImageUrl(userProfileImgUrl, "profile"))
        .createdAt(createdAt)
        .provider(provider)
        .providerId(providerId)
        .deletedAt(deletedAt)
        .build();
  }
}
