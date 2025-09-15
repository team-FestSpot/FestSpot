import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import useAdminAddPerformanceStore from "../../../stores/AdminAddPerformanceStore";
import AdminInputList from "../../../components/admin/AdminInputList/AdminInputList";
import AdminTicketingInputList from "../../../components/admin/AdminTicketingInputList/AdminTicketingInputList";
import Button from "@mui/material/Button";
import { reqUploadCustomPerformanceApi } from "../../../api/adminApi";
import Swal from "sweetalert2";
import AdminImageInput from "../../../components/admin/AdminImageInput/AdminImageInput";

function AdminAddPerformance2(props) {
  const [imageFile, setImageFile] = useState({}); // 업로드할 이미지파일 데이터 저장
  const [imageUrl, setImageUrl] = useState(""); // 화면에 업로드할 이미지 표시
  const { detail, setDetail, setDetailEmpty } = useAdminAddPerformanceStore();
  
  const [ticketingUrlList, setTicketingUrlList] = useState([
    {
      id1: "relatenm",
      type1: "text",
      placeholder1: "예매처명",

      id2: "relateurl",
      type2: "text",
      placeholder2: "예매처 URL",
    },
  ]);

  const [ticketingInputValue, setTicketingInputValue] = useState([
    {
      relatenm: "",
      relateurl: "",
    },
  ]);

  const inputList = [
    {
      id: "prfnm",
      type: "text",
      placeholder: "공연/페스티벌명",
    },
    {
      id: "area",
      type: "select",
      placeholder: "공연 지역",
      options: [
        "서울특별시",
        "부산광역시",
        "대구광역시",
        "인천광역시",
        "광주광역시",
        "대전광역시",
        "울산광역시",
        "세종특별자치시",
        "경기도",
        "강원특별자치도",
        "충청북도",
        "전라북도",
        "전라남도",
        "경상북도",
        "경상남도",
        "제주특별자치도",
        "전북특별자치도",
      ],
    },
    {
      id: "fcltynm",
      type: "text",
      placeholder: "공연 장소",
    },
    {
      id: "prfstate",
      type: "select",
      placeholder: "공연 진행 상황",
      options: ["공연예정", "공연중", "공연완료"],
    },
    {
      id: "prfpdfrom",
      type: "date",
      placeholder: "공연 시작일",
    },
    {
      id: "prfpdto",
      type: "date",
      placeholder: "공연 종료일",
    },
    {
      id: "prfcast",
      type: "text",
      placeholder: "출연진",
    },
    {
      id: "visit",
      type: "select",
      placeholder: "내한",
      options: ["Y", "N"],
    },
    {
      id: "festival",
      type: "select",
      placeholder: "페스티벌",
      options: ["Y", "N"],
    },
  ];

  

  const handleAddPerformanceButtonOnClick = async () => {
    if (imageFile.size < 1) {
      alert("이미지 없음");
      return;
    }

    for (const value of Object.values(detail)) {
      // console.log(value);
      if (!value) {
        alert("내용 누락");
        return;
      }
    }
    if (detail.prfpdfrom > detail.prfpdto) {
      alert("시작일은 종료일 이전이어야 합니다.");
      return;
    }

    for (let index in detail.relates) {
      for (const value of Object.values(detail.relates[index])) {
        if (value < 1) {
          alert("예매처 정보 누락");
          return;
        }
      }
    }

    let formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(detail)], {
        type: "application/json",
      })
    );
    formData.append("file", imageFile);

    try {
      const response = await reqUploadCustomPerformanceApi(formData);
      console.log(response);
      await Swal.fire({
        title: response.data,
        icon: "success",
        timer: 1500,
        allowOutsideClick: true,
      });
      setDetailEmpty();
      setImageFile({});
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDetail("relates", [...ticketingInputValue]);
  }, [ticketingInputValue]);

  return (
    <div css={s.layout}>
      <div>
        <AdminImageInput imageUrl={imageUrl} setImageUrl={setImageUrl} setImageFile={setImageFile}/>
      </div>
      <div css={s.inputListContainerLayout}>
        <AdminInputList inputList={inputList}  />
        <div css={s.inputTicketingContainer}>
            <AdminTicketingInputList 
              ticketingUrlList={ticketingUrlList} 
              setTicketingUrlList={setTicketingUrlList}  
              ticketingInputValue={ticketingInputValue}
              setTicketingInputValue={setTicketingInputValue}
            />
        </div>
      </div>
      <div css={s.addButtonContainer}>
          <Button
            variant="contained"
            onClick={handleAddPerformanceButtonOnClick}
            sx={{width:"8rem",
              height:"4rem",
              backgroundColor:"#EA580C"
            }}
          >
            공연 추가
          </Button>
        </div>
    </div>
  );
}

export default AdminAddPerformance2;
