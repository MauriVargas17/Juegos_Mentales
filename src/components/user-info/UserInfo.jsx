import React, { useContext } from 'react'
import './user-info.scss'
import { images } from "../../constants";

const UserInfo = () => {


    return (
        <div className='user-info'>
            {/*Out of service for now*/}

            <div className="user-info__img">
                <img src={images.phoenix} alt="" />
            </div>
            <div className="user-info__name">
                <span>Usuario</span>
            </div>
        </div>
    )
}

export default UserInfo
