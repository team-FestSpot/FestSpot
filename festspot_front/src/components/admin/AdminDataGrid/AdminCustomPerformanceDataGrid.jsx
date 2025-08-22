import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import Box from "@mui/material/Box";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";
import { useCustomPerformanceListQuery } from "../../../querys/admin/useCustomPerformanceListQuery";
import Button from "@mui/material/Button";
import { FaRegEdit } from "react-icons/fa";
import useAdminCustomPerformanceRowsStore from "../../../stores/AdminPerformanceCustomRowsStore";
import useAdminPerformanceUpdateStore from "../../../stores/AdminPerformanceUpdateStore";
import AdminUpdateModal from "../AdminUpdateModal/AdminUpdateModal";

function AdminCustomPerformanceDataGrid(props) {
  const { data, isLoading } = useCustomPerformanceListQuery();
  const performanceList = data?.data?.body;
  const { rows, setRows, setRowsEmpty } = useAdminCustomPerformanceRowsStore();
  const [isOpen, setIsOpen] = useState(false);
  const { performanceToUpdate, setPerformanceToUpdate } =
    useAdminPerformanceUpdateStore();
  const [searchParams, setSearchParams] = useSearchParams(); // 페이지 params 가져오는데 씀
  const pageParam = Number(searchParams.get("page")); // 페이지 param을 숫자로 형변환
  const [sortOption, setSortOption] = useState({
    column: "performanceStartDate",
    direction: "asc",
  }); // 특정 컬럼 기준 오름차순/내림차순 정렬 상태
  const [paginationList, setPaginationList] = useState([]);

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
      field: "area",
      headerName: "지역",
      width: 100,
      editable: false,
      valueGetter: (params) => params,
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
      valueGetter: (params) => params,
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
        <div>
          <Button onClick={(e) => handleModifyButtonOnClick(e, params)}>
            <FaRegEdit />
          </Button>
        </div>
      ),
    },
  ];

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleModifyButtonOnClick = (e, params) => {
    openModal();
    setPerformanceToUpdate(params.row);
  };

  useEffect(() => {
    setSearchParams({
      page: 1,
    });
  }, []);

  useEffect(() => {
    if (
      !isLoading &&
      Array.isArray(performanceList) &&
      performanceList.length > 0 &&
      rows.length < 1
    ) {
      setRows(performanceList);
    }
  }, [isLoading]);

  // 오름차순 내림차순 정렬 기능인데 가끔 이상하게 동작함
  // 원본 rows랑 별개로 화면 표시용 displayRows 상태를 새로 만들어서 뿌려줘야 할 듯함
  const handleColumnHeaderOnClick = (e) => {
    const sortArr = [...rows];
    const column = e.field;

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
    setRowsEmpty();
    setRows([...sortArr]);
  };

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

  return (
    <div css={s.adminGridLayout}>
      <div css={s.updateModalLayout}>
        <AdminUpdateModal isOpen={isOpen} closeModal={closeModal} />
      </div>
      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <DataGrid
          rows={rows.slice((pageParam - 1) * 20, pageParam * 20 - 1)} // 1페이지면 rows의 0~19번 인덱스, 2페이지면 20~39번 인덱스, 3페이지면 40~59번 인덱스, ...
          getRowId={(row) => row.performanceId}
          rowHeight={200}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          sx={{}}
          pageSizeOptions={[20]}
          checkboxSelection
          disableRowSelectionOnClick
          hideFooter
          apiRef={gridRef}
          onColumnHeaderClick={handleColumnHeaderOnClick}
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

export default AdminCustomPerformanceDataGrid;
