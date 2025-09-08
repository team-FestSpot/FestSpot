package com.festspot.dev.domain.postImg;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostImgMapper {

  int insert(List<PostImg> postImgs);

  List<PostImg> findByPostId(Integer postId);

  int deleteByPostId(Integer postId);
}
