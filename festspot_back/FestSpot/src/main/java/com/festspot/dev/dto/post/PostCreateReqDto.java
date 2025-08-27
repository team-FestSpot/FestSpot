package com.festspot.dev.dto.post;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class PostCreateReqDto {
    private Integer postCategoryId;
    private String postTitle;
    private String postContent;

    private List<MultipartFile> files;
}
