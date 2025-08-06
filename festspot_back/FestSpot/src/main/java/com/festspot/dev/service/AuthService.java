package com.festspot.dev.service;

import com.festspot.dev.domain.user.User;
import com.festspot.dev.domain.user.UserMapper;
import com.festspot.dev.dto.auth.UserSignUpDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final BCryptPasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Transactional(rollbackFor = Exception.class)
    public User signUp(UserSignUpDto dto) throws BindException {
        // 유효성 검사(Login ID 중복 확인)
        User foundUser = userMapper.findByUserLoginId(dto.getUserLoginId());
        if (foundUser != null) {
            BindingResult bindingResult = new BeanPropertyBindingResult(foundUser, "");
            FieldError fieldError = new FieldError("userLoginId", "userLoginId", "이미 존재하는 ID입니다.");
            bindingResult.addError(fieldError);
            throw new BindException(bindingResult);
        }

        User signUpUser = dto.toUser(passwordEncoder);
        userMapper.insert(signUpUser);

        return signUpUser;
    }
}
