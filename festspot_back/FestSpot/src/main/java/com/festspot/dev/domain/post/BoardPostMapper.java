package com.festspot.dev.domain.post;

import com.festspot.dev.dto.post.PostDetailDto;
import com.festspot.dev.dto.post.BoardListItemDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BoardPostMapper {

    // 조회
    Integer findCategoryByKey(@Param("key") String key);
    int countPostByCategory(@Param("categoryId") int categoryId);
    List<BoardListItemDto> selectPostByCategory(@Param("categoryId") int categoryId, @Param("limit") int limit, @Param("offset") int offset);

    // 작성
    int insertPost(Post post);
    int insertPostImages(@Param("images") List<PostImage> images);


    int lastInsertId();

    // 전체 게시글
    PostDetailDto getPostAll();
    // 게시글 선택
    PostDetailDto selectPostById(@Param("postId") long postId);
    List<PostDetailDto.PostImgDto> selectPostImages(@Param("postId") long postId);



}
