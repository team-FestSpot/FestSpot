/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import React, { useEffect, useState } from "react";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useSearchParams } from "react-router-dom";
import useAdminPerformanceRowsStore from "../../../../stores/AdminPerformanceRowsStore";
import useAdminPerformanceCheckBoxStore from "../../../../stores/AdminPerformanceCheckboxStore";
import { usePublicDetailUploadMutation } from "../../../../querys/admin/usePublicDetailUploadMutation";
import Pagination from "@mui/material/Pagination";
import { usePublicApiAllQuery } from "../../../../querys/admin/usePublicApiAllQuery";
import Box from "@mui/material/Box";
import { usePerformanceApiIdListQuery } from "../../../../querys/admin/usePublicApiIdListQuery";

function AdminDataGrid({ props }) {
  const [searchParams, setSearchParams] = useSearchParams(); // 페이지 params 가져오는데 씀
  const pageParam = Number(searchParams.get("page") || 1); // 페이지 param을 숫자로 형변환
  const [sortOption, setSortOption] = useState({
    column: "prfpdfrom",
    direction: "asc",
  }); // 특정 컬럼 기준 오름차순/내림차순 정렬 상태
  const [paginationList, setPaginationList] = useState([]);
  const { data, isFetched } = usePublicApiAllQuery(); // 공연예술통합전산망 api에 데이터 요청
  const performanceApiIdListQuery = usePerformanceApiIdListQuery();
  const performanceApiIdList = performanceApiIdListQuery?.data?.data?.body;
  const { rows, setRows, setRowsEmpty } = useAdminPerformanceRowsStore(); // data grid에 표시할 데이터들 전부 저장해두는 배열 전역상태
  const { checkedRows, setCheckedRows } = useAdminPerformanceCheckBoxStore(); // 다중추가하려고 체크한 row들 공연 api id 저장하는 전역상태
  const uploadMutation = usePublicDetailUploadMutation(); // 등록 버튼 누르면 상세정보 받아서 백엔드에 전달하는 mutation
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
      headerName: "공연 진행 상황",
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
          <Button
            variant="contained"
            onClick={
              (e) => {
                e.preventDefault();
                uploadMutation.mutateAsync(params.row.mt20id);
                setRowsEmpty();
              } // 버튼 누르면 공연상세정보 받아와서 백엔드에 전달함
            }
          >
            등록
          </Button>
        </div> // 맨 오른쪽 등록 버튼
      ),
    },
  ];

  // 오름차순 내림차순 정렬 기능인데 가끔 이상하게 동작함
  // 원본 rows랑 별개로 화면 표시용 displayRows 상태를 새로 만들어서 뿌려줘야 할 듯함
  const handleColumnHeaderOnClick = (e) => {
    const sortArr = [...rows];
    const column = e.field;

    console.log(e);

    if (column === "__check__") {
      return;
    }

    let direction = "asc";
    if (sortOption.column === column && sortOption.direction === "asc") {
      direction = "desc";
    }

    setSortOption((prev) => {
      let direction = "asc";
      if (prev.column === column && prev.direction === "asc") {
        direction = "desc";
      }
      return { column, direction };
    });

    sortArr.sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    // setRowsEmpty();
    setRows([
      ...sortArr.filter(
        (performance) => !performanceApiIdList?.includes(performance.mt20id)
      ),
    ]);
  };

  // useEffect(() => {
  //   console.log(checkedRows);
  // }, [checkedRows]);

  const handleRowSelectionOnChange = (e) => {
    console.log(e.ids);
    setCheckedRows(e.ids);
  };

  const handlePaginationOnChange = (e) => {
    setSearchParams({
      page: e.target.innerText,
    });
  };

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
    if (
      isFetched &&
      performanceApiIdListQuery.isFetched &&
      Array.isArray(data) &&
      data?.length > 0
    ) {
      setRows(
        data?.filter(
          (performance) =>
            !performanceApiIdList?.includes(performance?.mt20id) &&
            performance?.prfnm?.trim().includes(props.name.trim()) &&
            performance?.fcltynm?.trim().includes(props.venue.trim())
        )
      );
    }
  }, [
    isFetched,
    performanceApiIdListQuery.isFetched,
    performanceApiIdListQuery.isRefetching,
  ]);

  useEffect(() => {
    setPaginationList(getPaginationList(rows.length));
  }, [rows]);

  return (
    <div css={s.adminGridLayout}>
      <div css={s.dataGridContainer}>
        <DataGrid
          rows={rows.slice((pageParam - 1) * 20, pageParam * 20)} // 1페이지면 rows의 0~19번 인덱스, 2페이지면 20~39번 인덱스, 3페이지면 40~59번 인덱스, ...
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
          onColumnHeaderClick={handleColumnHeaderOnClick}
          sx={{
            display: "grid",
            gridTemplateRows: "auto 1f auto",
          }}
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

export default AdminDataGrid;
