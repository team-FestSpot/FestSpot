import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import { useUserListQuery } from "../../../../querys/admin/useUserListQuery";
import { data, useSearchParams } from "react-router-dom";
import { baseURL } from "../../../../api/axios";
import Button from "@mui/material/Button";
import { FaCheck, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import TextField from "@mui/material/TextField";
import { useUserInfoUpdateMutation } from "../../../../querys/admin/useUserInfoUpdateMutation";
import { reqDeleteUserApi } from "../../../../api/adminApi";

function AdminUserInfoDataGrid({ searchResult }) {
  const [searchParams, setSearchParams] = useSearchParams(); // 페이지 params 가져오는데 씀
  const pageParam = Number(searchParams.get("page")); // 페이지 param을 숫자로 형변환
  const userListQuery = useUserListQuery();
  const userList = userListQuery?.data?.data?.body;
  const [rows, setRows] = useState([]);
  const [dataToUpdate, setDataToUpdate] = useState({
    userId: -1,
    userNickName: "",
    userProfileImgUrl: "",
  });
  const [newProfileImg, setNewProfileImg] = useState({});
  const [newProfileImgUrl, setNewProfileImgUrl] = useState(""); // 업로드할 프로필 이미지를 화면에 표시
  const [paginationList, setPaginationList] = useState([]);
  const gridRef = useGridApiRef();
  const updateMutation = useUserInfoUpdateMutation();
  const columns = [
    {
      field: "userProfileImgUrl",
      headerName: "프로필 이미지",
      width: 150,
      editable: false,
      renderCell: (params) =>
        params.row.userId === dataToUpdate.userId ? (
          <div css={s.modifyProfileImg}>
            <img
              src={
                !!newProfileImgUrl
                  ? `${newProfileImgUrl}`
                  : `${baseURL}/image/profile/${params.row.userProfileImgUrl}`
              }
            />
            <input type="file" onChange={handleProfileImgFileOnChange} />
          </div>
        ) : (
          <div css={s.modifyProfileImg}>
            <img
              src={`${baseURL}/image/profile/${params.row.userProfileImgUrl}`}
            />
          </div>
        ),
    },
    {
      field: "userEmail",
      headerName: "이메일",
      width: 200,
      editable: false,
    },
    {
      field: "userNickName",
      headerName: "닉네임",
      width: 100,
      editable: false,
      renderCell: (params) =>
        params.row.userId === dataToUpdate.userId ? (
          <div css={s.modifyGrid}>
            <TextField
              name="userNickName"
              defaultValue={dataToUpdate.userNickName}
              onChange={(e) =>
                setDataToUpdate((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              fullWidth
            />
          </div>
        ) : (
          <div css={s.modifyGrid}>{params.row.userNickName}</div>
        ),
    },
    {
      field: "createdAt",
      headerName: "가입일",
      width: 120,
      editable: false,
    },
    {
      field: "deletedAt",
      headerName: "탈퇴일",
      width: 120,
      editable: false,
    },
    {
      field: "provider",
      headerName: "간편로그인",
      width: 100,
      editable: false,
    },
    {
      field: "edit",
      headerName: "수정",
      width: 100,
      editable: false,
      renderCell: (params) =>
        params.row.userId === dataToUpdate.userId ? (
          <div css={s.modifyButton}>
            <Button
              onClick={async (e) => {
                await updateMutation.mutateAsync(
                  handleModifyButtonOnClick(e, params)
                );
                userListQuery.refetch();
              }}
            >
              <FaCheck />
            </Button>
            <Button onClick={handleModifyCancelButtonOnClick}>
              <FaXmark />
            </Button>
          </div>
        ) : (
          <div css={s.modifyButton}>
            <Button onClick={(e) => handleModifyButtonOnClick(e, params)}>
              <FaRegEdit />
            </Button>
          </div>
        ),
    },
    {
      field: "delete",
      headerName: "삭제(탈퇴)",
      width: 100,
      editable: false,
      renderCell: (params) => (
        <div>
          <Button onClick={(e) => handleDeleteButtonOnClick(e, params)}>
            <FaRegTrashAlt />
          </Button>
        </div>
      ),
    },
  ];

  const handleProfileImgFileOnChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setNewProfileImgUrl(e.target.result);
    };
    fileReader.readAsDataURL(file);
    setNewProfileImg(...e.target.files);
  };

  const handleModifyButtonOnClick = (e, params) => {
    if (dataToUpdate.userId < 0) {
      setDataToUpdate({
        userId: params.row.userId,
        userNickName: params.row.userNickName,
        userProfileImgUrl: params.row.userProfileImgUrl,
      });
      return;
    }
    let formData = new FormData();
    const jsonBlob = new Blob([JSON.stringify(dataToUpdate)], {
      type: "application/json",
    });
    formData.append("data", jsonBlob, "data.json");
    if (newProfileImg.size > 0) {
      formData.append("file", newProfileImg);
    }

    setDataToUpdate({
      userId: -1,
      userNickName: "",
      userProfileImgUrl: "",
    });
    return formData;
  };

  const handleModifyCancelButtonOnClick = () => {
    setDataToUpdate({
      userId: -1,
      userNickName: "",
      userProfileImgUrl: "",
    });
  };

  const handleDeleteButtonOnClick = async (e, params) => {
    await reqDeleteUserApi(params.row.userId);
    await userListQuery.refetch();
  };

  useEffect(() => {
    if (!userListQuery.isLoading && !!userList && rows.length < 0) {
      // console.log(userList);
      setRows(userList);
    }
  }, [userListQuery.isLoading]);

  useEffect(() => {
    if (!userListQuery.isRefetching && !!userList) {
      // console.log(userList);
      setRows(userList);
    }
  }, [userListQuery.isRefetching]);

  useEffect(() => {
    setSearchParams({
      page: 1,
    });
  }, []);

  const getPaginationList = (total) => {
    if (total < 1) return [];
    // 구간 번호 = (n - 1) / 20 올림
    const section = Math.ceil(total / 20);
    // 1부터 section까지 배열 생성
    return Array.from({ length: section }, (_, i) => i + 1);
  };

  const handlePaginationOnChange = (e) => {
    setSearchParams({
      page: e.target.innerText,
    });
  };

  useEffect(() => {
    setPaginationList(getPaginationList(rows.length));
  }, [rows]);

  useEffect(() => {
    if (
      !userListQuery.isLoading &&
      Array.isArray(userList) &&
      userList.length > 0 &&
      rows.length < 1
    ) {
      setRows([...userList]);
    }
  }, [userListQuery.isLoading]);

  return (
    <div css={s.adminGridLayout}>
      <div css={s.dataGridContainer}>
        <DataGrid
          rows={
            searchResult.length > 1
              ? searchResult.slice((pageParam - 1) * 20, pageParam * 20 - 1)
              : rows.slice((pageParam - 1) * 20, pageParam * 20 - 1)
          } // 1페이지면 rows의 0~19번 인덱스, 2페이지면 20~39번 인덱스, 3페이지면 40~59번 인덱스, ...
          getRowId={(row) => row.userId}
          rowHeight={200}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          sx={{
            fontSize: "1rem",
            width: "100%",
            height: "100%",
          }}
          pageSizeOptions={[20]}
          checkboxSelection={false}
          disableRowSelectionOnClick
          hideFooter
          apiRef={gridRef}
          // onColumnHeaderClick={handleColumnHeaderOnClick}
        />
      </div>
      <div css={s.paginationButtonLayout}>
        <Pagination
          count={paginationList.length}
          onChange={handlePaginationOnChange}
          hideNextButton
          hidePrevButton
        />
      </div>
    </div>
  );
}

export default AdminUserInfoDataGrid;
