import './HistoricPerMonth.css'

import { useState, useEffect } from 'react'

import ShowData from '../components/ShowData'
import blogFetch from '../axios/config'

import { useNavigate } from 'react-router-dom'

const HistoricPerMonth = () => {

    const navigate = useNavigate()

    const [finances, setFinances] = useState([])
    const [finance, setFinance] = useState([])

    const [showFilteredFinance, setShowFilteredFinance] = useState(false)

    const [filterStartDate, setFilterStartDate] = useState('')
    const [filterStarEndtDate, setFilterEndtDate] = useState('')

    const startDate = filterStartDate.split('-')
    const endDate = filterStarEndtDate.split('-')

    const [showHistoric, setShowHistoric] = useState('HistoricPerMonthHide')
    const [showNoHistoric, setShowNoHistoric] = useState('no-historic-hide')

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

    const handleSubmit = async (e) => {
        e.preventDefault()

        const getDataFiltered = async () => {
            try {
                const response = await blogFetch.get(`/api/v1/finances/${parseInt(startDate[0])}/${parseInt(startDate[1])}/${parseInt(endDate[0])}/${parseInt(endDate[1])}`)

                const data = response.data

                setFinance(data)

            } catch (error) {
                console.log(error)
            }
        }

        getDataFiltered()
        console.log(finance)

        setShowFilteredFinance(true)
        setShowHistoric('HistoricPerMonthShow')
        setShowNoHistoric('no-historic')
    }

    return (
        <div>
            <form className='Historic-per-month-form' onSubmit={(e) => handleSubmit(e)} >
                <h2>Filtrar no período entre:</h2>
                <div>
                    <span>
                        <input type="date" name="historic-date-start" id="date-start" onChange={(e) => setFilterStartDate(e.target.value)} required />
                        <input type="date" name="historic-date-end" id="date-end" onChange={(e) => setFilterEndtDate(e.target.value)} required />
                    </span>
                    <div>
                        <input type="submit" id='form-btn-his' value="Buscar" />
                    </div>
                </div>
            </form>

            {showFilteredFinance === false ? (
                <div className='full-historic'>
                    <h2>Histórico de Ganhos</h2>
                    <ShowData data={finances} type={'ganho'} />
                    <h2>Histórico de Gastos</h2>
                    <ShowData data={finances} type={'gasto'} />
                </div>
            ) : null}

            {showFilteredFinance === true && finance.length > 0 ? (
                <div className={showHistoric}>
                    <ShowData data={finance} type={''} />
                </div>
            ) : (
                <div className={showNoHistoric}>
                    <h2>Nenhum registro encontrado.</h2>
                </div>
            )}
        </div>
    )
}

export default HistoricPerMonth