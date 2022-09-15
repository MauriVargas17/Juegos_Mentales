import React from 'react'
import { useEffect, useState } from 'react'
import API from '../api/index'
import { Bar } from 'react-chartjs-2'
import images from '../constants/images'
import useStyles from '../styles/styles';
import Box from '../components/box/Box'
import { CircularProgress } from '@material-ui/core'
import DashboardWrapper, { DashboardWrapperMain, DashboardWrapperRight } from '../components/dashboard-wrapper/DashboardWrapper'
import SummaryBox, { SummaryBoxSpecial } from '../components/summary-box/SummaryBox'
import { colors, data } from '../constants'
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
import OverallList from '../components/overall-list/OverallList'
import RevenueList from '../components/revenue-list/RevenueList'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const Dashboard = () => {

    const numberOfActivities = 6;

    const classes = useStyles();

    const [escuelas, setEscuelas] = useState()
    const [escuelasInfo, setEscuelasInfo] = useState()
    const [scores, setScores] = useState([])
    const [labels, setLabels] = useState()
    const [colors, setColors] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const getEscuelas = async () => {
        const esc = await API.get('/Escuelas')
        const _esc = esc.data.escuelas
        setEscuelas(_esc)

        //console.log('Probando escuelas', _esc)
        const _scoresAndMore = _esc.map(escuela => ({ score: escuela.puntos, corto: escuela.corto, color: escuela.color, name: escuela.nombre, image: require(`../assets/images/escuelas/${escuela.corto}.png`), performance: ((escuela.puntos / (120 * numberOfActivities)) * 100).toFixed(1) }))
        _scoresAndMore.sort((a, b) => b.score - a.score)
        //console.log("Complete info", _scoresAndMore)
        setEscuelasInfo(_scoresAndMore)

        const _scores = _scoresAndMore.map(escuela => escuela.score)
        //console.log("Scores", _scores)
        setScores(_scores)

        const _colors = _scoresAndMore.map(escuela => escuela.color)
        //console.log("Colors", _colors)
        setColors(_colors)

        const _labels = _scoresAndMore.map(escuela => escuela.corto)
        setLabels(_labels)
        //console.log("Labels", _labels)
        setIsLoading(false)
    }


    // const createScoresArray = () => {
    //     const _scores = escuelas?.map(escuela => ({ score: escuela.puntos, corto: escuela.corto }))
    //     _scores?.sort((a, b) => b.score - a.score)
    //     setScores(_scores)
    //     const _labels = _scores?.map(escuela => escuela.corto)
    //     setLabelEsc(_labels)
    //     console.log("Labels", _labels)
    //     console.log("Scores", _scores)
    // }


    useEffect(() => {
        setIsLoading(true)
        getEscuelas()
    }, []);



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
                                    <h1>UPB Match</h1>
                                </div>

                                <Box>
                                    <div className="title mb">
                                        Resultados generales
                                    </div>
                                    {scores && labels && <GraficaGeneral labels={labels} scores={scores} colors={colors} />}
                                </Box>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-8 col-md-12">
                                <div className="title mb">

                                </div>
                                <div className="title mb">
                                    Puntos obtenidos de total posibles
                                </div>
                                <div className="row">
                                    {
                                        // data.summary.map((item, index) => (
                                        escuelasInfo?.map((item, index) => (
                                            <div key={`summary-${index}`} className="col-6 col-md-6 col-sm-12 mb">
                                                <SummaryBox item={item} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            {/*<div className="col-4 hide-md">*/}
                            {/*    <SummaryBoxSpecial item={data.revenueSummary} />*/}
                            {/*</div>*/}
                        </div>

                    </DashboardWrapperMain>
                    <DashboardWrapperRight>
                        <div className="title mb">Últimas actividades</div>
                        <div className="mb">
                            <OverallList />
                        </div>
                        <div className="title mb">Apariciones en el podio</div>
                        <div className="mb">
                            <RevenueList />
                        </div>
                    </DashboardWrapperRight>
                </>
            )}
        </DashboardWrapper>
    )
}

export default Dashboard

const GraficaGeneral = (info) => {
    //console.log("Info a graficar", info)
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        color: {

        },
        scales: {

            xAxes: {
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            yAxes: {
                grid: {
                    display: false,
                    drawBorder: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            }
        },
        elements: {
            bar: {
                backgroundColor: colors.orange,
                borderRadius: 20,
                borderSkipped: 'bottom',
            }
        }
    }

    const chartData = {
        labels: info.labels,



        datasets: [
            {
                label: 'Puntos',
                backgroundColor: info.colors,
                // data: data.puntajeCarreras.data
                data: info.scores
            },

        ]
    }
    return (
        <>
            <div>
                <Bar options={chartOptions} data={chartData} height={`400px`} />
            </div>
        </>
    )
}