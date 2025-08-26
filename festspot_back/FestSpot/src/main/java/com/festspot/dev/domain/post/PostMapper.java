package com.festspot.dev.domain.post;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostMapper {

  int insert(Post post);

  Post findByPostId(Integer postId);

  List<Post> findAll(PostSearchOption postSearchOption);

  double countAll(PostSearchOption postSearchOption);

  List<Post> findByCategoryId(PostSearchOption postSearchOption);

  double countByCategoryId(PostSearchOption postSearchOption);

}
