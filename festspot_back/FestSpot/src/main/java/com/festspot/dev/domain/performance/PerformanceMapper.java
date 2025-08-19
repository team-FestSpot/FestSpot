package com.festspot.dev.domain.performance;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PerformanceMapper {

  List<Performance> findAll();

  Performance findByPerformanceApiId(String performanceApiId);

  Performance findById(Integer performanceId);

  int insert(Performance performance);

  int insertMany(List<Performance> performanceList);
<<<<<<< HEAD
}
=======
}
>>>>>>> 370a1d7a1ed1d9e5b170a9847197b521560ba496
