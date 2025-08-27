package com.festspot.dev.util;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ImageUrlUtil {

  private final AppProperties appProperties;

  public String buildImageUrl(String imageName, String imageConfigName) {
    if (imageConfigName == null) {
      return null;
    }
    if (!appProperties.getImageConfigs().containsKey(imageConfigName)) {
      return null;
    }

    AppProperties.ImageConfig config = appProperties.getImageConfigs().get(imageConfigName);

    String prefix = config.getPrefix();
    String defaultImg = config.getDefaultImg();

    if (imageName == null) {
      return prefix + "/" + defaultImg;
    }
    if (imageName.startsWith("http")) {
      return imageName;
    }

    return prefix + "/" + imageName;
  }

}
