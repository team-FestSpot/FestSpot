package com.festspot.dev.domain.entity.relate;

import com.festspot.dev.domain.entity.Performance;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Relate {
    private Integer relateUrlId;
    private Integer performanceId;
    private String relateUrl;
    private String relateName;

    public Relate toEntity() {
        return Relate.builder()
                .relateUrl(relateUrl)
                .relateName(relateName)
                .build();
    }
}
