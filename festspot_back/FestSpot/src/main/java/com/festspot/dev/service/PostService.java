package com.festspot.dev.service;

import com.festspot.dev.domain.post.PostCommentMapper;
import com.festspot.dev.domain.post.PostLikeMapper;
import com.festspot.dev.domain.post.PostMapper;
import com.festspot.dev.domain.postImg.PostImgMapper;
import com.festspot.dev.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostService {

    private final FileService fileService;
    private final PostMapper postMapper;
    private final PostImgMapper postImgMapper;
    private final PrincipalUtil principalUtil;
    private final PostLikeMapper postLikeMapper;
    private final PostCommentMapper postCommentMapper;


}
