import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import useAdminPerformanceUpdateStore from "../../../stores/AdminPerformanceUpdateStore";
import ReactModal from "react-modal";
import { Global } from "@emotion/react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { baseURL } from "../../../api/axios";

function AdminUpdateModal({ isOpen, closeModal }) {
  const { performanceToUpdate } = useAdminPerformanceUpdateStore();
  const [newPoster, setNewPoster] = useState({});
  const [newPosterUrl, setNewPosterUrl] = useState(""); // 화면에 업로드할 이미지 표시
  const [performance, setPerformance] = useState({});

  const [ticketingInputValue, setTicketingInputValue] = useState([
    {
      relatenm: "",
      relateurl: "",
    },
  ]);

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

  const inputComponent = (id, type, defaultValue, placeholder, index) => {
    return (
      <div css={s.inputComponent}>
        <div>
          <p>{placeholder}</p>
        </div>
        <div>
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

  const selectComponent = (id, defaultValue, placeholder, options) => {
    return (
      <div css={s.inputComponent}>
        <div>{placeholder}</div>
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
    );
  };

  const handleInputOnChange = (e, index) => {
    const { id, value } = e.target;
    if (id.includes("relate")) {
      console.log(id);
      console.log(index);
      setTicketingInputValue((prev) => {
        const inputValue = [...prev];
        inputValue[index] = { ...inputValue[index], [id]: value };
        return inputValue;
      });
    } else {
      setPerformance({
        ...performance,
        [id]: value,
      });
    }
  };

  useEffect(() => {
    setPerformance(performanceToUpdate);
    setTicketingInputValue(performanceToUpdate.relates);
  }, [performanceToUpdate]);

  useEffect(() => {
    console.log(performance);
    console.log(ticketingInputValue);
  }, [performance]);

  useEffect(() => {
    console.log(ticketingInputValue);
    setPerformance((prev) => ({ ...prev, relates: [...ticketingInputValue] }));
  }, [ticketingInputValue]);

  const handleTicketingPlusOnClick = () => {
    setTicketingInputValue((prev) => [
      ...prev,
      {
        relatenm: "",
        relateurl: "",
      },
    ]);
  };

  const handleTicketingMinusOnClick = (e, deleteIndex) => {
    setTicketingInputValue(
      ticketingInputValue.filter((inputValue, index) => index !== deleteIndex)
    );
  };

  return (
    <>
      <Global styles={s.layout} />
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        appElement={document.getElementById("root")}
        style={{
          overlay: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#00000088",
            zIndex: "10",
          },
          content: {
            display: "flex",
            position: "static",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            height: "100vh",
          },
        }}
      >
        <div css={s.mainContainer}>
          {Object.keys(newPoster).length < 1 ? (
            <div css={s.imgContainer}>
              <img src={`${baseURL}${performance.poster}`} alt="" />
            </div>
          ) : (
            <div css={s.imgContainer}>
              <img src={newPosterUrl} alt="" />
            </div>
          )}
          <div css={s.inputComponent}>
            <input type="file" onChange={handleFileInputOnChange} />
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

            {ticketingInputValue.map((inputValue, index) => (
              <div key={index} css={s.ticketingInputContainer}>
                {inputComponent(
                  "relatenm",
                  "text",
                  inputValue.relatenm,
                  "예매처명",
                  index
                )}
                {inputComponent(
                  "relateurl",
                  "text",
                  inputValue.relateurl,
                  "예매처 URL",
                  index
                )}
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
      </ReactModal>
    </>
  );
}

export default AdminUpdateModal;
