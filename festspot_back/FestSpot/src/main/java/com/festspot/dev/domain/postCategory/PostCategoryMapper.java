package com.festspot.dev.domain.postCategory;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostCategoryMapper {

  PostCategory findeByCategoryKey(String CategoryKey);
}
