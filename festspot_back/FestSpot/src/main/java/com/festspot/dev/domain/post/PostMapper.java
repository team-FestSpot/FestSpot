package com.festspot.dev.domain.post;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostMapper {

  int insert(Post post);

  Post findById(Integer postId, Integer userId);

  List<Post> findAll(PostSearchOption postSearchOption);

  double countAll(PostSearchOption postSearchOption);

  List<Post> findByCategoryId(PostSearchOption postSearchOption);

  double countByCategoryId(PostSearchOption postSearchOption);

  int findPageById(PageSearchOption pageSearchOption);

  int increaseViewCount(Integer postId);

  int update(Post post);

  int delete(Integer postId);
}
