package com.festspot.dev.domain.postImg;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PostImgMapper {
    int insert(List<PostImg> postImgs);
}
