import React, { useEffect, useState } from "react";
import * as s from "./styles";
import { IoSearch } from "react-icons/io5";
import useAdminPerformanceCheckBoxStore from "../../../stores/AdminPerformanceCheckboxStore";
import { usePublicDetailUploadManyMutation } from "../../../querys/admin/usePublicDetailUploadManyMutation";
import { usePublicApiSearchResultMutation } from "../../../querys/admin/usePublicApiSearchResultMutation";
import Button from "@mui/material/Button";
import useAdminPerformanceRowsStore from "../../../stores/AdminPerformanceRowsStore";
import TmpDataGrid from "../../../components/admin/AdminDataGrid/TmpDataGrid";
import TextField from "@mui/material/TextField";
/** @jsxImportSource @emotion/react */

function AdminTmp(props) {
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

  return (
    <div css={s.layout}>
      <header css={s.header}>
        <div css={s.titleContainer}>
          <h1>공연 목록 관리</h1>
        </div>
        <div css={s.searchContainer}>
          <TextField
            placeholder="공연/페스티벌명 검색"
            name="performanceName"
            onChange={handleSearchInputOnChange}
          >
            <div>
              <IoSearch />
            </div>
          </TextField>
          <div>
            <div>
              <IoSearch />
            </div>
            <input
              id="venue"
              type="text"
              placeholder="공연장 검색"
              onChange={handleSearchInputOnChange}
            />
          </div>
          <div>
            <Button
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
              onClick={(e) => {
                e.preventDefault();
                uploadManyMutation.mutateAsync(checkedRows);
              }}
            >
              추가
            </Button>
          </div>
        </div>
      </header>
      <main css={s.main}>
        <div>
          <TmpDataGrid props={searchInput} />
        </div>
      </main>
    </div>
  );
}

export default AdminTmp;
