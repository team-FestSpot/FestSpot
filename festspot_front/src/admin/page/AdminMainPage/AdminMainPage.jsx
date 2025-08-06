import React, { useEffect, useState } from "react";
import * as s from "./styles";
import { IoSearch } from "react-icons/io5";
import AdminDataGrid from "../AdminDataGrid/AdminDataGrid";
import AdminLeftSideBar from "../../sidebar/AdminLeftSideBar";
import { getPublicApiQuery } from "../../../querys/admin/getPublicApiQuery";
/** @jsxImportSource @emotion/react */

function AdminMainPage(props) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputOnKeyDown = (e) => {
    if (e.keyCode !== 13) {
      return;
    }
    setSearchInput(e.target.value);
  };

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
                <div>
                  <select name="" id="">
                    <option value="">전체</option>
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
            <AdminDataGrid props={searchInput} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminMainPage;
