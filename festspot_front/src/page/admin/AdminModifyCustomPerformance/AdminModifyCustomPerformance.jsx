import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import AdminCustomPerformanceDataGrid from "../../../components/admin/AdminDataGrid/AdminCustomPerformanceDataGrid/AdminCustomPerformanceDataGrid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useAdminCustomPerformanceRowsStore from "../../../stores/AdminPerformanceCustomRowsStore";
import { useQueryClient } from "@tanstack/react-query";
import { useCustomPerformanceListQuery } from "../../../querys/admin/useCustomPerformanceListQuery";

function AdminModifyCustomPerformance(props) {
  const { refetch } = useCustomPerformanceListQuery();
  const { rows, setRows, setRowsEmpty } = useAdminCustomPerformanceRowsStore();
  const [searchResult, setSearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState({
    name: "",
    venue: "",
  });
  const [isSearch, setIsSearch] = useState(false);

  const handleSearchInputOnChange = (e) => {
    setSearchInput((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSearchButtonOnClick = async () => {
    let result = [];
    const name = searchInput.name.trim();
    const venue = searchInput.venue.trim();
    if (name.length < 1 && venue.length < 1) {
      alert("검색어를 입력하세요.");
      return;
    } else if (venue.length < 1) {
      result = rows.filter((row) => row.prfnm.includes(name));
    } else if (name.length < 1) {
      result = rows.filter((row) => row.prfnm.includes(venue));
    } else {
      result = rows.filter(
        (row) =>
          row.prfnm.trim().includes(name) && row.fcltynm.trim().includes(venue)
      );
    }
    setSearchResult(result);
    setIsSearch(true);
  };

  const handleSearchResetButtonOnClick = async () => {
    const result = await refetch();
    setRowsEmpty();
    setRows([...result?.data?.data?.body]);
    setIsSearch(false);
    setSearchResult([]);
  };

  // useEffect(() => {
  //   console.log(searchResult);
  // }, [searchResult]);

  // useEffect(() => {
  //   console.log(rows);
  // }, [rows]);

  return (
    <div css={s.layout}>
      <header css={s.header}>
        <div>
          <h2>api 외 공연 정보 수정</h2>
        </div>
      </header>
      <main>
        <div>
          <div css={s.searchLayout}>
            <TextField
              id="name"
              type="text"
              size="small"
              placeholder="공연/페스티벌명 검색"
              css={s.searchInput}
              onChange={handleSearchInputOnChange}
            />
            <TextField
              id="venue"
              type="text"
              size="small"
              placeholder="공연장 검색"
              css={s.searchInput}
              onChange={handleSearchInputOnChange}
            />
            <div>
              <Button variant="contained" onClick={handleSearchButtonOnClick}>
                검색
              </Button>
              {isSearch && (
                <Button
                  variant="contained"
                  onClick={handleSearchResetButtonOnClick}
                >
                  검색 초기화
                </Button>
              )}
            </div>
          </div>
        </div>
        <div>
          <AdminCustomPerformanceDataGrid searchResult={searchResult} />
        </div>
      </main>
    </div>
  );
}

export default AdminModifyCustomPerformance;
