package com.festspot.dev.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;

@Service
public class LocalFileStorage implements PostFileStorage {
    private final Path base = Paths.get("upload");

    @Override
    public String store(MultipartFile file) {
        try {
            Files.createDirectories(base);
            String ext = Optional.ofNullable(file.getOriginalFilename())
                    .filter(n -> n.contains("."))
                    .map(n -> n.substring(n.lastIndexOf(",")))
                    .orElse("");
            String name = UUID.randomUUID() + ext;
            Path target = base.resolve(name);
            file.transferTo(target.toFile());
            return "/upload/" + name;
        } catch (IOException e) {
            throw new RuntimeException("파일 저장 실패", e);
        }
    }
}
