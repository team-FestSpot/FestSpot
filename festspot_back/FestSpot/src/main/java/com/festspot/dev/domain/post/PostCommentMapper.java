package com.festspot.dev.domain.post;

import com.festspot.dev.dto.post.PostCommentRespDto;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PostCommentMapper {

  List<PostComment> findById(Integer postId, Integer userId);

  int getCountByPostId(Integer postId);

  //
  int insertComment(PostComment postComment);
    int updateComment(@Param("postId") Integer postId,
                      @Param("postCommentId") Integer postCommentId,
                      @Param("userId") Integer userId,
                      @Param("commentContent") String commentContent);
    int deleteComment(@Param("postId") Integer postId, @Param("postCommentId") Integer postCommentId, @Param("userId") Integer userId);

    List<PostComment> selectComments(@Param("postId") Integer postId);
}
