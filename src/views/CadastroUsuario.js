import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Card from "../components/Card";
import FormGroup from "./FormGroup";
import UsuarioService from "../app/service/UsuarioService";
import { mensagemErro, mensagemSucesso } from '../components/Toastr';

function CadastroUsuario() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaRepeticao, setSenhaRepeticao] = useState('');

    const service = new UsuarioService();

    const navigate = useNavigate();

    const cancelar = () => {
        navigate("/login");
    }

    const salvar = () => {
        const usuario = {
            nome: nome,
            email: email,
            senha: senha,
            senhaRepeticao: senhaRepeticao,
            action: 'insert'
        }
        
        const erros = service.validar(usuario);
        if (erros && erros.length > 0) {
            erros.forEach(erro => mensagemErro(erro));
            return false;
        }

        usuario.senha = senha;

        service.salvar(usuario)
            .then(response => {
                mensagemSucesso("Usuário cadastrado com sucesso! Faça o login para acessar o sistema!");
                navigate("/login");
            }).catch(erro => {
                mensagemErro(erro.response.data);
            });
    }

    return (
        <div className="container">
            <Card title="Cadastro de usuário">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="exampleInputName1">
                                <input type="text"
                                    className="form-control"
                                    id="exampleInputName1"
                                    aria-describedby="nameHelp"
                                    placeholder="Digite o Nome"
                                    name="nome"
                                    onChange={e => setNome(e.target.value)} />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                <input type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Digite o Email"
                                    name="email"
                                    onChange={e => setEmail(e.target.value)} />
                                <small id="emailHelp"
                                    className="form-text text-muted">
                                    Não divulgamos o seu email.
                                </small>
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                <input type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Senha"
                                    name="senha"
                                    onChange={e => setSenha(e.target.value)} />
                            </FormGroup>
                            <FormGroup label="Repita a Senha: *" htmlFor="exampleInputPassword2">
                                <input type="password"
                                    className="form-control"
                                    id="exampleInputPassword2"
                                    placeholder="Senha Repetição"
                                    name="senhaRepeticao"
                                    onChange={e => setSenhaRepeticao(e.target.value)} />
                            </FormGroup>
                            <div className="btn-group d-flex justify-content-center" role="group">
                                <button className="btn btn-success" onClick={salvar}>
                                    <i className="pi pi-save"></i> &nbsp; Salvar
                                </button>
                                <button className="btn btn-danger" onClick={cancelar}>
                                    <i className="pi pi-times"></i> &nbsp; Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div >
            </Card>
        </div >
    );
}

export default CadastroUsuario;