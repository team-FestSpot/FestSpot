package com.festspot.dev.service;

import com.festspot.dev.exception.auth.FileStoreException;
import com.festspot.dev.util.AppProperties;
import java.io.File;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class FileService {

  private final AppProperties appProperties;

  @Value("${user.dir}")
  private String rootPath;

  public String uploadFile(MultipartFile file, String imageConfigName) {
    AppProperties.ImageConfig config = appProperties.getImageConfigs().get(imageConfigName);

    if (config == null) {
      throw new IllegalArgumentException("Invalid image config: " + imageConfigName);
    }

    String dirPath = config.getDirPath();
    File dir = new File(dirPath);

    try {
      if (!dir.exists()) {
        dir.mkdirs();
      }

      String originalFileName = file.getOriginalFilename();
      String filePath = dirPath + "/" + originalFileName;

      file.transferTo(new File(filePath));

      // DB에는 파일명만 저장
      return originalFileName;
    } catch (Exception e) {
      throw new FileStoreException(dir, "잘못된 파일 형식", e.getMessage());
    }

  }

  private String generatorRandomFileName(String originalFileName) {
    StringBuilder newFileName = new StringBuilder();
    newFileName.append(UUID.randomUUID().toString().replaceAll("-", ""));
    newFileName.append("_");
    newFileName.append(originalFileName);

    return newFileName.toString();
  }

  private void mkdirs(String path) {
    File f = new File(path);

    if (!f.exists()) {
      f.mkdirs();
    }
  }

  public boolean deleteFile(String path, String imageConfigName) {
    AppProperties.ImageConfig config = appProperties.getImageConfigs().get(imageConfigName);

    if (config == null) {
      throw new IllegalArgumentException("Invalid image config: " + imageConfigName);
    }

    String dirPath = config.getDirPath();

    // null 체크 추가
    if (path == null || path.isEmpty()) {
      return false;
    }

    // lastIndexOf가 -1을 반환하는 경우를 고려
    int lastSlashIndex = path.lastIndexOf("/");
    String fileName;

    if (lastSlashIndex == -1) { // 맨 앞에 "/"가 없는 경우 전체 path가 파일명
      fileName = path;
    } else { // 맨 앞에 "/"가 있는 경우 마지막 "/" 이후가 파일명
      fileName = path.substring(lastSlashIndex + 1);
    }

    if (fileName.contains("default")) {
      return false;
    }

    File file = new File(dirPath + "/" + path);
    if (!file.exists()) {
      return false;
    }

    return file.delete();
  }
}
