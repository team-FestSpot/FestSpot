package com.festspot.dev.service.scheduler.performance;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.festspot.dev.domain.performance.Performance;
import com.festspot.dev.domain.performance.PerformanceMapper;
import com.festspot.dev.domain.performance.performanceRegion.PerformanceRegionMapper;
import com.festspot.dev.domain.performance.performanceState.PerformanceStateMapper;
import com.festspot.dev.domain.ticketing.TicketingUrl;
import com.festspot.dev.domain.ticketing.TicketingUrlMapper;
import com.festspot.dev.dto.admin.AdminUploadPerformanceReqDto;
import com.festspot.dev.dto.ticketing.TicketingReqDto;
import com.festspot.dev.service.PerformanceService;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import org.json.XML;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PerformanceDetailScheduler {
    private final PerformanceService performanceService;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final String API_KEY1 = "30b291671db940319288ebbf6a417f4f";
    private final String API_KEY2 = "a65dc49e0db540c985f6e41ff1865fca";
    private final String API_KEY3 = "763fe25fd3cc4a6cbde68058a651e359";
    private final List<String> API_KEYS = List.of(API_KEY1, API_KEY2, API_KEY3);
    private final PerformanceRegionMapper performanceRegionMapper;
    private final PerformanceStateMapper performanceStateMapper;
    private final TicketingUrlMapper ticketingUrlMapper;
    private final PerformanceMapper performanceMapper;

    @Scheduled(cron = "0 0 9-21 * * *", zone = "Asia/Seoul")
    @Transactional(rollbackFor = Exception.class)
    public void performanceAutoUpdate () {
        System.out.println("start");
        // db에 저장된 공연 상세정보 중 API ID가 있는(api에서 받아와서 등록한) 공연 목록
        List<Performance> apiPerformanceList = performanceService.getAllPerformance().stream().filter(performance ->
                performance.getPerformanceApiId() != null).toList();

        // 공연 상세정보 api 요청 주소
        String url = "http://kopis.or.kr/openApi/restful/pblprfr/{performanceId}?service={serviceKey}";
        // ISO-8859-1 대신 UTF-8 강제 적용(안하면 한글 다 깨짐)
        restTemplate.getMessageConverters().removeIf(c -> c instanceof StringHttpMessageConverter);
        restTemplate.getMessageConverters().addFirst(new StringHttpMessageConverter(StandardCharsets.UTF_8));

        // XML -> JSON -> dto List -> Entity List로 변환
        List<Performance> performanceList = apiPerformanceList.stream()
                .map(performance -> {
                    try {
                        String apiKey = API_KEYS.get((int) Math.floor(Math.random() * API_KEYS.size()));
                        // 요청 받으면 xml로 옴. xml의 dbs.db를 꺼내서 json 형태로 변환
                        String performanceDetailXML = restTemplate.getForObject(url, String.class, performance.getPerformanceApiId(), apiKey);
                        JSONObject performanceDetailJson = XML.toJSONObject(performanceDetailXML)
                                .getJSONObject("dbs")
                                .getJSONObject("db");

                        // json에서 예매처 정보만 가져와서 dto에 넣을 수 있도록 List<TicketingReqDto> 형태로 변환
                        JSONObject relatesObj = performanceDetailJson.getJSONObject("relates");
                        List<TicketingReqDto> ticketings = new ArrayList<>();
                        if (relatesObj.has("relate")) {
                            Object relateObj = relatesObj.get("relate"); // 공연 정보 json의 relates.relate
                            if (relateObj instanceof JSONArray) {
                                // 예매처가 여러 곳일 때 relateObj를 JSONArray로 바꿔서 반복문으로 예매처명, 예매처 url 들어있는 객체를 예매처 dto로 변환
                                JSONArray relateArray = (JSONArray) relateObj;
                                for (int i = 0; i < relateArray.length(); i++) {
                                    JSONObject jsonObject = relateArray.getJSONObject(i);
                                    TicketingReqDto ticketingReqDto = new TicketingReqDto();
                                    ticketingReqDto.setRelatenm(jsonObject.optString("relatenm"));
                                    ticketingReqDto.setRelateurl(jsonObject.optString("relateurl"));
                                    ticketings.add(ticketingReqDto);
                                }
                            } else if (relateObj instanceof JSONObject) {
                                // 예매처가 한 곳일 때 relateObj를 예매처 dto로 변환
                                JSONObject jsonObject = (JSONObject) relateObj;
                                TicketingReqDto ticketingReqDto = new TicketingReqDto();
                                ticketingReqDto.setRelatenm(jsonObject.optString("relatenm"));
                                ticketingReqDto.setRelateurl(jsonObject.optString("relateurl"));
                                ticketings.add(ticketingReqDto);
                            }
                        }

                        AdminUploadPerformanceReqDto relates = new AdminUploadPerformanceReqDto();
                        relates.setRelates(ticketings);
                        performanceDetailJson.remove("relates"); // 이거 안해주면 바로 아래 objectMapper에서 예외발생
                        AdminUploadPerformanceReqDto dto = objectMapper.readerForUpdating(relates)
                                .readValue(performanceDetailJson.toString(), AdminUploadPerformanceReqDto.class);

                        // dto -> entity로 변환
                        List<TicketingUrl> ticketingUrlList = dto.getRelates().stream()
                                .map(ticketingReqDto -> ticketingReqDto.toEntity(performance.getPerformanceId()))
                                .toList();

                        // Performance Entity에 필요한 지역정보, 공연상태정보, 예매처정보 넣어서 return
                        Performance updatePerformance = dto.toEntity(performanceRegionMapper.findByRegionName(dto.getArea()),
                                performanceStateMapper.findByState(dto.getPrfstate()));
                        updatePerformance.setTicketingUrls((ticketingUrlList));
                        return updatePerformance;
                    } catch (JsonProcessingException e) {
                        e.printStackTrace();
                        return null; // 예외 발생시 null
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                })
                .filter(Objects::nonNull) // null(예외) 제거
                .toList();

        try {
            List<Integer> performanceIdList =  apiPerformanceList.stream()
                    .map(performance -> performance.getPerformanceId()).toList();
            int performanceUpdateResult = performanceMapper.updateManyByApiIds(performanceList);

            System.out.println(performanceList);
            // api 예매처 정보 업데이트
            // 지금은 api id가 있는 공연의 예매처를 싹 다 지우고 받아온걸로 다시 등록하도록 되어있음
            // db에 있는데 예매처 주소만 바뀐 경우 그 예매처 주소만 수정, db에 있는데 api에서 사라진 경우 삭제, db에 없던 게 api에 생긴 경우 추가를 전부 삭제 후 추가하지 않고 한 번에 해결할 방법이 필요함
            int ticketingDeleteResult = ticketingUrlMapper.deleteManyByPerformanceIds(performanceIdList);
            int ticketingUpdateResult = ticketingUrlMapper.insertMany(performanceList.stream()
                    .map(performance -> performance.getTicketingUrls()).toList());

            System.out.println("performance updated: " + performanceUpdateResult);
            System.out.println("ticketing url updated: " + ticketingUpdateResult / (ticketingDeleteResult/ticketingUpdateResult));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
