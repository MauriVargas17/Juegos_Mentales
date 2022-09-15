import images from "./images"
import colors from "./colors"

const data = {
    user: {
        name: 'Mauri',
        img: images.mush
    },
    summary: [
        {
            title: 'Ingeniería Comercial',
            subtitle: 'LLeva la delantera y promete',
            value: '550',
            img: images.ico,
            percent: 71
        },
        {
            title: 'Ingeniería Financiera',
            subtitle: 'Persigue su 4ta corona consecutiva',
            value: '520',
            img: images.fin,
            percent: 67
        },
        {
            title: 'Escuela CSJ',
            subtitle: 'Empezó firme y así se mantiene',
            value: '400',
            img: images.csj,
            percent: 51
        },
        {
            title: 'Escuela EIE',
            subtitle: 'Creció en los últimos juegos',
            value: '330',
            img: images.eie,
            percent: 42
        },
        {
            title: 'Escuela DTI',
            subtitle: 'Saben donde destacarse mejor',
            value: '320',
            img: images.dti,
            percent: 41
        },
        {
            title: 'Comunicación',
            subtitle: 'Una gran remontada',
            value: '320',
            img: images.com,
            percent: 41
        },

        {
            title: 'Marketing',
            subtitle: 'Van rompiendo una mala racha',
            value: '120',
            img: images.mkt,
            percent: 23
        },
        {
            title: 'MEE',
            subtitle: 'De a poco y a paso firme',
            value: '80',
            img: images.mee,
            percent: 10
        },
        {
            title: 'Diseño',
            subtitle: 'Nada que comentar',
            value: '0',
            img: images.dis,
            percent: 0
        },
        {
            title: 'Administración',
            subtitle: 'Nada que comentar',
            value: '0',
            img: images.adm,
            percent: 0
        },
    ],
    revenueSummary: {
        title: 'Revenue',
        value: '$678',
        chartData: {
            labels: ['May', 'Jun', 'July', 'Aug', 'May', 'Jun', 'July', 'Aug'],
            data: [300, 300, 280, 380, 200, 300, 280, 350]
        }
    },
    overall: [
        {
            value: 'Torneo de Fútbol',
            title: 'En proceso'
        },
        {
            value: 'Torneo de Tenis de Mesa',
            title: 'Ganador: MEE'
        },
        {
            value: 'Rally',
            title: 'Ganador: MKT'
        },
        {
            value: 'Danza Folklórica',
            title: 'Ganador: FIN'
        }
    ],
    revenueByChannel: [
        {
            title: 'Ingeniería Comercial',
            value: 83.3,
            color: colors.ico
        },
        {
            title: 'Ciencias Sociales y Jurídicas',
            value: 66.7,
            color: colors.csj
        },
        {
            title: 'Ingeniería Financiera',
            value: 66.7,
            color: colors.fin
        },
        {
            title: 'Desarrollo Tecnológico e Innovación',
            value: 66.7,
            color: colors.dti
        }
    ],
    puntajeCarreras: {
        labels: ['ICO', 'FIN', 'CSJ', 'EIE', 'DTI', 'COM', 'MKT', 'MEE', 'DIS', 'ADM'],
        data: [550, 520, 400, 330, 320, 320, 180, 80, 0, 0],
    }
}

export default data