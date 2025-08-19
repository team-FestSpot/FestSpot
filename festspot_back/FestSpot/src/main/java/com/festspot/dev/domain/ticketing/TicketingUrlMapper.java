package com.festspot.dev.domain.ticketing;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TicketingUrlMapper {

<<<<<<< HEAD
    int insert(List<TicketingUrl> relates);

    int insertMany(List<List<TicketingUrl>> manyRelates);
}
=======
  int insert(List<TicketingUrl> relates);

  int insertMany(List<List<TicketingUrl>> manyRelates);
}
>>>>>>> 370a1d7a1ed1d9e5b170a9847197b521560ba496
