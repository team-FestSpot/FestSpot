package com.festspot.dev.domain.post;

import com.festspot.dev.dto.post.PostCommentRespDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PostCommentMapper {
    List<PostComment> findByPostId(Integer categoryId, Integer postId);
    int getCountByPostId(Integer postId);

    // 댓글 삽입 및 삭제
//    int insertComment(@Param("postId") Integer postId,
//                      @Param("userId") Integer userId,
//                      @Param("commentContent") String commentContent);
    int insertComment(PostComment postComment);
    int updateComment(@Param("postId") Integer postId,
                      @Param("postCommentId") Integer postCommentId,
                      @Param("userId") Integer userId,
                      @Param("commentContent") String commentContent);
    int deleteComment(@Param("postId") Integer postId, @Param("postCommentId") Integer postCommentId, @Param("userId") Integer userId);

    List<PostComment> selectComments(@Param("postId") Integer postId);
}
