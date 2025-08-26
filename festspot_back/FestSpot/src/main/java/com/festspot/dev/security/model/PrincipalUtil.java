package com.festspot.dev.security.model;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class PrincipalUtil {

  public PrincipalUser getPrincipal() {
    return (PrincipalUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }

  public Integer getUserIdOrNull() {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if(auth == null) return null;
    Object principal = auth.getPrincipal();
    if(principal instanceof PrincipalUser p) {
      return p.getUser().getUserId();
    }

    return null;
  }
}
