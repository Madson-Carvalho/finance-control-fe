import './ShowData.css'

import calendar from '../assets/image/icons-calendario-12.png'
import editIcon from '../assets/image/editar.png'
import deleteIcon from '../assets/image/excluir.png'

import { Link } from 'react-router-dom'

const ShowData = (props) => {

    const financeType = props.type ? props.data.filter((x) => x['tipo'] === props.type) : props.data

    return (
        <div className="finance-data">
            {financeType.length === 0 ? <p>Carregando</p> : (
                financeType.map((data) => (
                    <div className="data" key={data.id}>
                        <div className="delete-edit">
                            <h2>{data['tipo'] === 'ganho' ? data['Tipo de Ganho'] : data['Tipo de Gasto']}</h2>
                            <span>
                                <Link to={`/edit?id=${data.id}`}><img src={editIcon} alt="Edit Icon" title='Editar' /></Link>
                                <Link to={`/delete?id=${data.id}`}><img src={deleteIcon} alt="Delet Icon" title='Deletar' /></Link>
                            </span>
                        </div>
                        <span className="finance-date"><img src={calendar} alt="calendar" /> {data['Dia']}/{data['Mes']}/{data['Ano']} <p>{data['tipo']}</p></span>
                        <span>R$ {data['tipo'] === 'ganho' ? data['Valor'].toFixed(2) : data['Valor']['valor'].toFixed(2)}</span>
                        {data['Obs'] ? <span>Obs: {data['Obs']}</span> : <span>Obs: N/A</span>}
                    </div>
                ))
            )}
        </div>
    )
}

export default ShowData