package com.festspot.dev.service;

import com.festspot.dev.domain.post.BoardPostMapper;
import com.festspot.dev.dto.post.PostDetailDto;
import com.festspot.dev.dto.post.PostListRespDto;
import com.festspot.dev.dto.post.PostSummaryDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class PostService {

    private final BoardPostMapper boardPostMapper;
    private final PostFileStorage postFileStorage;

    public int createPost(String boardKey, int authorId, String title, String content, List<MultipartFile> images) {
        Integer categoryId = boardPostMapper.findCategoryByKey(boardKey);

        if (categoryId == null) {
            throw new IllegalArgumentException("Unkown board: " + boardKey);
        }

        boardPostMapper.insertPost(authorId, categoryId, title, content);
        int postId = boardPostMapper.lastInsertId();

        if (images != null && !images.isEmpty()) {
            if(images.size() > 10) {
                throw new IllegalArgumentException("이미지는 최대 10개까지 가능합니다.");
            }
            int seq = 1;
            for (MultipartFile f : images) {
                String url = postFileStorage.store(f);
                boardPostMapper.insertPostImage(postId, url, seq++);
            }
        }
        return postId;
    }

    public PostListRespDto getPosts(String boardKey, int page, int size) {
        Integer categoryId = boardPostMapper.findCategoryByKey(boardKey);

        if(categoryId == null) {
            throw new IllegalArgumentException("Unknown board: " + boardKey);
        }

        int categoryIdVal = categoryId;
        int pageSafe = Math.max(page, 1);
        int sizeSafe = Math.max(size, 1);
        int offset = (pageSafe - 1) * sizeSafe;

        long total = boardPostMapper.countPostByCategory(categoryId);
        List<PostSummaryDto> rows = boardPostMapper.selectPostByCategory(categoryIdVal, sizeSafe, offset);
        int totalPages = (int)Math.max(1, Math.ceil((double) total / sizeSafe));

        return PostListRespDto.builder()
                .posts(rows)
                .totalCount(total)
                .totalPages(totalPages)
                .build();
    }

    public PostDetailDto getPost(int postId) {
        PostDetailDto base = boardPostMapper.getPostAll();

        if(base == null) {
            throw new NoSuchElementException("Post Not Found");
        }

        List<PostDetailDto.PostImgDto> images = boardPostMapper.selectPostImages(postId);
        base.setImages(images);

        return base;
    }
}
