package com.festspot.dev.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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

}
