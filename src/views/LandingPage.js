import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {

    const navigate = useNavigate();

    return (
        <div className="container text-center" >
            <h2>Bem vindo ao sistema Minhas Finanças</h2> < br />< br />
            <h4>Este é seu sistema para controle de finanças pessoais,
            clique no botão abaixo para acessar o sistema:</h4> < br />< br />

            <div className="offset-md-4 col-md-4">
                <button style={{ width: '100%' }}
                    onClick={() => navigate('/home')}
                    className="btn btn-success btn-lg">
                    <i className="pi pi-sign-in"></i> &nbsp; Acessar
                </button>
            </div>
        </div>
    );

}

export default LandingPage;