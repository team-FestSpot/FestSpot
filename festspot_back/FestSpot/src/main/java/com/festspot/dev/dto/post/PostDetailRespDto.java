package com.festspot.dev.dto.post;

import com.festspot.dev.domain.post.Post;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PostDetailRespDto {
    private Integer postId;
    private Integer userId;
    private Integer postCategoryId;
    private String postTitle;
    private String postContent;
    private Integer allowComments;
    private Integer viewCount;
    private Integer likeCount;
    private Integer commentCount;
    private LocalDateTime createdAt;

    private List<MultipartFile> files;

    public Post toPost(Integer postId) {
        return Post.builder()
                .postId(postId)
                .userId(userId)
                .postTitle(postTitle)
                .postContent(postContent)
                .viewCount(viewCount)
                .likeCount(likeCount)
                .commentCount(commentCount)
                .createdAt(createdAt)
                .build();
    }

}
