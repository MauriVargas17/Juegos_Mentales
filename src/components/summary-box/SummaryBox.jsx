import React from 'react'
import './summary-box.scss'
import Box from '../box/Box'
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar'
import { colors, images } from '../../constants'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const SummaryBox = ({ item }) => {

    const pickColor = () => {
        //console.log(item.image)
        if (item.performance > 50) {
            return colors.green
        } else if (item.performance > 30) {
            return colors.orange
        } else {
            return colors.red
        }
    }
    return (
        <Box>
            <div className='summary-box'>
                <div className="summary-box__info">
                    <div className="summary-box__info__title">
                        <div>{item.name}</div>
                        {/* <span>{item.subtitle}</span> */}
                        <span></span>
                        <div className="summary-box__info__img">
                            <img src={item.image} alt="" />
                        </div>
                    </div>

                    <div className="summary-box__info__value">
                        {item.score}
                    </div>
                </div>

                <div className="summary-box__chart">
                    <CircularProgressbarWithChildren
                        value={item.performance}
                        strokeWidth={10}
                        styles={buildStyles({
                            pathColor: pickColor(),
                            trailColor: 'transparent',
                            strokeLinecap: 'round'
                        })}
                    >
                        <div className="summary-box__chart__value">
                            {item.performance}%
                        </div>
                    </CircularProgressbarWithChildren>
                </div>
            </div>
        </Box>
    )
}

export default SummaryBox

export const SummaryBoxSpecial = ({ item }) => {
    const chartOptions = {
        responsive: true,
        scales: {
            xAxis: {
                display: false
            },
            yAxis: {
                display: false
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        elements: {
            point: {
                radius: 0
            }
        }
    }

    const chartData = {
        labels: item.chartData.labels,
        datasets: [
            {
                label: 'Revenue',
                data: item.chartData.data,
                borderColor: '#fff',
                tension: 0.5
            }
        ]
    }
    return (
        <Box purple fullheight>
            <div className="summary-box-special">
                <div className="summary-box-special__title">
                    {item.title}
                </div>
                <div className="summary-box-special__value">
                    {item.value}
                </div>
                <div className="summary-box-special__chart">
                    <Line options={chartOptions} data={chartData} width={`250px`} />
                </div>
            </div>
        </Box>
    )
}
