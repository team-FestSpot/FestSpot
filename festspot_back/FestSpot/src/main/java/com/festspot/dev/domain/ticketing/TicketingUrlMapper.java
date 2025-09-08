package com.festspot.dev.domain.ticketing;

import java.util.List;

import com.festspot.dev.domain.performance.Performance;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TicketingUrlMapper {

    int insert(List<TicketingUrl> relates);

    int insertMany(List<List<TicketingUrl>> manyRelates);

    List<List<TicketingUrl>> findByPerformanceId(List<Performance> performanceList);

    int deleteMissing(List<TicketingUrl> deletedRelates);

    int deleteManyByPerformanceIds(List<Integer> performanceIds);
}
