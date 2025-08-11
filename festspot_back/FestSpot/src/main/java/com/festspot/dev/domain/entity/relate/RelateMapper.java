package com.festspot.dev.domain.entity.relate;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RelateMapper {
    int insert(List<Relate> relates);

    int insertMany(List<List<Relate>> manyRelates);
}
