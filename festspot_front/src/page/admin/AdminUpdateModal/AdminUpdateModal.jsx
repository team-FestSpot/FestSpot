import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import useAdminPerformanceUpdateStore from "../../../stores/AdminPerformanceUpdateStore";
import ReactModal from "react-modal";
import { Global } from "@emotion/react";

function AdminUpdateModal({ isOpen, closeModal }) {
  const { performanceToUpdate } = useAdminPerformanceUpdateStore();
  const [performance, setPerformance] = useState({});

  const handleInputOnChange = (e, index) => {
    setPerformance({
      ...performance,
      [index]: e.target.value,
    });
  };

  useEffect(() => {
    console.log(performanceToUpdate);
    setPerformance(performanceToUpdate);
  }, []);

  const inputComponent = (value, index) => {
    return (
      <input value={value} onChange={(e) => handleInputOnChange(e, index)} />
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
            width: "100px",
            height: "100px",
          },
        }}
      >
        {/* <div css={s.mainContainer}>
        <div css={s.imgContainer}>
        <img src={performance.poster} alt="" />
        </div>
        <div>
        <div>{inputComponent(performanceToUpdate.prfnm, "prfnm")}</div>
        <div>{inputComponent(performanceToUpdate.fcltynm, "fcltynm")}</div>
        <div>
        <select name="" id="" defaultValue={performanceToUpdate.area}>
        <option value="11">서울특별시</option>
        <option value="28">인천광역시</option>
        <option value="30">대전광역시</option>
        <option value="27">대구광역시</option>
        <option value="29">광주광역시</option>
        <option value="26">부산광역시</option>
        <option value="31">울산광역시</option>
        <option value="36">세종특별자치시</option>
        <option value="41">경기도</option>
        <option value="51">강원특별자치도</option>
        <option value="43">충청북도</option>
        <option value="44">충청남도</option>
        <option value="45">전라북도</option>
        <option value="46">전라남도</option>
        <option value="47">경상북도</option>
        <option value="48">경상남도</option>
        <option value="50">제주특별자치도</option>
        <option value="52">전북특별자치도</option>
        </select>
        </div>
        <div>{performanceToUpdate.prfpdfrom}</div>
        <div>{performanceToUpdate.prfpdto}</div>
        </div>
        </div> */}
        asdf
      </ReactModal>
    </>
  );
}

export default AdminUpdateModal;
