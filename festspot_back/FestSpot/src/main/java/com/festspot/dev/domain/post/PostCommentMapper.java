package com.festspot.dev.domain.post;

import com.festspot.dev.dto.post.PostCommentRespDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PostCommentMapper {
    List<PostComment> findByPostId(Integer categoryId, Integer postId);
    int getCountByPostId(Integer postId);

    //
    int insertComment(@Param("postId") Integer postId, @Param("userId") Integer userId, @Param("commentContent") String commentContent);
    int deleteComment(@Param("postCommentId") Integer postCommentId, @Param("userId") Integer userId);

    List<PostCommentRespDto> selectComments(@Param("postId") Integer postId);
}
