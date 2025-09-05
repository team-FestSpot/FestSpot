import React, { useState } from "react";
import AdminLeftSideBar from "../../sideBar/AdminLeftSideBar/AdminLeftSideBar";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import Button from "@mui/material/Button";
import { GiHamburgerMenu } from "react-icons/gi";
function AdminLayout({ children }) {
  const [isSideBar, setIsSideBar] = useState(true);

  // return (
  //   <div css={s.adminLayout}>
  //     <div css={s.adminSideBar}>
  //       <AdminLeftSideBar />
  //     </div>
  //     <div css={s.adminChildrenContainer}>{children}</div>
  //   </div>
  // );

  const handleSideBarButtonOnClick = () => {
    setIsSideBar(true);
  };

  return (
    <div css={isSideBar ? s.adminLayout : s.adminLayoutFull}>
      {isSideBar ? (
        <div css={s.adminSideBar}>
          <AdminLeftSideBar setIsSideBar={setIsSideBar} />
        </div>
      ) : (
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
