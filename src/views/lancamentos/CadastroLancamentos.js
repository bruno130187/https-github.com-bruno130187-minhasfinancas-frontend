import React, { useState, useEffect, useMemo } from 'react';
import Card from '../../components/Card';
import FormGroup from '../../views/FormGroup';
import SelectMenu from '../../components/SelectMenu';
import { useNavigate, useParams } from 'react-router-dom';
import { mensagemErro, mensagemSucesso } from '../../components/Toastr';
import LancamentoService from '../../app/service/LancamentoService';
import LocalStorageService from '../../app/service/LocalstorageService';
import CurrencyInput from 'react-currency-input-field';

function CadastroLancamentos(props) {

    const [state, setState] = useState({
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false,
        meses: [],
        tipos: []
    });

    const service = useMemo(() => {
        return new LancamentoService();
    }, []);

    const navigate = useNavigate();

    const routeParams = useParams();

    console.log('state', state);

    useEffect(() => {
        const dataAtual = new Date();
        setState((state) => ({ ...state, ano: dataAtual.getFullYear() }));
        setState((state) => ({ ...state, mes: dataAtual.getMonth() + 1 }));
        setState((state) => ({ ...state, meses: service.obterListaMeses() }));
        setState((state) => ({ ...state, tipos: service.obterListaTipos() }));

        const paramId = routeParams.id;

        if (paramId) {
            service
                .obterPorId(paramId)
                .then(response => {
                    setState({
                        ...state,
                        ...response.data,
                        atualizando: true,
                        meses: service.obterListaMeses(),
                        tipos: service.obterListaTipos()
                    });
                })
                .catch(erros => {
                    mensagemErro(erros.response.data);
                })
        }
    }, []);

    const submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const { descricao, valor, mes, ano, tipo } = state;

        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id };

        const erros = service.validar(lancamento);

        if (erros && erros.length > 0) {
            erros.forEach(erro => mensagemErro(erro));
            return false;
        } else {
            if (lancamento.valor.indexOf(',') !== -1) {
                lancamento.valor = lancamento.valor.replaceAll('.', '').replaceAll(',', '.');
            }
        }

        service
            .salvar(lancamento)
            .then(response => {
                navigate("/consulta-lancamentos");
                mensagemSucesso(`Lançamento ${lancamento.descricao} cadastrado com sucesso!`);
            }).catch(error => {
                mensagemErro(error.response.data);
            })
    }

    const atualizar = () => {
        const { descricao, valor, mes, ano, tipo, status, usuario, id } = state;

        const lancamento = { descricao, valor, mes, ano, tipo, status, usuario, id };

        const erros = service.validar(lancamento);

        if (erros && erros.length > 0) {
            erros.forEach(erro => mensagemErro(erro));
            return false;
        } else {
            lancamento.valor = lancamento.valor + '';
            if (lancamento.valor.indexOf(',') !== -1) {
                lancamento.valor = lancamento.valor.replaceAll('.', '').replaceAll(',', '.');
            }
        }

        service
            .atualizar(lancamento)
            .then(response => {
                navigate("/consulta-lancamentos");
                mensagemSucesso(`Lançamento ${lancamento.descricao} atualizado com sucesso!`);
            }).catch(error => {
                mensagemErro(error.response.data);
            })
    }

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setState({ ...state, [name]: value });
    }

    return (
        <Card title={state.atualizando ? 'Atualização de Lançamento' : 'Cadastro de Lançamento'}>
            <div className="row">
                <div className="col-md-12">
                    <FormGroup id="inputDescricao" label="Descrição: *" >
                        <input id="inputDescricao" type="text"
                            className="form-control"
                            name="descricao"
                            value={state.descricao}
                            onChange={handleChange} />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <FormGroup id="inputAno" label="Ano: *">
                        <input id="inputAno"
                            type="number"
                            name="ano"
                            value={state.ano}
                            onChange={handleChange}
                            className="form-control" />
                    </FormGroup>
                </div>
                <div className="col-md-6">
                    <FormGroup id="inputMes" label="Mês: *">
                        <SelectMenu id="inputMes"
                            value={state.mes}
                            onChange={handleChange}
                            lista={state.meses}
                            name="mes"
                            className="form-control" />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <FormGroup id="inputValor" label="Valor: R$*">
                        <CurrencyInput
                            id="inputValor"
                            name="valor"
                            value={state.valor}
                            decimalScale={2}
                            decimalsLimit={2}
                            decimalSeparator=","
                            groupSeparator="."
                            onValueChange={(value, name) => { setState((state) => ({ ...state, valor: value })) }}
                            className="form-control"
                        />
                    </FormGroup>
                </div>

                <div className="col-md-4">
                    <FormGroup id="inputTipo" label="Tipo: *">
                        <SelectMenu id="inputTipo"
                            name="tipo"
                            value={state.tipo}
                            onChange={handleChange}
                            lista={state.tipos}
                            className="form-control" />
                    </FormGroup>
                </div>

                <div className="col-md-4">
                    {state.atualizando &&
                        <FormGroup id="inputStatus" label="Status: ">
                            <input type="text"
                                className="form-control"
                                name="status"
                                value={state.status}
                                disabled />
                        </FormGroup>
                    }
                </div>


            </div>
            <div className="row">
                <div className="col-md-12" >
                    <div className="btn-group d-flex justify-content-center" role="group">
                        {state.atualizando ?
                            (
                                <button onClick={atualizar}
                                    className="btn btn-success">
                                    <i className="pi pi-refresh"></i> &nbsp; Atualizar
                                </button>
                            ) : (
                                <button onClick={submit}
                                    className="btn btn-success">
                                    <i className="pi pi-save"></i> &nbsp; Salvar
                                </button>
                            )
                        }
                        <button onClick={e => navigate('/consulta-lancamentos')}
                            className="btn btn-danger">
                            <i className="pi pi-times"></i> &nbsp; Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </Card>
    )

}

export default CadastroLancamentos;