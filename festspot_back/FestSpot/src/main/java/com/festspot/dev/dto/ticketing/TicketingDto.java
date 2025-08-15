package com.festspot.dev.dto.relate;

import com.festspot.dev.domain.entity.relate.Relate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RelateDto {
    private Integer relateId;
    private Integer performanceId;
    private String relatenm;
    private String relateurl;

    public Relate toEntity() {
        return Relate.builder()
                .performanceId(performanceId)
                .relateUrl(relateurl)
                .relateName(relatenm)
                .build();
    }

    public RelateDto toDto() {
        return RelateDto.builder()
                .relatenm(relatenm)
                .relateurl(relateurl)
                .build();
    }
}
