import React, { useEffect, useState } from "react";
import * as s from "./styles";
import { IoSearch } from "react-icons/io5";
import AdminDataGrid from "../AdminDataGrid/AdminDataGrid";
import AdminLeftSideBar from "../../sidebar/AdminLeftSideBar";
import useAdminPerformanceCheckBoxStore from "../../../stores/AdminPerformanceCheckboxStore";
import { reqPublicDetailUploadManyMutation } from "../../../querys/admin/reqPublicDetailUploadManyMutation";

import Button from "@mui/material/Button";
import Swal from "sweetalert2";
/** @jsxImportSource @emotion/react */

function AdminMainPage(props) {
  const [searchInput, setSearchInput] = useState({});
  const { checkedRows } = useAdminPerformanceCheckBoxStore(); // 다중추가하려고 체크한 row들 공연 api id 저장하는 전역상태
  const uploadManyMutation = reqPublicDetailUploadManyMutation();

  const handleSearchInputOnKeyDown = (e) => {
    if (e.keyCode !== 13) {
      return;
    }
    setSearchInput(e.target.value);
  };

  // const handleUploadManyWithoutCheckOnClick = () => {
  //   if (checkedRows.length < 1) {
  //     Swal.fire({
  //       title: "1개 이상의 항목을 선택하세요.",
  //       icon: "error",
  //       showCloseButton: false,
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //   }
  // };

  return (
    <div css={s.layout}>
      <div css={s.sidebarLayout}>
        <AdminLeftSideBar />
      </div>
      <div css={s.mainLayout}>
        <header css={s.header}>
          <div>
            <h2>공연 목록 관리</h2>
          </div>
        </header>
        <main>
          <div>
            <div>
              <div css={s.searchLayout}>
                <div css={s.searchInputLayout}>
                  <IoSearch css={s.searchButton} />
                  <input
                    type="text"
                    placeholder="공연/페스티벌명 검색"
                    css={s.searchInput}
                    onKeyDown={handleSearchInputOnKeyDown}
                  />
                </div>
                <div css={s.searchInputLayout}>
                  <IoSearch css={s.searchButton} />
                  <input
                    type="text"
                    placeholder="공연장 검색"
                    css={s.searchInput}
                    onKeyDown={handleSearchInputOnKeyDown}
                  />
                </div>
                <div>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      uploadManyMutation.mutateAsync(checkedRows);
                    }}
                  >
                    추가
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <AdminDataGrid props={searchInput} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminMainPage;
