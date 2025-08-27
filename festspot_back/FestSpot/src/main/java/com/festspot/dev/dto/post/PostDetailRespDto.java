package com.festspot.dev.dto.post;

import com.festspot.dev.domain.post.Post;
import com.festspot.dev.domain.post.PostComment;
import com.festspot.dev.domain.postCategory.PostCategory;
import com.festspot.dev.domain.postImg.PostImg;
import com.festspot.dev.domain.user.User;
import com.festspot.dev.dto.auth.UserSummaryDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostDetailRespDto {
    private Integer postId;
    private Integer userId;
    private Integer postCategoryId;
    private String postTitle;
    private String postContent;
    private Integer viewCount;
    private Integer likeCount;
    private Integer commentCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private UserSummaryDto user;
    private PostCategorySummaryDto postCategory;
    private List<PostImgDto> postImgs;
    private List<PostCommentDto> postComments;

    private Boolean isLike;

    public static PostDetailRespDto toEntity(Post post, Boolean isLikeOpt) {
        return PostDetailRespDto.builder()
                .postId(post.getPostId())
                .userId(post.getUserId())
                .postCategoryId(post.getPostCategory() != null ? post.getPostCategory().getPostCategoryId() : null)
                .postTitle(post.getPostTitle())
                .postContent(post.getPostContent())
                .viewCount(post.getViewCount())
                .likeCount(post.getLikeCount())
                .commentCount(post.getCommentCount())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .user(UserSummaryDto.toUser(post.getUser()))
                .postCategory(PostCategorySummaryDto.toCategory(post.getPostCategory()))
                .postImgs(post.getPostImgs() == null ? null :
                        post.getPostImgs().stream()
                                .map(PostImgDto::toPostImg)
                                .collect(Collectors.toList()))
                .postComments(post.getPostComments() == null ? null :
                        post.getPostComments().stream()
                                .map(PostCommentDto::toComment)
                                .collect(Collectors.toList()))
                .isLike(isLikeOpt)
                .build();
    }

}
