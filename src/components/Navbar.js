import React, { useContext } from 'react';
import NavbarItem from './NavbarItem';
import { ProvedorAutenticacaoContext } from "../main/ProvedorAutenticacaoContext";
import { useNavigate, NavLink } from 'react-router-dom';

function Navbar() {

    const { auth, encerrarSessao } = useContext(ProvedorAutenticacaoContext);

    const navigate = useNavigate();

    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <NavLink className="navbar-brand" onClick={() => navigate('/home')}><h3>Minhas Finanças</h3></NavLink>
                <button className="navbar-toggler" type="button"
                    data-toggle="collapse" data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavbarItem render={true}               address="/"                               label="Landing" />
                        <NavbarItem render={auth.isAutenticado} address="/home"                           label="Home" />
                        <NavbarItem render={auth.isAutenticado} address="/cadastro-usuario"               label="Usuários" />
                        <NavbarItem render={auth.isAutenticado} address="/consulta-lancamentos"           label="Lançamentos" />
                        <NavbarItem render={true}               address="/login" onClick={encerrarSessao} label={auth.isAutenticado ? 'Sair' : 'Login'} />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;