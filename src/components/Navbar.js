import './Navbar.css'

import { Link } from "react-router-dom";

import homeIco from '../assets/image/home-icon.png'

const Navbar = () => {
    return (
        <nav className="navbar">
            <h2><Link to={`/`}>Controle Financeiro</Link></h2>
            <ul>
                <li><Link to={`/`}><img src={homeIco} alt="Home icon"/></Link></li>
                <li><Link to={`/new`}>Novo</Link></li>
                <li><Link to={`/historic-per-month`}>Historico</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar