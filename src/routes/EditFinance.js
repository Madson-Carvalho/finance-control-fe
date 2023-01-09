import './NewFinance.css'

import { useState, useEffect } from 'react'
import { Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import blogFetch from '../axios/config'
import useQuery from '../hooks/useQuery'

const EditFinance = () => {

    const navigate = useNavigate()

    const queryString = useQuery()
    const postId = queryString.get("id")
    const [finances, setFinances] = useState('')

    const [showAlert, setShowAlert] = useState('alert')
    const [hideForm, setHideForm] = useState('new-post-form')

    // const [financeId, setFinanceId] = useState('')

    const [spentDate, setSpentDate] = useState('')
    const [spentValue, setSpentValue] = useState('')
    const [typeSpent, setTypeSpent] = useState('')
    const [spentObs, setSpentObs] = useState('')
    const [spentRecorrency, setSpentRecorrency] = useState('')

    const [gainDate, setGainDate] = useState('')
    const [gainValue, setGainValue] = useState('')
    const [typeGain, setTypeGain] = useState('')
    const [gainObs, setGainObs] = useState('')

    useEffect(() => {

        const getData = async () => {
            try {
                const response = await blogFetch.get(`/api/v1/finances/${postId}`)

                const data = response.data

                setFinances(data)

            } catch (error) {
                console.log(error)
            }
        }

        getData()

    }, [postId])

    useEffect(() => {
console.log(finances)
        if (finances) {
            if (finances[0]['tipo'] === 'gasto') {

                setSpentDate(`${finances[0]['Ano']}-${finances[0]['Mes'] < 10 ? `0${finances[0]['Mes']}` : finances[0]['Mes']}-${finances[0]['Dia'] < 10 ? `0${finances[0]['Dia']}` : finances[0]['Dia']}`)
                setSpentValue(`${finances[0]['Valor']['valor']}`)
                setTypeSpent(`${finances[0]['Tipo de Gasto']}`)
                setSpentObs(`${finances[0]['Obs']}`)
                setSpentRecorrency(`${finances[0]['Valor']['parcela']}`)
            }

            if (finances[0]['tipo'] === 'ganho') {

                setGainDate(`${finances[0]['Ano']}-${finances[0]['Mes'] < 10 ? `0${finances[0]['Mes']}` : finances[0]['Mes']}-${finances[0]['Dia'] < 10 ? `0${finances[0]['Dia']}` : finances[0]['Dia']}`)
                setGainValue(`${finances[0]['Valor']}`)
                setTypeGain(`${finances[0]['Tipo de Ganho']}`)
                setGainObs(`${finances[0]['Obs']}`)
            }
        }

    },[finances])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (finances[0]['tipo'] === 'ganho') {

            const separetedDate = gainDate.split('-')

            const gain = {
                "id": parseInt(postId),
                "tipo": finances[0]['tipo'],
                "Ano": parseInt(separetedDate[0]),
                "Dia": parseInt(separetedDate[2]),
                "Mes": parseInt(separetedDate[1]),
                "Valor": parseFloat(gainValue),
                "Tipo de Ganho": typeGain,
                "Obs": gainObs ? gainObs : ''
            }

            await blogFetch.put(`/api/v1/finances/${postId}`, gain)

        }

        if (finances[0]['tipo'] === 'gasto') {

            const separetedDate = spentDate.split('-')

            const spent = {
                "id": parseInt(postId),
                "tipo": finances[0]['tipo'],
                "Ano": parseInt(separetedDate[0]),
                "Dia": parseInt(separetedDate[2]),
                "Mes": parseInt(separetedDate[1]),
                "Valor": {
                    "valor": parseFloat(spentValue),
                    "parcela": parseInt(spentRecorrency) ? parseInt(spentRecorrency) : ''
                },
                "Tipo de Gasto": typeSpent,
                "Obs": spentObs ? spentObs : ''
            }

            await blogFetch.put(`/api/v1/finances/${postId}`, spent)

        }

        setShowAlert('')
        setHideForm('new-post-form-hide')

    }

    return (
        <div className="new-finance">
            <h1>Edite um novo ganho ou gasto</h1>
            <form onSubmit={(e) => handleSubmit(e)} className={hideForm}>

                {!finances ? null : finances[0]['tipo'] === 'gasto' ? (
                    <span className='tt'>
                        <div>
                            <label htmlFor="date">Data</label>
                            <input type="date" name="date" id="date" value={spentDate} required onChange={(e) => setSpentDate(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="value">Valor</label>
                            <input type="number" min={1} name="value" id="value" value={spentValue} autoComplete='off' placeholder='Valor do gasto ou valor da parcela no caso de recorrência' required onChange={(e) => setSpentValue(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="type-finance">Recorrência em meses</label>
                            <input type="number" min={1} name="type-spent" id="type-finance" value={spentRecorrency} autoComplete='off' onChange={(e) => setSpentRecorrency(e.target.value)} disabled />
                        </div>

                        <div>
                            <label htmlFor="type-finance">Tipo de gasto</label>
                            <input type="text" name="type-spent" id="type-finance" value={typeSpent} autoComplete='off' required placeholder='Digite a natureza do gasto' onChange={(e) => setTypeSpent(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="obs">Observações</label>
                            <textarea name="obs" id="obs" value={spentObs} autoComplete='off' onChange={(e) => setSpentObs(e.target.value)} ></textarea>
                        </div>
                    </span>

                ) : (
                    <span className='tt'>
                        <div>
                            <label htmlFor="date">Data</label>
                            <input type="date" name="date" id="date" value={gainDate} required onChange={(e) => setGainDate(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="value">Valor</label>
                            <input type="number" min={1} name="value" id="value" value={gainValue} autoComplete='off' required onChange={(e) => setGainValue(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="type-finance">Tipo de ganho</label>
                            <input type="text" name="type-gain" id="type-finance" value={typeGain} autoComplete='off' required placeholder='Digite a natureza do ganho' onChange={(e) => setTypeGain(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="obs">Observações</label>
                            <textarea name="obs" id="obs" value={gainObs} autoComplete='off' onChange={(e) => setGainObs(e.target.value)} ></textarea>
                        </div>
                    </span>
                )}
                {!finances ? null : <input type="submit" value="Editar" id='form-btn' />}
            </form>
            <Alert className={showAlert} onClose={() => { navigate('/') }}>Cadastro editado com sucesso!</Alert>
        </div>
    )
}

export default EditFinance