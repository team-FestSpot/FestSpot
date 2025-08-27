package com.festspot.dev.security.jwt.filter;

import com.festspot.dev.domain.role.RoleMapper;
import com.festspot.dev.domain.user.User;
import com.festspot.dev.domain.user.UserMapper;
import com.festspot.dev.security.jwt.JwtUtil;
import com.festspot.dev.security.model.PrincipalUser;
import io.jsonwebtoken.Claims;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtFilter implements Filter {

  private final JwtUtil jwtUtil;
  private final UserMapper userMapper;

  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse,
      FilterChain filterChain) throws IOException, ServletException {
    HttpServletRequest request = (HttpServletRequest) servletRequest;
    boolean isOption = request.getMethod().equalsIgnoreCase("OPTION");
    if (isOption) {
      filterChain.doFilter(servletRequest, servletResponse);
      return;
    }

    String authorization = request.getHeader("Authorization");
    authenticate(authorization);

    filterChain.doFilter(servletRequest, servletResponse);
  }

  private void authenticate(String token) {
    String validatedToken = jwtUtil.validateBearerToken(token);
    if (validatedToken == null) {
      return;
    }
    Claims claims = jwtUtil.getClaims(validatedToken);
    if (claims == null) {
      return;
    }
    setAuthentication(claims);
  }

  private void setAuthentication(Claims claims) {
    Integer userId = (Integer) claims.get("userId");
    User foundUser = userMapper.findByUserId(userId);
    if (foundUser == null) {
      return;
    }
    
    PrincipalUser principal = PrincipalUser.builder().user(foundUser).build();
    Authentication authentication = new UsernamePasswordAuthenticationToken(principal, "",
        principal.getAuthorities());
    SecurityContextHolder.getContext().setAuthentication(authentication);
  }
}
