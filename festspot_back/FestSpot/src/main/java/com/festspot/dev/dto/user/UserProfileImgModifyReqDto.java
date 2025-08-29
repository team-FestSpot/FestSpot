package com.festspot.dev.dto.user;

import com.festspot.dev.domain.user.User;
import lombok.Data;

@Data
public class UserProfileImgModifyReqDto {
    private Integer userId;
    private String userProfileImgUrl;

    public User toEntity() {
        return User.builder()
                .userId(userId)
                .userProfileImgUrl(userProfileImgUrl)
                .build();
    }
}
