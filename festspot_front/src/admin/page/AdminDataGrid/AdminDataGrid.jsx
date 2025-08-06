/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { getPublicApiQuery } from "../../../querys/admin/getPublicApiQuery";
import Button from "@mui/material/Button";
import { reqUploadPerformanceApi } from "../../../api/adminApi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function AdminDataGrid(props) {
  const page = useRef(1);
  const [pages, setPages] = useState([1]);
  const response = getPublicApiQuery(page.current, 20);
  const [rows, setRows] = useState([]);
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
          <Button onClick={(e) => handleUploadButtonOnClick(e, params)}>
            등록
          </Button>
        </div>
      ),
    },
  ];

  const handleUploadButtonOnClick = (e, params) => {
    // console.log(params.row);
    reqUploadPerformanceApi(params.row.mt20id);
  };

  // 다음 페이지
  // 다음 페이지가 불러온 적 없는 페이지면 API 요청 다시 보냄
  const handlePageUpOnClick = (e) => {
    if (pages.includes(page.current + 1)) {
      page.current++;
      return;
    }
    page.current++;
    setPages([...pages, page.current]);
    response.refetch();
  };

  // 이전 페이지
  const handlePageDownOnClick = (e) => {
    if (page.current < 1) {
      page.current = 1;
      return;
    }
    page.current--;
  };

  // pages = 한 번이라도 본 적 있는 page 번호를 모아놓는 배열 상태
  // 3페이지까지 봤으면 [1, 2, 3]
  // useEffect(() => {

  // }, [pages]);

  useEffect(() => {
    if (!!response) {
      setRows(response.data);
    }
  }, [response]);

  useEffect(() => {
    console.log(rows);
  }, [rows]);
  // const handleRowEditOnClick = (e, params) => {
  //   console.log(params.row);
  //   setPerformanceToUpdate(params.row);
  //   setIsUpdate();
  // };

  // const handleRowDeleteOnClick = (e, params) => {
  //   console.log(params.row.mt20id);
  // };

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
          rows={rows}
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
        />
        <div css={s.paginationButtonLayout}>
          <Button
            disabled={page < 2 ? true : false}
            onClick={handlePageDownOnClick}
          >
            <FaChevronLeft />
          </Button>
          <div>
            <p>{page.current}</p>
          </div>
          <Button onClick={handlePageUpOnClick}>
            <FaChevronRight />
          </Button>
          <div>{pages}</div>
        </div>
      </Box>
    </div>
  );
}

export default AdminDataGrid;
