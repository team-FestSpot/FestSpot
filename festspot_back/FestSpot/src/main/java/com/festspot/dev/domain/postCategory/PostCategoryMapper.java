package com.festspot.dev.domain.postCategory;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostCategoryMapper {

  PostCategory findByCategoryKey(String CategoryKey);

  List<PostCategory> findAll();
}
