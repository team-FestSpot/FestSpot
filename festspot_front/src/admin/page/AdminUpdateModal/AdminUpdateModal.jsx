import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import useAdminPerformanceUpdateStore from "../../../stores/AdminPerformanceUpdateStore";
import useAdminPerformanceUpdateModalStore from "../../../stores/AdminPerformanceUpdateModalStore";
import { IoClose } from "react-icons/io5";

function AdminUpdateModal(props) {
  const { performanceToUpdate } = useAdminPerformanceUpdateStore();
  const [performance, setPerformance] = useState({});
  const { closeUpdateModal } = useAdminPerformanceUpdateModalStore();

  const handleInputOnChange = (e, index) => {
    setPerformance({
      ...performance,
      [index]: e.target.value,
    });
  };

  //   console.log(performanceToUpdate.row);
  useEffect(() => {
    setPerformance(performanceToUpdate.row);
  }, []);

  const inputComponent = (value, index) => {
    return (
      <input value={value} onChange={(e) => handleInputOnChange(e, index)} />
    );
  };

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <div css={s.closeModalButton}>
          <IoClose onClick={() => closeUpdateModal()} />
        </div>
        <div css={s.mainContainer}>
          <div css={s.imgContainer}>
            <img src={performance.poster} alt="" />
          </div>
          <div>
            <div>{inputComponent(performance.prfnm, "prfnm")}</div>
            <div>{performance.genrenm}</div>
            <div>{inputComponent(performance.fcltynm, "fcltynm")}</div>
            <div>
              <select name="" id="" defaultValue={performance.area}>
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
              </select>
            </div>
            <div>{inputComponent(performance.participant, "participant")}</div>
            <div>{performance.prfpdfrom}</div>
            <div>{performance.prfpdto}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUpdateModal;
