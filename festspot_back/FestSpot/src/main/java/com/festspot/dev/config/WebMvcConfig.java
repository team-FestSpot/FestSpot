package com.festspot.dev.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/upload/poster/**")
                .addResourceLocations("file:///C:/gwangho/team/FestSpot/festspot_back/FestSpot/upload/poster/");

        registry.addResourceHandler("/upload/profile/**")
                .addResourceLocations("file:///C:/gwangho/team/FestSpot/festspot_back/FestSpot/upload/profile/");
    }
}
