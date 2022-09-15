import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from './../../hooks/useCountdown';

const ExpiredNotice = () => {
    return (
        <div className="expired-notice">
            <span>¡Se acabó el tiempo!</span>
            <p>Comience un juego</p>
        </div>
    );
};

const FirstGame = () => {
    return (
        <div className="first-game">
            <span>¡Que comiencen los juegos!</span>
            <p>Suerte a todos</p>
        </div>
    );
};

const GamePaused = () => {
    return (
        <div className="first-game">
            <span>¡Tenemos respuesta!</span>
            <p>Procederemos a revisar</p>
        </div>
    );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
        <div className="show-counter">
            <a

                target="_blank"
                rel="noopener noreferrer"
                className="countdown-link"
            >
                {/* <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
                <p>:</p>
                <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
                <p>:</p> */}
                <DateTimeDisplay value={minutes} type={'Minutos'} isDanger={false} />
                <p>:</p>
                <DateTimeDisplay value={seconds} type={'Segundos'} isDanger={(minutes == 0) && (seconds <= 30)} />
            </a>
        </div>
    );
};

const CountdownTimer = ({ targetDate, isFirstGame, isPaused }) => {

    const [days, hours, minutes, seconds] = useCountdown(targetDate);


    if (isFirstGame) {
        return <FirstGame />;
    } else if (days + hours + minutes + seconds <= 0) {
        return <ExpiredNotice />;
    } else if (isPaused) {
        return <GamePaused />;
    } else {
        return (
            <ShowCounter
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        );
    }
};

export default CountdownTimer;
