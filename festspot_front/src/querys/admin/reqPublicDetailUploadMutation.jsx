import { useMutation } from "@tanstack/react-query";
import { reqPublicDetailApi } from "../../api/publicDetailApi";
import { convertXmlToJson } from "../../api/xmlToJson";
import { reqUploadPerformanceApi } from "../../api/adminApi";

// 공연 ID 넣으면 공연상세정보 받아서 백엔드에 던지는 mutation
// 목록 오른쪽 등록 버튼 눌러서 공연 정보 db에 넣을때 사용
export const reqPublicDetailUploadMutation = () =>
  useMutation({
    mutationFn: async (performanceApiId) => {
      const xmlText = (await reqPublicDetailApi(performanceApiId)).data;
      const jsonData = (await convertXmlToJson(xmlText)).dbs.db;

      // 예매처 데이터가 relates.relate에 있어서 꺼냄
      if(jsonData.relates.relate.length > 1) { // 예매처가 어러 곳이면 배열의 배열 안에 들어있어서 배열을 한겹 벗김
        jsonData.relates = jsonData.relates.relate;
      }
      else { // 예매처가 한 곳이면 배열에 안 들어있어서 배열에 넣어줌
        jsonData.relates = [jsonData.relates.relate];
      }
      console.log(jsonData.relates);
      return reqUploadPerformanceApi(jsonData);
    },
  });
