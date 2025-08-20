package com.festspot.dev.service;

import com.festspot.dev.domain.post.BoardPostMapper;
import com.festspot.dev.domain.post.Post;
import com.festspot.dev.domain.post.PostImage;
import com.festspot.dev.dto.post.PostCreateReq;
import com.festspot.dev.dto.post.PostDetailDto;
import com.festspot.dev.dto.post.BoardListResDto;
import com.festspot.dev.dto.post.BoardListItemDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class PostService {

    private static final int MAX_IMAGES = 10;

    private final BoardPostMapper boardPostMapper;
    private final PostFileStorage postFileStorage;

    @Transactional(rollbackFor = Exception.class)
    public PostDetailDto createPost(Long authorId, PostCreateReq req, List<MultipartFile> images) {
        Integer categoryId = resolveCategoryId(req);

        Post post = Post.builder()
                .originalPosterId(authorId)
                .postCategoryId(categoryId)
                .postTitle(req.getTitle())
                .postContent(req.getContent())
                .allowComments(req.getAllowComments() == null ? Boolean.TRUE : req.getAllowComments())
                .build();
        boardPostMapper.insertPost(post);

        if (images != null && !images.isEmpty()) {
            if (images.size() > MAX_IMAGES) {
               throw new NoSuchElementException("이미지는 최대 10장까지 가능합니다.");
            }
            List<PostImage> postImages = new ArrayList<>();
            for (int i = 0; i < images.size(); i++) {
                String url = postFileStorage.store(images.get(i));
                postImages.add(PostImage.builder()
                                .postId(post.getPostId())
                                .postImgUrl(url)
                                .seq(i)
                        .build());
            }
            boardPostMapper.insertPostImages(postImages);
        }

        PostDetailDto postDetailDto = boardPostMapper.selectPostById(post.getPostId());
        postDetailDto.setImages(boardPostMapper.selectPostImages(post.getPostId()));
        return postDetailDto;
    }

    private Integer resolveCategoryId(PostCreateReq req) {
        Integer categoryId = req.getPostCategoryId();
        if (categoryId == null) {
            String key = req.getBoardKey();
            if (key == null || key.isBlank()) {
                throw new IllegalArgumentException("category 또는 boardKey가 필요합니다.");
            }
            Integer found = boardPostMapper.findCategoryByKey(key);
            if (found == null) {
                throw new IllegalArgumentException("Unknown boardKey: " + key);
            }
            categoryId = found;
        }
        return categoryId;
    }

}
