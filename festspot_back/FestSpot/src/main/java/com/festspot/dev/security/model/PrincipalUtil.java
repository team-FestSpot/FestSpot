package com.festspot.dev.security.model;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class PrincipalUtil {

  public PrincipalUser getPrincipal() {
    return (PrincipalUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }
}
