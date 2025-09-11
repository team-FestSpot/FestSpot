package com.festspot.dev.service;

import com.festspot.dev.domain.role.Role;
import com.festspot.dev.domain.role.RoleMapper;
import com.festspot.dev.domain.user.User;
import com.festspot.dev.domain.user.UserMapper;
import com.festspot.dev.domain.userRole.UserRole;
import com.festspot.dev.domain.userRole.UserRoleMapper;
import com.festspot.dev.dto.auth.TokenDto;
import com.festspot.dev.dto.auth.UserLoginDto;
import com.festspot.dev.dto.auth.UserSignUpDto;
import com.festspot.dev.dto.auth.UserWithdrawDto;
import com.festspot.dev.exception.auth.LoginException;
import com.festspot.dev.security.jwt.JwtUtil;
import com.festspot.dev.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.List;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final RoleMapper roleMapper;
    private final UserRoleMapper userRoleMapper;
    private final PrincipalUtil principalUtil;

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


        final String DEFAULT_USER_ROLE = "ROLE_USER";
        Role foundRole = roleMapper.findByRole(DEFAULT_USER_ROLE);

        UserRole userRole = UserRole.builder()
                .userId(signUpUser.getUserId())
                .roleId(foundRole.getRoleId())
                .build();
        userRoleMapper.insert(userRole);

        userRole.setRole(foundRole);
        signUpUser.setUserRoles(List.of(userRole));

        return signUpUser;
    }

    public TokenDto login(UserLoginDto dto) {
        User foundUser = userMapper.findByUserLoginId(dto.getUserLoginId());

        if(foundUser == null) {
            throw new LoginException("로그인 오류", "사용자 정보를 다시 확인하세요.");
        }

        if(!passwordEncoder.matches(dto.getUserPassword(), foundUser.getUserPassword())) {
            throw new LoginException("로그인 오류", "비밀번호를 다시 확인하세요.");
        }

        return TokenDto.builder()
                .accessToken(jwtUtil.generateAccessToken(foundUser))
                .build();
    }

    @Transactional(rollbackFor = Exception.class)
    public String withdraw(UserWithdrawDto dto) {
        int userId = principalUtil.getUserIdOrNull();
        String userPassword = userMapper.findPasswordByUserId(userId);
        if(!passwordEncoder.matches(dto.getPassword(), userPassword)) {
            return "비밀번호가 일치하지 않습니다.";
        }
        int result = userMapper.updateDeletedDateByUserId(userId);
        if(result == 0) {
            return "회원 탈퇴 중 오류가 발생했습니다.";
        }
        return "회원 탈퇴가 완료되었습니다.";
    }
}
