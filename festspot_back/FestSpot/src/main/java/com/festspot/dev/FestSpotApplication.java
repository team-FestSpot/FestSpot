package com.festspot.dev;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling // 1시간마다 db 공연정보 업데이트하는 기능 구현하기 위해서 스케줄러 활성화
public class FestSpotApplication {
    public static void main(String[] args) {
        SpringApplication.run(FestSpotApplication.class, args);
    }
}
