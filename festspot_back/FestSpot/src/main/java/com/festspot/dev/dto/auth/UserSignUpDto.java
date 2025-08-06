package com.festspot.dev.dto.auth;

import com.festspot.dev.config.BCryptConfig;
import com.festspot.dev.domain.user.User;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;

@Data
public class UserSignUpDto {
    @Pattern(regexp = "^(?=.*[a-z])(?=.*\\d).{4,20}$", message = "아이디는 영문, 숫자를 포함 4~20자여야 합니다.")
    private String userLoginId;
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?]).{8,20}$", message = "비밀번호는 8~20자이며, 영문·숫자·특수문자를 모두 포함해야 합니다.")
    private String userPassword;
    @Pattern(regexp = "^[가-힣]{2,20}$", message = "이름은 한글 2~20자여야 합니다.")
    private String userNickName;
    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$", message = "유효하지 않은 이메일 형식입니다.")
    private String userEmail;
    private LocalDateTime createdAt;

    public User toUser(BCryptPasswordEncoder passwordEncoder) {
        return User.builder()
                .userLoginId(userLoginId)
                .userLoginPassword(passwordEncoder.encode(userPassword))
                .userNickName(userNickName)
                .userEmail(userEmail)
                .userProfileImgUrl("/profile/default.png")
                .build();
    }

}
