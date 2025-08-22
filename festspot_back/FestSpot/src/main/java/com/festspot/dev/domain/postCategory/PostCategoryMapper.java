package com.festspot.dev.domain.postCategory;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PostCategoryMapper {
    List<PostCategory> findeAll();
}
