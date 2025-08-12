/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { FaRegEdit } from "react-icons/fa";

import { useSearchParams } from "react-router-dom";
import useAdminPerformanceRowsStore from "../../../stores/AdminPerformanceRowsStore";
import useAdminPerformanceCheckBoxStore from "../../../stores/AdminPerformanceCheckboxStore";
import { reqPublicDetailUploadMutation } from "../../../querys/admin/reqPublicDetailUploadMutation";
import Pagination from "@mui/material/Pagination";
import { usePublicApiAllQuery } from "../../../querys/admin/usePublicApiAllQuery";

function AdminDataGrid(props) {
  const [searchParams, setSearchParams] = useSearchParams(); // 페이지 params 가져오는데 씀
  const pageParam = Number(searchParams.get("page")); // 페이지 param을 숫자로 형변환
  const [paginationList, setPaginationList] = useState([]);
  const { data, isLoading } = usePublicApiAllQuery(); // 공연예술통합전산망 api에 데이터 요청
  const { rows, setRows } = useAdminPerformanceRowsStore(); // data grid에 표시할 데이터들 전부 저장해두는 배열 전역상태
  const { setCheckedRows } = useAdminPerformanceCheckBoxStore(); // 다중추가하려고 체크한 row들 공연 api id 저장하는 전역상태
  const uploadMutation = reqPublicDetailUploadMutation(); // 등록 버튼 누르면 상세정보 받아서 백엔드에 전달하는 mutation
  const gridRef = useGridApiRef();
  const columns = [
    {
      field: "poster",
      headerName: "포스터",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <div>
          <img src={params.row.poster} width={"100%"} height={"100%"} />
        </div>
      ),
    },
    {
      field: "prfnm",
      headerName: "공연/페스티벌명",
      width: 300,
      editable: false,
    },
    {
      field: "genrenm",
      headerName: "카테고리",
      width: 100,
      editable: false,
    },
    {
      field: "area",
      headerName: "지역",
      width: 100,
      editable: false,
    },
    {
      field: "fcltynm",
      headerName: "공연 장소",
      width: 120,
      editable: false,
    },
    {
      field: "prfstate",
      headerName: "상태",
      width: 100,
      editable: false,
    },
    {
      field: "prfpdfrom",
      headerName: "공연 시작일",
      width: 100,
      editable: false,
    },
    {
      field: "prfpdto",
      headerName: "공연 종료일",
      width: 100,
      editable: false,
    },
    {
      field: "edit",
      headerName: "수정",
      width: 100,
      editable: false,
      renderCell: (params) => (
        <Button>
          <FaRegEdit />
        </Button> // 수정
      ),
    },
    {
      field: "action",
      headerName: "등록",
      width: 100,
      editable: false,
      renderCell: (params) => (
        <div>
          <Button
            onClick={
              (e) => {
                e.preventDefault();
                uploadMutation.mutateAsync(params.row.mt20id);
              } // 버튼 누르면 공연상세정보 받아와서 백엔드에 전달함
            }
          >
            등록
          </Button>
        </div> // 맨 오른쪽 등록 버튼
      ),
    },
  ];

  const handleRowSelectionOnChange = (e) => {
    setCheckedRows(e.ids);
  };

  const handlePaginationOnChange = (e) => {
    console.log(e.target.innerText);
    setSearchParams({
      page: e.target.innerText,
    });
  };

  useEffect(() => {
    setSearchParams({
      page: 1,
    });
  }, []);

  useEffect(() => {
    console.log(data);
    if (
      !isLoading &&
      Array.isArray(data) &&
      data.length > 0 &&
      rows.length < 1
    ) {
      setRows(data);
    }
  }, [isLoading]);

  // 페이지네이션 번호 구해주는 함수
  // rows가 1~20개면 [1], 21~40개면 [1, 2], 41~60개면 [1, 2, 3], 61~80개면 [1, 2, 3, 4], ...
  const getPaginationList = (total) => {
    if (total < 1) return [];
    // 구간 번호 = (n - 1) / 20 올림
    const section = Math.ceil(total / 20);
    // 1부터 section까지 배열 생성
    return Array.from({ length: section }, (_, i) => i + 1);
  };

  useEffect(() => {
    setPaginationList(getPaginationList(rows.length));
  }, [rows]);

  return (
    <div css={s.adminGridLayout}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          height: "100vh",
          maxHeight: "700px",
        }}
      >
        <DataGrid
          rows={rows.slice((pageParam - 1) * 20, pageParam * 20 - 1)} // 1페이지면 rows의 0~19번 인덱스, 2페이지면 20~39번 인덱스, 3페이지면 40~59번 인덱스, ...
          getRowId={(row) => row.mt20id}
          rowHeight={200}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          pageSizeOptions={[20]}
          checkboxSelection
          disableRowSelectionOnClick
          hideFooter
          apiRef={gridRef}
          onRowSelectionModelChange={handleRowSelectionOnChange}
        />
        <div css={s.paginationButtonLayout}>
          <Pagination
            count={paginationList.length}
            onChange={handlePaginationOnChange}
            hideNextButton
            hidePrevButton
          />
        </div>
      </Box>
    </div>
  );
}

export default AdminDataGrid;
