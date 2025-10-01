import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
s;
import ReactModal from "react-modal";
import { Global } from "@emotion/react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import Button from "@mui/material/Button";
import { reqModifyCustomPerformanceApi } from "../../../../api/adminApi";
import Checkbox from "@mui/material/Checkbox";
import { useCustomPerformanceListQuery } from "../../../../querys/admin/useCustomPerformanceListQuery";
import useAdminCustomPerformanceRowsStore from "../../../../stores/AdminPerformanceCustomRowsStore";
import { PERFORMANCE_POSTER_IMG_PATH } from "../../../../constants/performancePosterImgPath";
import { FiX } from "react-icons/fi";
import AdminInputList from "../../AdminInputList/AdminInputList";
import AdminTicketingInputList from "../../AdminTicketingInputList/AdminTicketingInputList";
import TextField from "@mui/material/TextField";
import useAdminAddPerformanceStore from "../../../../stores/AdminAddPerformanceStore";

function AdminPerformanceUpdateModal2({
  isOpen,
  closeModal,
  performanceToUpdate,
}) {
  const { setRows, setRowsEmpty } = useAdminCustomPerformanceRowsStore();
  const customPerformanceListQuery = useCustomPerformanceListQuery();
  // const { performanceToUpdate, setPerformanceToUpdate } =
  //   useAdminPerformanceUpdateStore();
  const [newPoster, setNewPoster] = useState({});
  const [newPosterUrl, setNewPosterUrl] = useState(""); // 화면에 업로드할 이미지 표시
  const { detail, setDetail } = useAdminAddPerformanceStore();
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
  const [performance, setPerformance] = useState({});

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

  // 새로 추가할 예매처명/url 입력란
  const [ticketingInputValue, setTicketingInputValue] = useState([
    {
      relatenm: "",
      relateurl: "",
    },
  ]);

  // 기존에 있던 예매처/url 입력란
  const [ticketingList, setTicketingList] = useState([]);
  // 기존에 있던 예매처/url 중 체크 해제한(삭제할) url 목록
  const [deletedTicketingList, setDeletedTicketingList] = useState([]);

  // 입력창 컴포넌트 (예매처 목록 전용)
    const inputComponent = (id, type, defaultValue, placeholder, index) => {
      return (
        <div css={s.inputComponent}>
          <div>
            <p>{placeholder}</p>
          </div>
          <div css={s.inputBox}>
            <TextField
              id={id}
              type={type}
              defaultValue={defaultValue}
              onChange={(e) => handleInputOnChange(e, index)}
              onKeyDown={(e) => (type !== "text" ? e.preventDefault() : null)}
              size="small"
              sx={{ width: "100%" }}
            />
          </div>
        </div>
      );
    };

  // 입력창에 입력 시 동작하는 핸들러 (예매처 목록 전용)
  const handleInputOnChange = (e, index) => {
    const { id, value } = e.target;
    if (id.includes("prevrelate")) {
      setTicketingList((prev) => {
        const list = [...prev];
        list[index] = {
          ...list[index],
          [id.replace("prev", "")]: value,
        };
        return list;
      });
    } else if (id.includes("newrelate")) {
      setTicketingInputValue((prev) => {
        const inputValue = [...prev];
        inputValue[index] = {
          ...inputValue[index],
          [id.replace("new", "")]: value,
        };
        return inputValue;
      });
    } else {
      setPerformance({
        ...performance,
        [id]: value,
      });
    }
  };

  // 이미지 파일 바꾸면 바꾼 이미지 표시 + 전송할 때 보내도록 상태에 저장
  const handleFileInputOnChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setNewPosterUrl(e.target.result);
    };
    fileReader.readAsDataURL(file);
    setNewPoster(...e.target.files);
  };

  // 모달 열리면 수정할 공연정보를 모달 내에서 사용할 상태들에 저장
  // performance = 공연 정보, ticketingList = 기존에 저장했던 예매처 목록
  useEffect(() => {
    setPerformance(performanceToUpdate);
    Object.entries(performanceToUpdate).forEach((item) => {
      if(item[0] === "relates") {
        return;
      }
      setDetail(item[0], item[1]);
    });
    setTicketingList(performanceToUpdate.relates);
  }, [performanceToUpdate]);

  // useEffect(() => {
  //   console.log(detail);
  // }, [detail]);

  // 기존에 저장한 예매처 목록 옆 체크박스 체크 또는 해제 시 동작
  const handleUrlCheckboxOnChange = (e, relate) => {
    const { id, checked } = e.target;
    if (checked === true) {
      // 체크하면 삭제되지 않고 업데이트됨
      setTicketingList((prev) => [...prev, relate]);
      setDeletedTicketingList((prev) => prev.filter((relate) => relate.ticketingUrlId !== parseInt(id)));
    }
    // 체크 해제하고 수정 버튼 누르면 그 예매처 정보는 삭제됨
    else if (checked === false) {
      setTicketingList((prev) => prev.filter((relate) => relate.ticketingUrlId !== parseInt(id)));
      setDeletedTicketingList((prev) => [...prev, relate]);
    }
  };

  // 수정 버튼 누르면 백엔드에 요청 날려서 수정 -> refetch
  const handleModifyButtonOnClick = async () => {
    let data = {};
    let ticketingUrlList = [];
    for (let item of ticketingList) {
      ticketingUrlList.push(item);
    }
    for (let inputValue of ticketingInputValue) {
      if (Object.values(inputValue)[0].length < 1) {
        continue;
      }
      if (Object.values(inputValue)[1].length < 1) {
        continue;
      }
      ticketingUrlList.push(inputValue);
    }
    data = { ...detail };
    data.relates = ticketingUrlList;
    // console.log(data);

    for (const [key, value] of Object.entries(data)) {
      if (key !== "relates") {
        if (!value) {
          alert("내용 누락");
          return;
        }
      } else if (key === "relates") {
        for (let index in data.relates) {
          for (const value of Object.values(data.relates[index])) {
            if (!value) {
              alert("예매처 정보 누락");
              return;
            }
          }
        }
      }
    }

    if (data.prfpdfrom > data.prfpdto) {
      alert("시작일은 종료일 이전이어야 합니다.");
      return;
    }

    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(data)], {
        type: "application/json",
      })
    );
    formData.append(
      "performanceId",
      new Blob([JSON.stringify(performance.performanceId)], {
        type: "application/json",
      })
    );
    formData.append(
      "deletedTicketingList",
      new Blob([JSON.stringify(deletedTicketingList)], {
        type: "application/json",
      })
    );
    if (newPoster.size > 0) {
      formData.append("file", newPoster);
    }

    await reqModifyCustomPerformanceApi(formData);

    const refetchResult = await customPerformanceListQuery.refetch();
    setTicketingInputValue([
      {
        relatenm: "",
        relateurl: "",
      },
    ]);
    setRowsEmpty();
    setRows(refetchResult?.data?.data?.body);
    closeModal();
  };

  return (
    <>
      <Global styles={s.layout} />
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        appElement={document.getElementById("root")}
        className="modal-content" // CSS 클래스 적용
        style={{
          overlay: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#00000088",
            zIndex: "10",
          },
        }}
      >
        <div css={s.mainContainer}>
          <div css={s.closeModalButton}>
            <Button
              sx={{
                width: "3rem",
                height: "3rem",
                minWidth: "3rem",
                minHeight: "3rem",
                padding: 0,
                "& svg": {
                  fontSize: 16, // 아이콘 크기도 조정
                },
              }}
              variant="outline"
              onClick={() => closeModal()}
            >
              <FiX />
            </Button>
          </div>
          <div>
            {newPosterUrl.length < 1 ? (
              <div css={s.imgBox}>
                <img
                  src={`${PERFORMANCE_POSTER_IMG_PATH}${performance.poster}`}
                  alt=""
                />
              </div>
            ) : (
              <div css={s.imgBox}>
                <img src={newPosterUrl} alt="" />
              </div>
            )}
            <div css={s.inputFileComponent}>
              <input type="file" onChange={handleFileInputOnChange} />
            </div>
          </div>
          <div>
            <div>
              <AdminInputList inputList={inputList} setPerformance={setPerformance} />
            </div>

            {/* 기존 예매처 */}
            <div css={s.ticketingInputContainer}>
              {performanceToUpdate.relates.map((relate, index) => (
                <div key={index} css={s.ticketingInputs}>
                  <div>
                    {inputComponent(
                      "prevrelatenm",
                      "text",
                      relate.relatenm,
                      "예매처명",
                      index
                    )}
                  </div>
                  <div>
                    {inputComponent(
                      "prevrelateurl",
                      "text",
                      relate.relateurl,
                      "예매처 URL",
                      index
                    )}
                  </div>

                  <Checkbox
                    id={relate.ticketingUrlId}
                    defaultChecked
                    onChange={(e) => handleUrlCheckboxOnChange(e, relate)}
                  />
                </div>
              ))}
            </div>

            {/* 신규 예매처 */}
            <div css={s.inputListContainerLayout}>
              <AdminTicketingInputList 
                ticketingUrlList={ticketingUrlList} 
                setTicketingUrlList={setTicketingUrlList}  
                ticketingInputValue={ticketingInputValue}
                setTicketingInputValue={setTicketingInputValue}
              />
            </div>
          </div>
          <div css={s.modifyButtonContainer}>
            <Button 
              onClick={handleModifyButtonOnClick}
              variant="contained"
              sx={{ backgroundColor:"#EA580C" }}
            >
              수정
            </Button>
          </div>
        </div>
      </ReactModal>
    </>
  );
}

export default AdminPerformanceUpdateModal2;
