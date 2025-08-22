package com.festspot.dev.domain.post;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PostMapper {

    int insert(Post post);
    Post findByPostId(@Param("postId") Integer postId, @Param("userId") Integer userId);

}
