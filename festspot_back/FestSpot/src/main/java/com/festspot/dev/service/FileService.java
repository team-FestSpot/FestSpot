package com.festspot.dev.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileService {

    @Value("${user.dir}")
    private String rootPath;

    public String uploadFile(MultipartFile file, String dirPath) {
        String newFileName = generatorRandomFileName(file.getOriginalFilename());

        String uploadPath = rootPath + "/upload" + dirPath;
        mkdirs(uploadPath);

        Path path = Paths.get(uploadPath + "/" + newFileName);

        try {
            Files.write(path, file.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return newFileName;
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

    public void deleteFile(String path) {
        // null 체크 추가
        if (path == null || path.isEmpty()) {
            return;
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
            return;
        }

        File file = new File(rootPath + "/upload/" + path);
        if (!file.exists()) {
            return;
        }

        file.delete();
    }
}
