package com.festspot.dev.domain.role;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RoleMapper {

  Role findById(Integer roleId);

  Role findByRole(String role);
}
