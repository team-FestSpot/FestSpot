import React from 'react';
import AdminLeftSideBar from '../SideBar/AdminLeftSideBar';
import AdminMainPage from '../AdminMainPage/AdminMainPage';
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useLocation } from 'react-router-dom';
import AdminAddPerformance from '../AdminAddPerformance/AdminAddPerformance';

function AdminLayout(props) {
    const location = useLocation();

    return (
        <>
            <div css={s.layout}>
                <div css={s.sideBar}>
                    <AdminLeftSideBar />
                </div>
                <div css={s.mainContainer}>
                    {
                        location.pathname === "/admin/dashboard" 
                            ? <AdminMainPage /> 
                            : location.pathname === "/admin/detail" 
                                ? <AdminAddPerformance /> 
                                : <></>
                    }
                    
                </div>
            </div>
        </>
    );
}

export default AdminLayout;