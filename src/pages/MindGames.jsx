import React from 'react'
import { useEffect, useState } from 'react'
import API from '../api/index'
import WinnerBox from '../components/winnerBox/WinnerBox'
import useStyles from '../styles/styles';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { CircularProgress } from '@material-ui/core'
import SignIn from '../components/signIn/SignIn';
import { Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core'
import DashboardWrapper, { DashboardWrapperMain } from '../components/dashboard-wrapper/DashboardWrapper'
import SummaryBox from '../components/summary-box/SummaryBox'
import CountdownTimer from '../components/timer/CountdownTimer'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const MindGames = () => {

    const client = new W3CWebSocket('ws://192.168.0.12:8500');
    const classes = useStyles();

    const [messages, setMessages] = useState([])
    const [winner, setWinner] = useState()
    const [turnArray, setTurnArray] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [dateTimeAfter, setDateTimeAfter] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [isFirstGame, setIsFirstGame] = useState(true)
    const [isPaused, setIsPaused] = useState(false)
    const [isSignedIn, setIsSignedIn] = useState(false)

    const receiveMessages = (changedArray) => {
        if (client) {
            client.onmessage = (message) => {
                pauseClock()
                const dataFromServer = JSON.parse(message.data);

                if (!changedArray.includes(String(dataFromServer.user))) {
                    setMessages(messages =>
                        [...messages, {
                            image: require(`../assets/images/escuelas/${dataFromServer.msg}.png`),
                            name: dataFromServer.user
                        }]
                    )
                }
            };
        } else {
            console.log("No server found")
        }
    }

    const checkServer = () => {
        if (client) {
            client.onopen = () => {
                console.log('WebSocket Client Connected');
            };
        } else {
            console.log("No server found")
        }
    }

    /**
     * Async func to load page
     */

    const getEscuelas = async () => {
        const esc = await API.get('/Escuelas')
        const _esc = esc.data.escuelas
        setIsLoading(false)
    }

    /**
     * Setting winner when triggered
     */

    const showWinner = () => {
        if (playing && messages.length > 0) {
            setWinner(messages[0])
        }
    }

    /**
    * Clock Functions
    */

    const startClock = () => {
        if (minutes > 0 && messages.length >= 2) {
            const nowInMs = new Date().getTime();
            const timeInMs = minutes * 60 * 1000
            setDateTimeAfter(nowInMs + timeInMs)
            setPlaying(true)
            setIsFirstGame(false)
            setIsPaused(false)
            setMessages([])
            setTurnArray([])
        } else {
            alert("Faltan participantes y/o especificar tiempo de duración")
        }
    }

    const pauseClock = () => {
        setIsPaused(true)
    }

    const stopClock = () => {
        setPlaying(false)
        setDateTimeAfter(0)
        setMessages([])
        setWinner(null)
        setTurnArray([])
    }

    const changeMinutes = (event) => {
        setMinutes(event.target.value)
    }

    /**
     * useEffect Hooks
     */

    useEffect(() => {
        checkServer()
        setIsLoading(true)
        getEscuelas()
    }, [dateTimeAfter]);

    useEffect(() => {
        showWinner()
        turnArray.push(String(messages[messages.length - 1]?.name))
    }, [messages])

    useEffect(() => {
        receiveMessages(turnArray)
    }, [playing])

    /**
    * MindGames Render
    */


    return (

        <DashboardWrapper>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" color='#fff' />
                </div>
            ) : (
                <>
                    <DashboardWrapperMain>
                        <div className="row">
                            <div className="col-12">
                                <div className="title mb">
                                    <h1>Juegos Mentales</h1>
                                </div>
                                <div className="row">
                                    <div className="col-8 col-md-12">
                                        <div className="title mb">
                                            <div className="col-12 col-md-12 col-sm-12 mb">
                                                <CountdownTimer targetDate={dateTimeAfter ? dateTimeAfter : 0} isFirstGame={isFirstGame} isPaused={isPaused} />
                                            </div>
                                            {!playing ? <>
                                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                    <InputLabel id="demo-simple-select-autowidth-label">Minutos</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-autowidth-label"
                                                        id="demo-simple-select-autowidth"
                                                        value={minutes}
                                                        label="Minutos"
                                                        onChange={changeMinutes} >

                                                        <MenuItem value="">0</MenuItem>
                                                        <MenuItem value={2}>2</MenuItem>
                                                        <MenuItem value={5}>5</MenuItem>
                                                        <MenuItem value={10}>10</MenuItem>
                                                    </Select>
                                                    <FormHelperText>Escoge la duración del juego</FormHelperText>
                                                </FormControl>
                                                <div>
                                                    <Button variant="contained" onClick={() => { startClock() }}>Comenzar juego</Button>
                                                </div>
                                                <div className="title mb" />
                                                <div className="title mb" >
                                                    {`${messages.length} de 10 equipos listos`}
                                                </div>
                                            </> : <>
                                                <div>
                                                    <Button variant="contained" onClick={() => { stopClock() }}>Reiniciar</Button>
                                                </div>
                                            </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8 col-md-12">
                                {
                                    playing && <>
                                        {winner && <>
                                            <div className="title mb">
                                                <h1>{winner.name} tiene la palabra</h1>
                                            </div>
                                            <WinnerBox>
                                                <div className='img-winner'>
                                                    <img src={winner.image} />
                                                </div>
                                            </WinnerBox>
                                            <div className="title mb" />

                                            <div className="title mb">
                                                Orden de peticiones
                                            </div>
                                        </>
                                        }
                                    </>
                                }
                                {

                                    messages.map((item, index) => (
                                        <div className="row justify-content-center">
                                            <div key={`summary-${index}`} className="col-12 col-md-12 col-sm-12 mb">
                                                <SummaryBox item={item} />
                                            </div>
                                        </div>

                                    ))
                                }
                            </div>
                        </div>
                    </DashboardWrapperMain>
                </>
            )
            }
        </DashboardWrapper >
    )
}

export default MindGames

