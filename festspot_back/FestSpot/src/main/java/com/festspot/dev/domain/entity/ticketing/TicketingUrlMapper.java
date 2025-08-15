package com.festspot.dev.domain.entity.ticketing;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TicketingUrlMapper {
    int insert(List<TicketingUrl> ticketingUrls);
    int insertMany(List<List<TicketingUrl>> manyTicketingUrls);
}
