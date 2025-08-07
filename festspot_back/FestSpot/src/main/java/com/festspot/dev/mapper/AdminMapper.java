package com.festspot.dev.mapper;

import com.festspot.dev.domain.entity.Performance;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminMapper {
    int insert(Performance performance);
    int getRegionCodeByRegionName(String regionName);
    int getStateCodeByState(String status);
}
