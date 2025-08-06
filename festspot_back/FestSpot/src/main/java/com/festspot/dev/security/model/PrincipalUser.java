package com.festspot.dev.security.model;

import com.festspot.dev.domain.user.User;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

@Data
@Builder
public class PrincipalUser implements UserDetails, OAuth2User {

  private User user;
  private Map<String, Object> attributes;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of();
  }

  @Override
  public String getName() {
    return "";
  }

  @Override
  public String getPassword() {
    return "";
  }

  @Override
  public String getUsername() {
    return "";
  }
}
