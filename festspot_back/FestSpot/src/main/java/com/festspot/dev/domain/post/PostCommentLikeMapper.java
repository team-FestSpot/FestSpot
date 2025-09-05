package com.festspot.dev.domain.post;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostCommentLikeMapper {

  int insert(Integer postCommentId, Integer userId);

  int delete(Integer postCommentId, Integer userId);

  int getLikeCount(Integer postCommentId);

  int isLike(Integer postCommentId, Integer userId);

}
