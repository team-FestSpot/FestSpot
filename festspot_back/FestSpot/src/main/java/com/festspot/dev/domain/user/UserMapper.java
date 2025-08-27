package com.festspot.dev.domain.user;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper {
    int insert(User user);
    User findByUserLoginId(String userLoginId);
    User findByUserId(Integer userId);

    List<User> findAllUsers();

    int updateByUserId(User user);

    int updateDeletedDateByUserId(Integer userId);

    // 프로필 사진 수정 시
    int updateProfileImgPathById(@Param("userId") Integer userId, @Param("path") String path);
}
