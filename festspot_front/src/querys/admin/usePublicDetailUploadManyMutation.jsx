import { useMutation } from "@tanstack/react-query";
import { reqPublicDetailApi } from "../../api/publicDetailApi";
import { convertXmlToJson } from "../../api/xmlToJson";
import Swal from "sweetalert2";
import { reqUploadManyPerformanceApi } from "../../api/adminApi";

// 관리자 대시보드 왼쪽 체크박스에 체크한 다음 헤더에 있는 추가 버튼 누르면 체크한 공연정보들 전부 상세정보 api로 가져와서 백엔드에 전달
// 목록 왼쪽 체크박스에 체크한 공연 정보 전부 db에 한번에 넣을때 사용
export const usePublicDetailUploadManyMutation = () =>
  useMutation({
    mutationFn: async (performanceApiIds) => {
      // 아무것도 체크 안 하고 추가 버튼 누르면 경고창만 띄움
      if (performanceApiIds.length < 1) {
        await Swal.fire({
          title: "1개 이상의 항목을 선택하세요.",
          icon: "error",
          showCloseButton: false,
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      // performanceApiIds = mt20id(api에 공연상세정보 요청 보낼때 쓰는 공연 id값)가 들어있는 배열
      // = 체크박스에 체크한 공연
      // map 돌려서 배열에 든 id들 공연상세정보 요청 보냄
      const xmlTexts = performanceApiIds.map(
        async (id) => (await reqPublicDetailApi(id)).data
      );
      // Promise.all 해줘야 데이터가 배열에 담겨서 옴. 아니면 Promise 형태로 와서 못씀
      const promiseXmlTexts = await Promise.all(xmlTexts);

      // xml로 받은 데이터들을 map 돌려서 json 형식으로 바꿈
      const jsonDatas = promiseXmlTexts.map(
        async (xmlText) => await convertXmlToJson(xmlText)
      );
      // Promise.all 해줘서 배열에 담겨서 오도록 함.
      // 필요한 데이터는 각 객체의 dbs.db에 들어있음
      const promiseJsonDatas = await Promise.all(jsonDatas).then((result) =>
        result.map((jsonData) => {
          const promiseJsonData = jsonData.dbs.db;

          // 예매처 데이터가 relates.relate에 있어서 꺼냄
          if (promiseJsonData.relates.relate.length > 1) {
            // 예매처가 어러 곳이면 배열의 배열 안에 들어있어서 배열을 한겹 벗김
            promiseJsonData.relates = [...promiseJsonData.relates.relate];
          } else {
            // 예매처가 한 곳이면 배열에 안 들어있어서 배열에 넣어줌
            promiseJsonData.relates = [promiseJsonData.relates.relate];
          }
          return promiseJsonData;
        })
      );

      return reqUploadManyPerformanceApi(promiseJsonDatas);
    },
  });
