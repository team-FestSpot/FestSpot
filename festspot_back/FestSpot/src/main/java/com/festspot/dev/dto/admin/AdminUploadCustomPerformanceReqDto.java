package com.festspot.dev.dto.admin;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class AdminUploadCustomPerformanceReqDto {
    private String prfnm;
    private String area;
    private String fcltynm;
    private String genrenm;
    private String openrun;
    private String prfstate;
    private String prfpdfrom;
    private String prfpdto;
    private String visit;
    private String festival;
    private String prfcast;
    private List<Object> ticketingUrls;

    private MultipartFile files;
}
