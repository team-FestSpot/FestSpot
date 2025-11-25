import React, { useEffect, useState } from "react";
import AdminLeftSideBar from "../../sideBar/AdminLeftSideBar/AdminLeftSideBar";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import Button from "@mui/material/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from "react-router-dom";
function AdminLayout({ children }) {
  const [isSideBar, setIsSideBar] = useState(true);
  const page = useLocation().pathname.substring(7);

  const handleSideBarButtonOnClick = () => {
    setIsSideBar(true);
  };

  useEffect(() => {
    if(page === "login") {
      setIsSideBar(false);
    }
    else {
      setIsSideBar(true);
    }
  }, [page])

  return (
    <div css={isSideBar ? s.adminLayout : s.adminLayoutFull}>
      {page === "login" 
      ? <div></div> 
      : isSideBar 
      ? ( 
        <div css={s.adminSideBar}>
          <AdminLeftSideBar setIsSideBar={setIsSideBar} />
        </div>
      ) 
      : (
        <div>
          <Button
            variant="outline"
            sx={{ fontSize: "1.5rem" }}
            onClick={handleSideBarButtonOnClick}
          >
            <GiHamburgerMenu />
          </Button>
        </div>
      )}

      <div
        css={
          isSideBar ? s.adminChildrenContainer : s.adminChildrenContainerFull
        }
      >
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
