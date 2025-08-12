package com.festspot.dev.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.festspot.dev.domain.entity.Performance;
import com.festspot.dev.domain.entity.relate.Relate;
import com.festspot.dev.domain.entity.relate.RelateMapper;
import com.festspot.dev.dto.admin.AdminUploadPerformanceReqDto;
import com.festspot.dev.dto.relate.RelateDto;
import com.festspot.dev.mapper.AdminMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminMapper adminMapper;
    private final RelateMapper relateMapper;

    @Transactional(rollbackFor = Exception.class)
    public int uploadPerformance(AdminUploadPerformanceReqDto dto) {
        if(adminMapper.findByPerformanceApiId(dto.getMt20id()) != null) {
            return 0;
        }

        Integer statusCode = adminMapper.getStateCodeByState(dto.getPrfstate());
        Integer regionCode = adminMapper.getRegionCodeByRegionName(dto.getArea());

        Performance performance = dto.toEntity(regionCode, statusCode);
        int performanceInsertResult = adminMapper.insert(performance);

        // 예매처 dto 객체가 담긴 List 생성
        // 예매처 링크는 배열 안에 객체(예매처명, 예매처링크)가 들어있는 형태로 날아옴
        ObjectMapper objectMapper = new ObjectMapper();
        List<RelateDto> relateDtos = dto.getRelates().stream().map(relate -> {
            try {
                String json = objectMapper.writeValueAsString(relate);
                RelateDto relateDto = objectMapper.readValue(json, RelateDto.class);
                relateDto.setPerformanceId(performance.getPerformanceId()); // 공연 ID는 mapper에 가서 공연 ID를 들고 온 entity에서 전달
                return relateDto;
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }).collect(Collectors.toList());

        // 예매처 dto List를 반복문 돌려서 예매처 entity가 들어있는 List로 변환
        List<Relate> relates = relateDtos.stream().map(relateDto -> {
//            System.out.println("relateDto = " + relateDto);
            return relateDto.toEntity();
        }).collect(Collectors.toList());
        relateMapper.insert(relates); // 예매처(relate) 테이블에 예매처 정보 저장

        return performanceInsertResult;
    }

    @Transactional(rollbackFor = Exception.class)
    public int uploadManyPerformance(List<AdminUploadPerformanceReqDto> dtos) {
        List<Performance> performanceList = dtos.stream().map(adminUploadPerformanceReqDto -> {
            Integer statusCode = adminMapper.getStateCodeByState(adminUploadPerformanceReqDto.getPrfstate());
            Integer regionCode = adminMapper.getRegionCodeByRegionName(adminUploadPerformanceReqDto.getArea());
            return adminUploadPerformanceReqDto.toEntity(regionCode, statusCode);
        }).toList();
        int result = adminMapper.insertMany(performanceList);

        ObjectMapper objectMapper = new ObjectMapper();
        // 예매처 dto 객체가 담긴 List(단일 공연에 대한 예매처 목록)가 담긴 List(공연 여러개들의 예매처 목록들) 생성
        // 하나의 공연에 예매처가 여러 개(List)일 수 있고, 공연도 여러 개(List)를 등록해야 해서 이중 List에 담았음
        // 공연 정보들이 담긴 List에서 performanceId를 가져오기 위해서 key가 Api Id(mt20id)이고 value가 해당 API Id에 해당하는 performance 객체인 Map을 생성
        Map<String, Performance> performanceMap = performanceList.stream().collect(Collectors.toMap(Performance::getPerformanceApiId, performance -> performance));
        List<List<RelateDto>> manyRelateDtos = dtos.stream().map(dto -> // 한 공연의 예매처 목록들(배열에 들어있음)
            dto.getRelates().stream().map(relate -> { // 단일 예매처 정보(AdminUploadPerformanceReqDto 객체)
            Performance performance = performanceMap.get(dto.getMt20id()); // dto에 든 API Id 와 일치하는 performance 객체(mapper에서 insert를 거친 이후라서 performanceId가 들어있음)
                try {
                    // 단일 등록이랑 같은 방식으로 예매처 dto 만들어줌
                    String json = objectMapper.writeValueAsString(relate);
                    RelateDto relateDto = objectMapper.readValue(json, RelateDto.class);
                    relateDto.setPerformanceId(performance.getPerformanceId()); // performanceMap에서 꺼낸 performance 객체에서 Id 꺼내서 넣어줌
                    return relateDto;
                } catch (JsonProcessingException e) {
                    throw new RuntimeException(e);
                }
            }).collect(Collectors.toList())).toList();

        // 예매처 dto들이 담긴 list가 담긴 list를 예매처 entity들이 담긴 list가 담긴 list로 변환
        List<List<Relate>> manyRelates = manyRelateDtos.stream().map(relateDtos ->
            relateDtos.stream().map(relateDto -> relateDto.toEntity()).collect(Collectors.toList())).toList();

        // 각 공연들의 예매처 정보들을 relate 테이블에 저장
        relateMapper.insertMany(manyRelates);

        return result;
    }
}
