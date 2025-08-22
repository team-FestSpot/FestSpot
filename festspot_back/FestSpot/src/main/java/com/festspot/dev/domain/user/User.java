package com.festspot.dev.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

  private List<UserRole> userRoles;
}
