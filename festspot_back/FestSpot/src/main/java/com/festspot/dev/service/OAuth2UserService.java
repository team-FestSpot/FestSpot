package com.festspot.dev.service;

import com.festspot.dev.domain.user.User;
import com.festspot.dev.domain.user.UserMapper;
import com.festspot.dev.security.model.PrincipalUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {

    private final UserMapper userMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String email = null;
        String name = null;
        String providerId = null;
        String profileImage = null;

        OAuth2User oAuth2User = super.loadUser(userRequest);

        Map<String, Object> attributes = null;
        if ("google".equals(registrationId)) {
            // Google에서 제공하는 정보를 가져옴.
            email = oAuth2User.getAttribute("email");
            name = oAuth2User.getAttribute("name");
            providerId = oAuth2User.getAttribute("sub");
        } else if ("kakao".equals(registrationId)) {
            // kakao에서 제공하는 정보를 가져옴.
            attributes = oAuth2User.getAttributes();
            Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
            Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
            email = kakaoAccount.get("email").toString();
            name = profile.get("nickname").toString();
            providerId = attributes.get("id").toString();
        } else if ("naver".equals(registrationId)) {
            Map<String, Object> response = (Map<String, Object>) attributes.get("response");

            email = response.get("email").toString();
            name = response.get("nickname").toString();
            providerId = response.get("id").toString();
            profileImage = response.get("profile_image").toString();
        } else {
            throw new OAuth2AuthenticationException("지원하지 않는 소셜 로그인입니다: " + registrationId);
        }

        User user = userMapper.findByUserLoginId(email);

        if (user == null) {
            user = User.builder()
                    .userLoginId(email)
                    .userPassword(passwordEncoder.encode(UUID.randomUUID().toString()))
                    .userNickName(name)
                    .userEmail(email)
                    .userProfileImgUrl("/profile/default.png")
                    .provider(registrationId)
                    .providerId(providerId)
                    .build();

        }

        System.out.println("user - " + user);

        userMapper.insert(user);

        return PrincipalUser.builder()
                .user(user)
                .attributes(oAuth2User.getAttributes())
                .build();
    }
}
