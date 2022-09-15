import React from 'react'
import './overall-list.scss'
import { data } from '../../constants'

const icons = [
    <i className='bx bx-football'></i>,
    <i className='bx bxs-tennis-ball'></i>,
    <i className='bx bx-run'></i>,
    <i className='bx bx-music'></i>
]

const OverallList = () => {
    return (
        <ul className='overall-list'>
            {
                data.overall.map((item, index) => (
                    <li className="overall-list__item" key={`overall-${index}`}>
                        <div className="overall-list__item__icon">
                            {icons[index]}
                        </div>
                        <div className="overall-list__item__info">
                            <div className="title">
                                {item.value}
                            </div>
                            <span>{item.title}</span>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default OverallList
