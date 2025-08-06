package com.festspot.dev.domain.user;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    int insert(User user);
    User findByUserLoginId(String userLoginId);
    User findByUserId(Integer userId);

    // 프로필 사진 수정 시
    int updateProfileImgPathById(@Param("userId") Integer userId, @Param("path") String path);
}
