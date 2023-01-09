import './DeleteFinance.css'

import { Link, useNavigate } from 'react-router-dom'

import useQuery from '../hooks/useQuery'

import blogFetch from '../axios/config'

import { useState } from 'react'

import { Alert } from '@mui/material'
 
const DeleteFinance = () => {

    const [showAlert, setShowAlert] = useState('alert')

    const [btnHide,setBtnHide] = useState('')

    const navigate = useNavigate()

    const queryString = useQuery()
    const postId = queryString.get("id")

    const handleClick = async () => {
        await blogFetch.delete(`/api/v1/finances/${postId}`)
        setBtnHide('btn-hide')
        setShowAlert('')
    }

    return (
        <div className="delete-finance">
            <h2>Deseja mesmo deletar?</h2>
            <span className={btnHide}>
                <Link><button onClick={handleClick}>Deletar</button></Link>
                <Link to={'/'}><button>Cancelar</button></Link>
            </span>
            <Alert className={showAlert} onClose={() => { navigate('/') }}>Excluído com sucesso!</Alert>
        </div>
    )
}

export default DeleteFinance