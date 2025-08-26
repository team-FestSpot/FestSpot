package com.festspot.dev.dto.admin;

import com.festspot.dev.domain.user.User;
import lombok.Data;

@Data
public class AdminUserInfoModifyReqDto {
    private Integer userId;
    private String userNickName;
    private String userProfileImgUrl;

    public User toEntity() {
        return User.builder()
                .userId(userId)
                .userNickName(userNickName)
                .userProfileImgUrl(userProfileImgUrl)
                .build();
    }
}
