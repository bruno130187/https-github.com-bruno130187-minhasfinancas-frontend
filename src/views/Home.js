import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import UsuarioService from '../app/service/UsuarioService';
import { ProvedorAutenticacaoContext } from "../main/ProvedorAutenticacaoContext";

function Home() {

    const [saldo, setSaldo] = useState('');

    const service = useMemo(() => {
        return new UsuarioService();
    }, []);

    const {auth} = useContext(ProvedorAutenticacaoContext);

    const navigate = useNavigate();

    useEffect(() => {
        const usuario_logado = auth?.usuarioAutenticado?.id;

        if (usuario_logado !== null && usuario_logado !== undefined) {
            service.obterSaldoPorUsuario(usuario_logado)
                .then(response => {
                    const formataValor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
                    setSaldo(formataValor.format(response.data));
                })
                .catch(erro => {
                    console.error(erro.response);
                });
        } else {
            setSaldo("#");
        }

    }, [auth]);

    return (
        <div className="css-jumbo">
            <h1 className="display-3">Bem vindo!</h1><br />
            <h4 className="lead">Esse é seu sistema de finanças.</h4>
            <h4 className="lead">Seu saldo atual é de {saldo} .</h4>
            <hr className="my-4" />
            <h5>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</h5>
            <div className="btn-group d-flex justify-content-center" role="group">
                <button type="button"
                    className="btn btn-primary btn-lg"
                    onClick={() => navigate('/cadastro-usuario')}>
                    <i className="pi pi-users"></i>
                    &nbsp; Cadastrar Usuário
                </button>
                <button type="button"
                    className="btn btn-danger btn-lg"
                    onClick={() => navigate('/cadastro-lancamentos')}>
                    <i className="pi pi-money-bill"></i>
                    &nbsp; Cadastrar Lançamento
                </button>
            </div>
        </div>
    )
}

export default Home