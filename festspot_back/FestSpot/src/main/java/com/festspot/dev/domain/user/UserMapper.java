package com.festspot.dev.domain.user;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    int insert(User user);
    User findByUserLoginId(@Param("UserLoginId") String UserLoginId);
}
