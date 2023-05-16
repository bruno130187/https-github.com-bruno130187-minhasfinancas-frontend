import React, { useState, useContext, useMemo } from "react";
import { useNavigate } from 'react-router-dom'
import Card from "../components/Card";
import FormGroup from "./FormGroup";
import UsuarioService from '../app/service/UsuarioService';
import { mensagemErro } from '../components/Toastr';
import { ProvedorAutenticacaoContext } from "../main/ProvedorAutenticacaoContext";
import AuthService from '../app/service/AuthService';

function Login() {

    const { auth, iniciarSessao, encerrarSessao } = useContext(ProvedorAutenticacaoContext);

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const service = useMemo(() => {
        return new UsuarioService();
    }, []);

    const authService = useMemo(() => {
        return new AuthService();
    }, []);

    const navigate = useNavigate();

    const cadastrarUsuario = () => {
        navigate("/cadastro-usuario");
    }

    const entrar = () => {
        const isAutenticado = authService.isUsuarioAutenticado();
        if (!isAutenticado) {

            const usuario = {
                email: email,
                senha: senha,
                action: 'login'
            }

            const erros = service.validar(usuario);

            if (erros && erros.length > 0) {
                erros.forEach(erro => mensagemErro(erro));
                return false;
            }

            service.autenticar({
                email: email,
                senha: senha
            }).then(response => {
                iniciarSessao(response.data);
                navigate("/home");
            }).catch(erro => {
                console.log(erro);
                mensagemErro(erro.response.data);
            });

        } else {
            mensagemErro(`O Usuário ${auth.usuarioAutenticado.email} já está logado!`);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6" style={{ position: 'relative', margin: '0 auto' }}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                                <input type="email"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Digite o Email"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)} />
                                            </FormGroup>
                                            <FormGroup label="senha: *" htmlFor="exampleInputPassword1">
                                                <input type="password"
                                                    className="form-control"
                                                    id="exampleInputPassword1"
                                                    placeholder="Digite a Senha"
                                                    value={senha}
                                                    onChange={e => setSenha(e.target.value)} />
                                            </FormGroup>
                                            <div className="btn-group d-flex justify-content-center" role="group">
                                                <button className="btn btn-success" onClick={entrar}>
                                                    <i className="pi pi-bitcoin"></i>
                                                    &nbsp; Entrar
                                                </button>
                                                <button className="btn btn-warning" onClick={cadastrarUsuario}>
                                                    <i className="pi pi-save"></i>
                                                    &nbsp; Cadastrar
                                                </button>
                                                {auth.isAutenticado &&
                                                    <button className="btn btn-danger" onClick={encerrarSessao}>
                                                        <i className="pi pi-sign-out"></i>
                                                        &nbsp; Sair
                                                    </button>
                                                }
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;