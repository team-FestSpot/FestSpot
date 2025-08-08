package com.festspot.dev.security.handler;

import com.festspot.dev.security.jwt.JwtUtil;
import com.festspot.dev.security.model.PrincipalUser;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();
        String accessToken = jwtUtil.generateAccessToken(principalUser.getUser());
        response.sendRedirect("http://localhost:5173/auth/oauth2/login?accessToken=" + accessToken);
    }
}
