import { useEffect, useState } from "react"

import './Home.css'

import blogFetch from "../axios/config"

import { Chart } from "react-google-charts";

const Home = () => {

    var months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
      ]

    const todayDate = new Date()

    const actualMonth = todayDate.getMonth()
    const actualYear = todayDate.getFullYear()

    const lastMonth = new Date(actualYear,actualMonth -1)

    const [currentMonth, setCurrentMonth] = useState('')
    const [currentGain, setCurrentGain] = useState('')
    const [currentSpent, setCurrentSpent] = useState('')

    const [finances, setFinances] = useState([])

    const [options, setOptions] = useState({
        title: 'Ganhos vs Gastos',
        colors: ['#004040', '#008080', '#1F6333'],
    })

    const [data, setData] = useState([])

    const getData = async () => {
        try {
            const response = await blogFetch.get('/api/v1/finances')

            const data = response.data

            setFinances(data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (finances) {

            let dataChart = [['Mês', 'Ganho', 'Gasto']]

            let totalGain = 0
            let totalSpent = 0

            let totalGainLastMonth = 0
            let totalSpentLastMonth = 0

            finances.forEach((x) => {
                if (actualMonth + 1 === x['Mes'] && actualYear === x['Ano']) {
                    if (x['tipo'] === 'ganho') {
                        totalGain += x['Valor']
                    } else {
                        totalSpent += x['Valor']['valor']
                    }
                }

                if (lastMonth.getMonth() + 1 === x['Mes'] && lastMonth.getFullYear() === x['Ano']) {
                    if (x['tipo'] === 'ganho') {
                        totalGainLastMonth += x['Valor']
                    } else {
                        totalSpentLastMonth += x['Valor']['valor']
                    }
                }
            })

            dataChart.push([months[lastMonth.getMonth()], totalGainLastMonth, totalSpentLastMonth])
            dataChart.push([months[actualMonth], totalGain, totalSpent])

            setData(dataChart)
            setCurrentMonth(months[actualMonth])
            setCurrentGain(totalGain)
            setCurrentSpent(totalSpent)

        }

    }, [finances])

    return (
        <div className="home">
            <h2>Bem-vindo ao controle financeiro</h2>
            <div className="values">
                <span>
                    <h3>Ganho no mês de {currentMonth}:</h3>
                    <p>R$ {currentGain}</p>
                </span>
                <span>
                    <h3>Gasto no mês de {currentMonth}:</h3>
                    <p>R$ {currentSpent}</p>
                </span>
                <span>
                    <h3>Saldo:</h3>
                    <p>R$ {currentGain - currentSpent}</p>
                </span>
            </div>
            <Chart
                width={'100%'}
                height={'70%'}
                chartType="ColumnChart"
                data={data}
                options={options}
            />
        </div>
    )
}

export default Home