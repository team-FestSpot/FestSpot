import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import * as ss from "../../../components/admin/AdminInput/styles";
import AdminInput from "../../../components/admin/AdminInput/AdminInput";
import Button from "@mui/material/Button";
import useAdminAddPerformanceStore from "../../../stores/AdminAddPerformanceStore";
import { reqUploadCustomPerformanceApi } from "../../../api/adminApi";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";

function AdminAddPerformance(props) {
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

  const handleImageUploadOnChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setImageUrl(e.target.result);
    };
    fileReader.readAsDataURL(file);
    setImageFile(...e.target.files);

    // const filesArray = [...e.target.files];

    // Promise.all(filesArray.map(file => {
    //     return new Promise(resolve => {
    //         const fileReader = new FileReader();
    //         fileReader.onload = (e) => {
    //             resolve({file, dataUrl: e.target.result});
    //         }
    //         fileReader.readAsDataURL(file);
    //     })
    // })).then(resolves => {
    //     setImages(prev => [...prev, ...resolves]);
    // });
  };

  const handleTicketingPlusOnClick = () => {
    setTicketingUrlList([
      ...ticketingUrlList,
      {
        id1: "relatenm",
        type1: "text",
        placeholder1: "예매처명",

        id2: "relateurl",
        type2: "text",
        placeholder2: "예매처 URL",
      },
    ]);

    setTicketingInputValue([
      ...ticketingInputValue,
      {
        relatenm: "",
        relateurl: "",
      },
    ]);
  };

  // 예매처 - 버튼 눌렀을 때 해당 열을 지우고 싶은데 어디에 있는 버튼을 눌러도 맨 마지막 열이 지워짐
  // 그래서 그냥 버튼이 마지막 열에만 생기도록 수정함
  const handleTicketingMinusOnClick = (e, deleteIndex) => {
    setTicketingUrlList(
      ticketingUrlList.filter((url, index) => index !== deleteIndex)
    );
    setTicketingInputValue(
      ticketingInputValue.filter((inputValue, index) => index !== deleteIndex)
    );
  };

  const handleTicketingInputOnChange = (e, index) => {
    const { id, value } = e.target;
    setTicketingInputValue((prev) => {
      const inputValue = [...prev];
      inputValue[index] = { ...inputValue[index], [id]: value };
      return inputValue;
    });
  };

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
      await reqUploadCustomPerformanceApi(formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDetail("relates", [...ticketingInputValue]);
  }, [ticketingInputValue]);

  return (
    <div css={s.layout}>
      <div css={s.imgContainerLayout}>
        {!!imageUrl && (
          <div css={s.imgContainer}>
            <img src={imageUrl} alt="" />
          </div>
        )}
      </div>
      <div css={s.inputListContainerLayout}>
        <div css={s.imgInput}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUploadOnChange}
          />
        </div>
        <div css={s.inputListContainer}>
          {inputList.map((input, index) => (
            <div key={index} css={s.inputListContainer}>
              <AdminInput props={input} />
            </div>
          ))}
          {ticketingUrlList.map((ticketingUrl, index) => (
            <div css={s.inputTicketingContainer} key={index}>
              <div css={s.menuText}>
                <p>{ticketingUrl.placeholder1}</p>
              </div>
              <div css={s.inputTicketingAgencyNameContainer}>
                <input
                  id={ticketingUrl.id1}
                  type={ticketingUrl.type1}
                  placeholder={ticketingUrl.placeholder1}
                  value={ticketingInputValue.relatenm}
                  onChange={(e) => handleTicketingInputOnChange(e, index)}
                />
              </div>
              <div css={s.menuText}>
                <p>{ticketingUrl.placeholder2}</p>
              </div>
              <div css={s.inputTicketingUrlContainer}>
                <input
                  id={ticketingUrl.id2}
                  type={ticketingUrl.type2}
                  placeholder={ticketingUrl.placeholder2}
                  value={ticketingInputValue.relateurl}
                  onChange={(e) => handleTicketingInputOnChange(e, index)}
                />
              </div>
              <div css={s.urlAddRemoveButtonsContainer}>
                {index === ticketingUrlList.length - 1 && (
                  <CiSquarePlus onClick={handleTicketingPlusOnClick} />
                )}

                {index > 0 && index === ticketingUrlList.length - 1 && (
                  <CiSquareMinus
                    onClick={(e) => handleTicketingMinusOnClick(e, index)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div>
          <Button onClick={handleAddPerformanceButtonOnClick}>공연 추가</Button>
        </div>
      </div>
    </div>
  );
}

export default AdminAddPerformance;
