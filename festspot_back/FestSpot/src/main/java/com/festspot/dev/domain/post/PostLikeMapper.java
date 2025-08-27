package com.festspot.dev.domain.post;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PostLikeMapper {

    int insert(@Param("postId") Integer postId, @Param("userId") Integer userId);
    int delete(@Param("postId") Integer postId, @Param("userId") Integer userId);
    int getLikeCount(@Param("postId") Integer postId);

    Boolean exist(@Param("postId") Integer postId, @Param("userId") Integer userId);

}
