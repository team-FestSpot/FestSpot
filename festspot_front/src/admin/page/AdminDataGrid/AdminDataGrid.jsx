/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { getPublicApiQuery } from "../../../querys/admin/getPublicApiQuery";
import Button from "@mui/material/Button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import useAdminPerformanceRowsStore from "../../../stores/AdminPerformanceRowsStore";
import { reqPublicDetailUploadMutation } from "../../../querys/admin/reqPublicDetailUploadMutation";

function AdminDataGrid({ searchInput }) {
  const [searchParams, setSearchParams] = useSearchParams(); // 페이지 params 가져오는데 씀
  const pageParam = Number(searchParams.get("page")); // 페이지 param을 숫자로 형변환
  const [pages, setPages] = useState([1]); // 한 번이라도 열었던 페이지 숫자들을 저장하는 배열 state (3페이지까지 봤으면 [1, 2, 3])
  const response = getPublicApiQuery(pageParam, 20); // 공연예술통합전산망 api에 데이터 요청
  const { rows, setRows } = useAdminPerformanceRowsStore(); // data grid에 표시할 데이터들 전부 저장해두는 배열 전역 state
  const uploadMutation = reqPublicDetailUploadMutation(); // 등록 버튼 누르면 상세정보 받아서 백엔드에 전달하는 mutation
  const gridRef = useGridApiRef();
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
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
      field: "action",
      headerName: "등록",
      width: 100,
      editable: false,
      renderCell: (params) => (
        <div>
          {/* <Button onClick={(e) => handleUploadButtonOnClick(e, params)}> */}
          <Button
            onClick={(e) => {
              uploadMutation.mutateAsync(params.row.mt20id); // 버튼 누르면 공연상세정보 받아와서 백엔드에 전달함
            }}
          >
            등록
          </Button>
        </div> // 맨 오른쪽 등록 버튼
      ),
    },
  ];

  const handleRowSelectionOnChange = (e) => {
    console.log(e.ids);
  };

  // 다음 페이지
  // 다음 페이지가 불러온 적 없는 페이지면 API 요청 다시 보냄
  const handlePageUpOnClick = (e) => {
    if (pages.includes(pageParam)) {
      setSearchParams({ page: pageParam + 1 });
      return;
    }
    setSearchParams({ page: pageParam + 1 });
    setPages([...pages, pageParam]);
    response.refetch();
  };

  // 이전 페이지
  const handlePageDownOnClick = (e) => {
    // 1페이지 아래로 내려가려고 하면 강제로 1페이지로 보냄
    // 사실 1페이지 가면 이전 페이지 버튼 비활성화되게 해놨지만 안전빵으로 넣음
    if (pageParam < 1) {
      setSearchParams({ page: 1 });
      return;
    }
    setSearchParams({ page: pageParam - 1 });
  };

  // api에 요청 보낸거 응답 오면 rows에 합침

  useEffect(() => {
    if (!response.isLoading) {
      // setRows((prev) => [...prev, ...response.data]);
      setRows(response.data);
    }
  }, [response.isLoading]); // [response]로 해놓으면 무한루프 돌아감

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
          <Button
            disabled={pageParam < 2 ? true : false}
            onClick={handlePageDownOnClick}
          >
            <FaChevronLeft />
          </Button>
          <div>
            <p>{pageParam}</p>
          </div>
          <Button onClick={handlePageUpOnClick}>
            <FaChevronRight />
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default AdminDataGrid;
