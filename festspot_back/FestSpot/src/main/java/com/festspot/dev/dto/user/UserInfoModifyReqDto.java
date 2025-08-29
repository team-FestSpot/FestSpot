package com.festspot.dev.dto.user;

import com.festspot.dev.domain.user.User;
import lombok.Data;

@Data
public class UserInfoModifyReqDto {
    private String userNickName;
    private String userCurrentPassword;
    private String userNewPassword;

    public User toEntity(String encodedPassword) {
        return User.builder()
                .userNickName(userNickName)
                .userPassword(encodedPassword)
                .build();
    }
}
