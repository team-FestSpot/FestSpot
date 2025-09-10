package com.festspot.dev.domain.post;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostCommentMapper {

  List<PostComment> findByPostId(Integer postId, Integer userId);

  PostComment findById(Integer postCommentId);

  int getCountByPostId(Integer postId);

  int insert(PostComment postComment);

  int update(PostComment postComment);

  int softDelete(Integer postCommentId);
}
