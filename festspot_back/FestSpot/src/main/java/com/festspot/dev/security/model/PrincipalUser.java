package com.festspot.dev.security.model;

import com.festspot.dev.domain.role.Role;
import com.festspot.dev.domain.user.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import com.festspot.dev.domain.userRole.UserRole;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

@Data
@Builder
public class PrincipalUser implements UserDetails, OAuth2User {

  private User user;
  private Map<String, Object> attributes;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    Collection<GrantedAuthority> collectors = new ArrayList<>();
    if(user.getUserRoles() != null && !user.getUserRoles().isEmpty()) {
      for(UserRole userRole : user.getUserRoles()) {
        collectors.add(new SimpleGrantedAuthority(userRole.getRole().getRoleName()));
      }
      return collectors;
    }
    return List.of();
  }

  @Override
  public String getName() {
    return "";
  }

  @Override
  public String getPassword() {
    return user.getUserPassword();
  }

  @Override
  public String getUsername() {
    return user.getUserNickName();
  }
}
