import React, { useEffect } from "react";
import AdminLeftSideBar from "../../sidebar/AdminLeftSideBar";
import * as s from "./styles";
import { IoSearch } from "react-icons/io5";
import AdminDataGrid from "../AdminDataGrid/AdminDataGrid";
import useAdminPerformanceUpdateModalStore from "../../../stores/AdminPerformanceUpdateModalStore";
import AdminUpdateModal from "../AdminUpdateModal/AdminUpdateModal";
/** @jsxImportSource @emotion/react */

function AdminMainPage(props) {
  const { isUpdate } = useAdminPerformanceUpdateModalStore();

  return (
    <div css={s.layout}>
      {!!isUpdate && (
        <div css={s.updateModal}>
          <AdminUpdateModal />
        </div>
      )}
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
                  />
                </div>
                <div>
                  <select name="" id="">
                    <option value="all">전체</option>
                    <option value="category1">카테고리1</option>
                    <option value="category2">카테고리2</option>
                    <option value="category3">카테고리3</option>
                  </select>
                  <button>추가</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <AdminDataGrid />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminMainPage;
