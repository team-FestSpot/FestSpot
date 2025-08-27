package com.festspot.dev.dto.auth;

import com.festspot.dev.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSummaryDto {
    private Integer userId;
    private String userNickName;
    private String userProfileImgUrl;

    public static UserSummaryDto toUser(User user) {
        if (user == null) return null;
        UserSummaryDto dto = new UserSummaryDto();
        dto.setUserId(user.getUserId());
        dto.setUserNickName(user.getUserNickName());
        dto.setUserProfileImgUrl(user.getUserProfileImgUrl());
        return dto;
    }
}
