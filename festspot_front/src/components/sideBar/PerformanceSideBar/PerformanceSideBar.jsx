/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import React from "react";
import { IoAirplane } from "react-icons/io5";
import { IoIosListBox, IoIosMicrophone } from "react-icons/io";
import { MdFestival } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

function PerformanceSideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const performances = [
    {
      id: "all",
      name: "전체",
      icon: <IoIosListBox />,
      categoryId: 1,
    },
    {
      id: "concert",
      name: "국내 공연",
      icon: <IoIosMicrophone />,
      categoryId: 2,
    },
    {
      id: "festival",
      name: "국내 페스티벌",
      icon: <MdFestival />,
      categoryId: 3,
    },
    {
      id: "visit",
      name: "내한 공연",
      icon: <IoAirplane />,
      categoryId: 4,
    },
  ];

  const handlePerformanceCategoryOnClick = (e, path) => {
    navigate(`/performance/${path}`);
  };

  return (
    <div css={s.sidebarContainer}>
      {/* 공연정보 네비게이션 */}
      <div css={s.performanceBtnContainer}>
        {performances.map((performance) => {
          return (
            <button
              key={performance.id}
              css={() =>
                s.performanceBtn(location.pathname.slice(13) === performance.id)
              }
              onClick={(e) =>
                handlePerformanceCategoryOnClick(e, performance.id)
              }
            >
              {performance.icon}
              {performance.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PerformanceSideBar;
