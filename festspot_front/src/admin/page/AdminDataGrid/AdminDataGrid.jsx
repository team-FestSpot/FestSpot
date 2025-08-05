/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { getPublicApiQuery } from "../../../querys/admin/getPublicApiQuery";
import { RiEditBoxLine } from "react-icons/ri";
import { IoTrashOutline } from "react-icons/io5";
import useAdminPerformanceUpdateStore from "../../../stores/AdminPerformanceUpdateStore";
import useAdminPerformanceUpdateModalStore from "../../../stores/AdminPerformanceUpdateModalStore";

function AdminDataGrid(props) {
  const { setPerformanceToUpdate } = useAdminPerformanceUpdateStore();
  const { setIsUpdate } = useAdminPerformanceUpdateModalStore();
  const response = getPublicApiQuery(1, 20);
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "mt20id", headerName: "ID", width: 90 },
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
      field: "participant",
      headerName: "참여자 수",
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
      headerName: "수정/삭제",
      width: 100,
      editable: false,
      renderCell: (params) => (
        <div>
          <RiEditBoxLine onClick={(e) => handleRowEditOnClick(e, params)} />
          <IoTrashOutline onClick={(e) => handleRowDeleteOnClick(e, params)} />
        </div>
      ),
    },
  ];

  const handleRowEditOnClick = (e, params) => {
    // console.log(params.row);
    setPerformanceToUpdate(params.row);
    setIsUpdate();
  };

  const handleRowDeleteOnClick = (e, params) => {
    // console.log(params.row.mt20id);
  };

  useEffect(() => {
    setRows(response?.data);
  }, [response?.data]);

  return (
    <div css={s.adminGridLayout}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          height: "100vh",
          maxHeight: "800px",
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
        />
      </Box>
    </div>
  );
}

export default AdminDataGrid;
