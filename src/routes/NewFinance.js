import './NewFinance.css'

import { useState } from 'react'
import { Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import blogFetch from '../axios/config'

const NewFinance = () => {

    const navigate = useNavigate()

    const [showAlert, setShowAlert] = useState('alert')
    const [hideForm, setHideForm] = useState('new-post-form')

    const [selectValue, setSelectValue] = useState('')

    const [spentDate, setSpentDate] = useState('')
    const [spentValue, setSpentValue] = useState('')
    const [typeSpent, setTypeSpent] = useState('')
    const [spentRecorrency, setSpentRecorrency] = useState('')
    const [spentObs, setSpentObs] = useState('')

    const [gainDate, setGainDate] = useState('')
    const [gainValue, setGainValue] = useState('')
    const [typeGain, setTypeGain] = useState('')
    const [gainObs, setGainObs] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (selectValue === 'ganho') {

            const separetedDate = gainDate.split('-')

            const gain = {
                "id": "",
                "tipo": selectValue,
                "Ano": parseInt(separetedDate[0]),
                "Dia": parseInt(separetedDate[2]),
                "Mes": parseInt(separetedDate[1]),
                "Valor": parseFloat(gainValue),
                "Tipo de Ganho": typeGain,
                "Obs": gainObs
            }

            await blogFetch.post('/api/v1/finances', gain)

            setGainDate('')
            setGainValue('')
            setTypeGain('')
            setGainObs('')
        }

        if (selectValue === 'gasto') {

            const separetedDate = spentDate.split('-')

            if (!spentRecorrency || spentRecorrency === '0') {
                const spent = {
                    "id": '',
                    "tipo": selectValue,
                    "Ano": parseInt(separetedDate[0]),
                    "Dia": parseInt(separetedDate[2]),
                    "Mes": parseInt(separetedDate[1]),
                    "Valor": {
                        "valor": parseFloat(spentValue),
                        "parcela": ''
                    },
                    "Tipo de Gasto": typeSpent,
                    "Obs": spentObs
                }

                await blogFetch.post('/api/v1/finances', spent)

                setSpentDate('')
                setSpentValue('')
                setTypeSpent('')
                setSpentObs('')
            }
            //Fazer a parte da recorrência, usar um for e depois setar no use state o novo valor pra chamar o endpoint de novo
            if (spentRecorrency) {
                for (let index = 0; index < spentRecorrency; index++) {
                    const spent = {
                        "id": '',
                        "tipo": selectValue,
                        "Ano": parseInt(separetedDate[0]),
                        "Dia": parseInt(separetedDate[2]),
                        "Mes": parseInt(separetedDate[1]),
                        "Valor": {
                            "valor": parseFloat(spentValue),
                            "parcela": parseInt(index) + 1
                        },
                        "Tipo de Gasto": typeSpent,
                        "Obs": spentObs
                    }

                    await blogFetch.post('/api/v1/finances', spent)

                    //fazer o if validando se o mes mais 1 é > 12 e o ano
                    if (parseInt(separetedDate[1]) + 1 > 12) {
                        separetedDate[1] = 1
                        separetedDate[0] = parseInt(separetedDate[0]) + 1
                    } else {
                        separetedDate[1] = parseInt(separetedDate[1]) + 1
                    }
                }

                setSpentDate('')
                setSpentValue('')
                setTypeSpent('')
                setSpentObs('')
                setSpentRecorrency('')
            }
        }

        setShowAlert('')
        setHideForm('new-post-form-hide')
        
    }

    return (
        <div className="new-finance">
            <h1>Adicione um novo ganho ou gasto</h1>
            <form onSubmit={(e) => handleSubmit(e)} className={hideForm}>

                <div>
                    <label htmlFor="type">Tipo de cadastro</label>
                    <select name="type" id="type" onChange={(e) => setSelectValue(e.target.value)} required >
                        <option value="selecione">Selecione</option>
                        <option value="ganho">Ganho</option>
                        <option value="gasto">Gasto</option>
                    </select>
                </div>

                {selectValue === 'selecione' || selectValue === '' ? null : selectValue === 'gasto' ? (
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
                            <label htmlFor="type-finance">Tipo de gasto</label>
                            <input type="text" name="type-spent" id="type-finance" value={typeSpent} autoComplete='off' required placeholder='Digite a natureza do gasto' onChange={(e) => setTypeSpent(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="type-finance">Recorrência em meses</label>
                            <input type="number" min={1} name="type-spent" id="type-finance" value={spentRecorrency} autoComplete='off' placeholder='Digite o total de parcelas caso haja' onChange={(e) => setSpentRecorrency(e.target.value)} />
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
                {selectValue === 'selecione' || selectValue === '' ? null : <input type="submit" value="Adicionar" id='form-btn' />}
            </form>
            <Alert className={showAlert} onClose={() => {navigate('/')}}>Cadastro concluído com sucesso!</Alert>
        </div>
    )
}

export default NewFinance