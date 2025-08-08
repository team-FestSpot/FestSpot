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
        if (path.substring(path.lastIndexOf("/")).contains("default")) {
            return ;
        }

        File file = new File(rootPath + "/upload/" +path);
        if (!file.exists()) {
            return ;
        }

        file.delete();
    }
}
