package com.festspot.dev.dto.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostCreateReq {
    private String boardKey;
    private Integer postCategoryId;
    private String title;
    private String content;
    private Boolean allowComments;
    private List<String> imageUrls;
}
