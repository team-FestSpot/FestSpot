package com.festspot.dev.domain.post;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PostCommentMapper {
    List<PostComment> findByPostId(Integer postId);
    int insert(PostComment postComment);
    int getCountByPostId(Integer postId);
}
