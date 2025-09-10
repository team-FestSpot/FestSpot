package com.festspot.dev.security.handler;

import com.festspot.dev.security.jwt.JwtUtil;
import com.festspot.dev.security.model.PrincipalUser;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

  @Value("${app.web-host}")
  private String webHost;
  private final JwtUtil jwtUtil;

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
      Authentication authentication) throws IOException, ServletException {
    PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();
    String accessToken = jwtUtil.generateAccessToken(principalUser.getUser());
    response.sendRedirect(webHost + "/auth/oauth2/login?accessToken=" + accessToken);
  }
}
