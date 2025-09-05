import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import Box from "@mui/material/Box";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";
import { useCustomPerformanceListQuery } from "../../../../querys/admin/useCustomPerformanceListQuery";
import Button from "@mui/material/Button";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import useAdminCustomPerformanceRowsStore from "../../../../stores/AdminPerformanceCustomRowsStore";
import { useDeletePerformanceMutation } from "../../../../querys/performance/useDeletePerformanceMutation";
import AdminPerformanceUpdateModal from "../../AdminUpdateModal/AdminPerformanceUpdateModal/AdminPerformanceUpdateModal";
import { PERFORMANCE_POSTER_IMG_PATH } from "../../../../constants/performancePosterImgPath";

function AdminCustomPerformanceDataGrid({ searchResult }) {
  const { data, isLoading, isRefetching } = useCustomPerformanceListQuery();
  const performanceList = data?.data?.body;
  const { rows, setRows } = useAdminCustomPerformanceRowsStore();
  const [isOpen, setIsOpen] = useState(false);
  const [performanceToUpdate, setPerformanceToUpdate] = useState({});
  const [searchParams, setSearchParams] = useSearchParams(); // 페이지 params 가져오는데 씀
  const pageParam = Number(searchParams.get("page")); // 페이지 param을 숫자로 형변환
  const [paginationList, setPaginationList] = useState([]);
  const deletePerformanceMutation = useDeletePerformanceMutation();

  const gridRef = useGridApiRef();
  const columns = [
    {
      field: "poster",
      headerName: "포스터",
      width: 150,
      maxWidth: 150,
      editable: false,
      renderCell: (params) => (
        <div css={s.imgContainer}>
          <img src={`${PERFORMANCE_POSTER_IMG_PATH}${params.row.poster}`} />
        </div>
      ),
    },
    {
      field: "prfnm",
      headerName: "공연/페스티벌명",
      width: 250,
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
          <Button
            variant="outline"
            sx={{ fontSize: "1.2rem" }}
            onClick={(e) => handleModifyButtonOnClick(e, params)}
          >
            <FaRegEdit />
          </Button>
        </div>
      ),
    },
    {
      field: "delete",
      headerName: "삭제",
      width: 100,
      editable: false,
      renderCell: (params) => (
        <div>
          <Button
            variant="outline"
            sx={{ fontSize: "1.2rem" }}
            onClick={async () => {
              await deletePerformanceMutation.mutateAsync(
                params.row.performanceId
              );
            }}
          >
            <FaRegTrashAlt />
          </Button>
        </div>
      ),
    },
  ];

  // 모달창 열기
  const openModal = () => {
    setIsOpen(true);
  };

  // 모달창 닫기
  const closeModal = () => {
    setIsOpen(false);
    // setPerformanceToUpdate({});
  };

  // 수정 버튼 눌렀을 때 모달창 열림
  const handleModifyButtonOnClick = (e, params) => {
    setPerformanceToUpdate(params.row);
    openModal();
  };

  // 처음 들어왔을 때 or 새로고침했을 때 주소에 ?page=1 param 붙임
  useEffect(() => {
    setSearchParams({
      page: 1,
    });
  }, []);

  // useEffect(() => {
  //   console.log(rows);
  // }, [rows]);

  // 직접 등록한 공연 목록 가져오는 query 로딩 끝나면 row에 넣어서 표에 표시되게 함
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

  // 수정 모달 열고 값 수정하면 직접 등록한 공연 목록 가져오는 query가 refetch됨
  // refetch됐을 때 modal 다시 열어줌 (modal 화면에 수정한 값 즉시 반영)
  useEffect(() => {
    const updatedRow = rows.find(
      (row) => row.performanceId === performanceToUpdate.performanceId
    );
    if (!isRefetching && !!updatedRow) {
      setPerformanceToUpdate({ ...updatedRow });
      openModal();
    }
  }, [isRefetching]);

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
      {Object.keys(performanceToUpdate).length > 0 && (
        <div css={s.updateModalLayout}>
          <AdminPerformanceUpdateModal
            isOpen={isOpen}
            closeModal={closeModal}
            performanceToUpdate={performanceToUpdate}
          />
        </div>
      )}
      <div css={s.dataGridContainer}>
        <DataGrid
          rows={
            searchResult.length > 0
              ? searchResult.slice((pageParam - 1) * 20, pageParam * 20)
              : rows.slice((pageParam - 1) * 20, pageParam * 20)
          } // 1페이지면 rows의 0~19번 인덱스, 2페이지면 20~39번 인덱스, 3페이지면 40~59번 인덱스, ...
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
          pageSizeOptions={[20]}
          disableRowSelectionOnClick
          hideFooter
          apiRef={gridRef}
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

export default AdminCustomPerformanceDataGrid;
