package com.festspot.dev.dto.post;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class PostUpdateReqDto {
    private Integer postId;
    private Integer postCategoryId;
    private String postTitle;
    private String postContent;

    private List<MultipartFile> addFfiles;
    private List<MultipartFile> deleteFiles;
}
