import React from 'react'
import './main-layout.scss'
import '../components/topnav/topnav.scss'
import { Outlet } from 'react-router-dom'
import TopNav from "../components/topnav/TopNav";

const MainLayout = () => {
    return (
        <>
            <div className="main">
                <div className="main__content">
                    <TopNav />
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default MainLayout
