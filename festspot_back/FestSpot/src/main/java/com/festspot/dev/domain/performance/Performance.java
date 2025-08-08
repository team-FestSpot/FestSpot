package com.festspot.dev.domain.performance;

import java.time.LocalDate;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Performance {

  private Integer performanceId;
  private Integer performanceRegionId;
  private String performanceApiId;
  private String performanceTitle;
  private String performancePosterUrl;
  private LocalDate performanceStartDate;
  private LocalDate performanceEndDate;
  private String performanceVenue;
  private Integer performanceStatus;
  private Date performanceLastModified;
  private Integer isForeign;
  private Integer isFestival;
  private Date updatedAt;

}
