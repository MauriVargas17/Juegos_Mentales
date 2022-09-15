import React from 'react'
import './winnerBox.scss'

const WinnerBox = props => {
    const className = {
        box: 'winner-box',
        purple: props.purple && 'winner-box-purple',
        fullheight: props.fullheight && 'winner-box-fullheight'
    }

    return (
        <div className={Object.values(className).join(' ')}>
            {props.children}
        </div>
    )
}

export default WinnerBox
