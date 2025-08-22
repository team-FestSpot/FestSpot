package com.festspot.dev.domain.post;

import com.festspot.dev.domain.postImg.PostImg;
import com.festspot.dev.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    private Integer postId;
    private Integer userId;
    private Integer postCategoryId;
    private String postTitle;
    private String postContent;
    private Integer allowComments;
    private Integer viewCount;
    private Integer likeCount;
    private Integer commentCount;
    private Integer createdAt;
    private Integer updatedAt;

    private User user;
    private List<PostImg> postImgs;
}
