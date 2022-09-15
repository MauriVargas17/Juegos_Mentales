import React from 'react'
import './topnav.scss'
import { useNavigate } from "react-router-dom"
import { data } from '../../constants'
import { useContext } from "react";
import images from '../../constants/images'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/slices/AuthSlice'

const TopNav = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.isAuthenticated)

    const openSidebar = () => {
        document.body.classList.add('sidebar-open')
    }

    const logoutRoot = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <div className='topnav'>
            <div className="title mb">
                {/* <UserInfo /> */}
                <img className="topnav__img" src={images.logo2022}></img>
            </div>
            {user &&
                <div className="sidebar-toggle" onClick={logoutRoot}>
                    <i class='bx bx-log-out'></i>
                </div>
            }
        </div>
    )
}

export default TopNav
