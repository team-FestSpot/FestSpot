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

function AdminPerformanceUpdateModal({
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
  const [performance, setPerformance] = useState({});

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

  // 입력창 컴포넌트
  const inputComponent = (id, type, defaultValue, placeholder, index) => {
    return (
      <div css={s.inputComponent}>
        <div>
          <p>{placeholder}</p>
        </div>
        <div css={s.inputBox}>
          <input
            id={id}
            type={type}
            defaultValue={defaultValue}
            onChange={(e) => handleInputOnChange(e, index)}
            onKeyDown={(e) => (type !== "text" ? e.preventDefault() : null)}
          />
        </div>
      </div>
    );
  };

  // 지역, 내한여부 등 select 컴포넌트
  const selectComponent = (id, defaultValue, placeholder, options) => {
    return (
      <div css={s.inputComponent}>
        <div>
          <p>{placeholder}</p>
        </div>
        <div css={s.selectBox}>
          <select
            id={id}
            defaultValue={defaultValue}
            onChange={(e) => handleInputOnChange(e, id)}
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  // 입력창에 입력 시 동작하는 핸들러
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

  // 모달 열리면 수정할 공연정보를 모달 내에서 사용할 상태들에 저장
  // performance = 공연 정보, ticketingList = 기존에 저장했던 예매처 목록
  useEffect(() => {
    console.log(performanceToUpdate);
    setPerformance(performanceToUpdate);
    setTicketingList(performanceToUpdate.relates);
  }, [performanceToUpdate]);

  // 기존에 저장한 예매처 목록 옆 체크박스 체크 또는 해제 시 동작
  const handleUrlCheckboxOnChange = (e, relate) => {
    const { id, checked } = e.target;
    if (checked === true) {
      // 체크하면 삭제되지 않고 업데이트됨
      setTicketingList((prev) => [...prev, relate]);
      setDeletedTicketingList((prev) => {
        return prev.filter((relate) => relate.ticketingUrlId !== parseInt(id));
      });
    }
    // 체크 해제하고 수정 버튼 누르면 그 예매처 정보는 삭제됨
    else if (checked === false) {
      setTicketingList((prev) => {
        return prev.filter((relate) => relate.ticketingUrlId !== parseInt(id));
      });
      setDeletedTicketingList((prev) => [...prev, relate]);
    }
  };

  // 새로 추가할 예매처 목록 옆 + 누르면 입력란 한줄씩 추가
  const handleTicketingPlusOnClick = () => {
    setTicketingInputValue((prev) => [
      ...prev,
      {
        relatenm: "",
        relateurl: "",
      },
    ]);
  };

  // 새로 추가할 예매처 목록 옆 - 누르면 입력란 한줄씩 삭제
  const handleTicketingMinusOnClick = (e, deleteIndex) => {
    // 새로 추가할 예매처 목록이 1줄만 있을 땐 -버튼은 사라지지만 만약에 안 사라졌더라도 눌렀을때 동작 안 하게 함
    if (deleteIndex < 1) {
      return;
    }
    setTicketingInputValue(
      ticketingInputValue.filter((inputValue, index) => index !== deleteIndex)
    );
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
    data = { ...performance };
    data.relates = ticketingUrlList;

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
          // content: {
          //   display: "flex",
          //   position: "static",
          //   justifyContent: "center",
          //   alignItems: "center",
          //   width: "50%",
          //   height: "100vh",
          // },
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
            {inputComponent(
              "prfnm",
              "text",
              performanceToUpdate.prfnm,
              "공연/페스티벌명"
            )}
            {inputComponent(
              "fcltynm",
              "text",
              performanceToUpdate.fcltynm,
              "공연 장소"
            )}
            {inputComponent(
              "prfcast",
              "text",
              performanceToUpdate.prfcast,
              "출연진"
            )}
            {selectComponent("area", performanceToUpdate.area, "지역", [
              "서울특별시",
              "인천광역시",
              "대전광역시",
              "대구광역시",
              "광주광역시",
              "부산광역시",
              "울산광역시",
              "세종특별자치시",
              "경기도",
              "강원특별자치도",
              "충청북도",
              "충청남도",
              "전라북도",
              "전라남도",
              "경상북도",
              "경상남도",
              "제주특별자치도",
              "전북특별자치도",
            ])}
            {inputComponent(
              "prfpdfrom",
              "date",
              performanceToUpdate.prfpdfrom,
              "공연 시작일"
            )}
            {inputComponent(
              "prfpdto",
              "date",
              performanceToUpdate.prfpdto,
              "공연 종료일"
            )}
            {selectComponent("visit", performanceToUpdate.visit, "내한", [
              "Y",
              "N",
            ])}
            {selectComponent(
              "festival",
              performanceToUpdate.festival,
              "페스티벌",
              ["Y", "N"]
            )}

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
            <div css={s.ticketingInputContainer}>
              {ticketingInputValue.map((inputValue, index) => (
                <div key={index} css={s.ticketingInputs}>
                  <div>
                    {inputComponent(
                      "newrelatenm",
                      "text",
                      inputValue.relatenm,
                      "예매처명",
                      index
                    )}
                  </div>
                  <div>
                    {inputComponent(
                      "newrelateurl",
                      "text",
                      inputValue.relateurl,
                      "예매처 URL",
                      index
                    )}
                  </div>

                  <div css={s.urlAddRemoveButtonsContainer}>
                    {index === ticketingInputValue.length - 1 && (
                      <CiSquarePlus onClick={handleTicketingPlusOnClick} />
                    )}

                    {index > 0 && index === ticketingInputValue.length - 1 && (
                      <CiSquareMinus
                        onClick={(e) => handleTicketingMinusOnClick(e, index)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div css={s.modifyButtonContainer}>
            <Button onClick={handleModifyButtonOnClick}>수정</Button>
          </div>
        </div>
      </ReactModal>
    </>
  );
}

export default AdminPerformanceUpdateModal;
