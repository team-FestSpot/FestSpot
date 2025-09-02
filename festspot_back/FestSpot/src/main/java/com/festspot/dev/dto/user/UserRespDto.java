package com.festspot.dev.dto.user;

import com.festspot.dev.domain.userRole.UserRole;
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
public class UserRespDto {

  private Integer userId;
  private String userLoginId;
  private String userEmail;
  private String userNickName;
  private String userProfileImgUrl;
  private LocalDateTime createdAt;
  private String provider;
  private String providerId;
  private LocalDateTime deletedAt;

  private List<UserRole> userRoles;
}
