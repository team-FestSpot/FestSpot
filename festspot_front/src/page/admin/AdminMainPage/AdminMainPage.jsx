import React, { useEffect, useState } from "react";
import * as s from "./styles";
import { IoSearch } from "react-icons/io5";
import AdminDataGrid from "../../../components/admin/AdminDataGrid/AdminDashboardDataGrid/AdminDataGrid";
import useAdminPerformanceCheckBoxStore from "../../../stores/AdminPerformanceCheckboxStore";
import { usePublicDetailUploadManyMutation } from "../../../querys/admin/usePublicDetailUploadManyMutation";
import { usePublicApiSearchResultMutation } from "../../../querys/admin/usePublicApiSearchResultMutation";
import Button from "@mui/material/Button";
import useAdminPerformanceRowsStore from "../../../stores/AdminPerformanceRowsStore";
import TextField from "@mui/material/TextField";
import { useSearchParams } from "react-router-dom";
/** @jsxImportSource @emotion/react */

function AdminMainPage(props) {
  const [searchParams, setSearchParams] = useSearchParams(); // 페이지 params
  const [searchInput, setSearchInput] = useState({
    name: "",
    venue: "",
  });

  const { checkedRows } = useAdminPerformanceCheckBoxStore(); // 다중추가하려고 체크한 row들 공연 api id 저장하는 전역상태
  const uploadManyMutation = usePublicDetailUploadManyMutation();
  const searchMutation = usePublicApiSearchResultMutation();
  const { setRows, setRowsEmpty } = useAdminPerformanceRowsStore(); // data grid에 표시할 데이터들 전부 저장해두는 배열 전역상태
  let searchMutationParams = {
    page: 1,
    size: 100,
    name: searchInput.name,
    venue: searchInput.venue,
  };

  const handleSearchInputOnChange = (e) => {
    setSearchInput({
      ...searchInput,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    setSearchParams({
      page: 1,
    });
  }, []);

  return (
    <div css={s.layout}>
      <header css={s.header}>
        <div>
          <h2>공연 목록 관리</h2>
        </div>
      </header>
      <main css={s.main}>
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
              <Button
                variant="contained"
                onClick={async (e) => {
                  e.preventDefault();
                  setRowsEmpty();
                  while (
                    !!(await searchMutation.mutateAsync(searchMutationParams))
                  ) {
                    await searchMutation
                      .mutateAsync(searchMutationParams)
                      .then((result) => setRows(result));
                    searchMutationParams.page++;
                  }
                }}
              >
                검색
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
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
        <div css={s.dataGridContainer}>
          <AdminDataGrid props={searchInput} />
        </div>
      </main>
    </div>
  );
}

export default AdminMainPage;
