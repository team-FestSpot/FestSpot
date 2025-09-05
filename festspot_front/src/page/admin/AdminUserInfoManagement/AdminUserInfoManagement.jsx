import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import AdminUserInfoDataGrid from "../../../components/admin/AdminDataGrid/AdminUserInfoDataGrid/AdminUserInfoDataGrid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useUserListQuery } from "../../../querys/admin/useUserListQuery";

function AdminUserInfoManagement(props) {
  const userListQuery = useUserListQuery();
  const userList = userListQuery?.data?.data?.body;
  const [searchResult, setSearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const handleSearchInputOnChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearchButtonOnClick = () => {
    setIsSearch(true);
    setSearchResult(
      userList?.filter((user) => user?.userNickName?.includes(searchInput))
    );
  };
  const handleSearchResetButtonOnClick = () => {
    setIsSearch(false);
    setSearchResult([]);
  };

  return (
    <div css={s.layout}>
      <header css={s.header}>
        <div>
          <h2>사용자 관리</h2>
        </div>
        <div css={s.searchLayout}>
          <TextField
            id="name"
            type="text"
            size="small"
            placeholder="사용자 닉네임 검색"
            css={s.searchInput}
            onChange={handleSearchInputOnChange}
            sx={{ maxWidth: "15rem" }}
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
      </header>
      <main>
        <div>
          <div css={s.dataGridContainer}>
            <AdminUserInfoDataGrid searchResult={searchResult} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminUserInfoManagement;
