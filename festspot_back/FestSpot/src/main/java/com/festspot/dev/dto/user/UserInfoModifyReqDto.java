package com.festspot.dev.dto.user;

import com.festspot.dev.domain.user.User;
import lombok.Data;

@Data
public class UserInfoModifyReqDto {
    private Integer userId;
    private String userNickName;
    private String userCurrentPassword;
    private String userNewPassword;

    public User toEntity(String encodedPassword) {
        return User.builder()
                .userId(userId)
                .userNickName(userNickName)
                .userPassword(encodedPassword)
                .build();
    }
}
