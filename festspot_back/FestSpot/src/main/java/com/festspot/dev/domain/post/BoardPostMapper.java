package com.festspot.dev.domain.post;

import com.festspot.dev.dto.post.PostDetailDto;
import com.festspot.dev.dto.post.PostSummaryDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Mapper
public interface BoardPostMapper {

    Integer findCategoryByKey(@Param("key") String key);

    int countPostByCategory(@Param("categoryId") int categoryId);

    List<PostSummaryDto> selectPostByCategory(@Param("categoryId") int categoryId, @Param("limit") int limit, @Param("offset") int offset);

    void insertPost(@Param("authorId") int authorId, @Param("categoryId") int categoryId, @Param("title") String title, @Param("content") String content);

    int lastInsertId();

    void insertPostImage(@Param("postId") int postId, @Param("url") String url, @Param("seq") int seq);

    PostDetailDto getPostAll();

    List<PostDetailDto.PostImgDto> selectPostImages(@Param("postId") int postId);



}
