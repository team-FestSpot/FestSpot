package com.festspot.dev.domain.post;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostCommentMapper {

  List<PostComment> findById(Integer postId, Integer userId);

  int getCountByPostId(Integer postId);

  int insertComment(PostComment postComment);

}
