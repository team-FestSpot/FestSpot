package com.festspot.dev.domain.userRole;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserRoleMapper {

  int insert(UserRole userRole);

  int deleteByUserId(Integer userId);

  int deleteByUserIds(List<Integer> userIds);
}
