import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import FormGroup from '../../views/FormGroup';
import SelectMenu from '../../components/SelectMenu';
import LancamentosTable from './LancamentosTable';
import LancamentoService from '../../app/service/LancamentoService';
import LocalStorageService from '../../app/service/LocalstorageService';
import { mensagemAlerta, mensagemErro, mensagemSucesso } from '../../components/Toastr';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';

function ConsultaLancamentos() {

    const [state, setState] = useState({
        ano: 0,
        mes: '',
        tipo: '',
        status: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        lancamentos: [],
        meses: [],
        tipos: [],
        statusLista: []
    });

    const service = useMemo(() => {
        return new LancamentoService();
    }, []);

    const navigate = useNavigate();

    useEffect(() => {
        const dataAtual = new Date();
        setState((state) => ({ ...state, ano: dataAtual.getFullYear() }));
        setState((state) => ({ ...state, mes: dataAtual.getMonth() + 1 }));
        setState((state) => ({ ...state, meses: service.obterListaMeses() }));
        setState((state) => ({ ...state, tipos: service.obterListaTipos() }));
        setState((state) => ({ ...state, statusLista: service.obterListaStatus() }));
    }, [service]);

    const buscar = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        if (usuarioLogado === null || usuarioLogado === '') {
            mensagemErro('Você precisa estar logado para efetuar uma busca!');
            return false;
        }

        if (!state.ano) {
            mensagemErro('Preencha o campo Ano corretamente!');
            return false;
        }

        const lancamentoFiltro = {
            ano: state.ano,
            mes: state.mes,
            tipo: state.tipo,
            status: state.status,
            descricao: state.descricao,
            usuario: usuarioLogado
        }

        service
            .consultar(lancamentoFiltro)
            .then(resposta => {
                const lista = resposta.data;
                if (lista.length < 1 || resposta.data === "Nada encontrado para a consulta!") {
                    mensagemAlerta("Nenhum resultado encontrado.");
                    return false;
                }
                setState({ ...state, lancamentos: lista });
            }).catch(error => {
                mensagemErro("Error: " + error.response.data.error + " Message: " + error.response.data.message);
            });
    }

    const editar = (id) => {
        navigate(`/cadastro-lancamentos/${id}`);
    }

    const abrirConfirmacao = (lancamento) => {
        setState({ ...state, showConfirmDialog: true, lancamentoDeletar: lancamento });
    }

    const cancelarDelecao = () => {
        setState({ ...state, showConfirmDialog: false, lancamentoDeletar: {} });
    }

    const deletar = () => {
        service
            .deletar(state.lancamentoDeletar.id)
            .then(response => {
                const lancamentos = state.lancamentos;
                const index = lancamentos.indexOf(state.lancamentoDeletar);
                lancamentos.splice(index, 1);
                setState({ ...state, lancamentos: lancamentos, showConfirmDialog: false });
                mensagemSucesso(`Lançamento ${state.lancamentoDeletar.descricao} deletado com sucesso!`);
            }).catch(error => {
                mensagemErro('Ocorreu um erro ao tentar deletar o Lançamento');
            });
    }

    const preparaFormularioCadastro = () => {
        navigate('/cadastro-lancamentos/');
    }

    const alterarStatus = (lancamento, status) => {
        service
            .alterarStatus(lancamento.id, status)
            .then(response => {
                const lancamentos = state.lancamentos;
                const index = lancamentos.indexOf(lancamento);
                if (index !== -1) {
                    lancamento['status'] = status;
                    lancamentos[index] = lancamento;
                    setState({ ...state, lancamento });
                }
                mensagemSucesso(`Status de ${lancamento.descricao} atualizado com sucesso!`);
            });
    }

    const confirmDialogFooter = (
        <div>
            <Button label="Confirmar" icon="pi pi-check" onClick={deletar} />
            <Button label="Cancelar" icon="pi pi-times" onClick={cancelarDelecao} className="p-button-secondary" />
        </div>
    );

    const formataValor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    return (
        <Card title="Consulta Lançamentos">
            <div className="row">
                <div className="col-md-6" style={{ position: 'relative', margin: '0 auto' }}>
                    <div className="bs-component">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input type="number"
                                maxLength="4"
                                className="form-control"
                                id="inputAno"
                                value={state.ano}
                                onChange={e => setState({ ...state, ano: e.target.value })}
                                placeholder="Digite o Ano" />
                        </FormGroup>
                        <FormGroup htmlFor="inputMes" label="Mês: ">
                            <SelectMenu id="inputMes"
                                value={state.mes}
                                onChange={e => setState({ ...state, mes: e.target.value })}
                                className="form-control"
                                lista={state.meses} />
                        </FormGroup>
                        <FormGroup htmlFor="inputDesc" label="Descrição: ">
                            <input type="text"
                                className="form-control"
                                id="inputDesc"
                                value={state.descricao}
                                onChange={e => setState({ ...state, descricao: e.target.value })}
                                placeholder="Digite a descrição" />
                        </FormGroup>
                        <FormGroup htmlFor="inputTipo" label="Tipo Lançamento: ">
                            <SelectMenu id="inputTipo"
                                value={state.tipo}
                                onChange={e => setState({ ...state, tipo: e.target.value })}
                                className="form-control"
                                lista={state.tipos} />
                        </FormGroup>
                        <FormGroup htmlFor="inputStatus" label="Status Lançamento: ">
                            <SelectMenu id="inputStatus"
                                value={state.status}
                                onChange={e => setState({ ...state, status: e.target.value })}
                                className="form-control"
                                lista={state.statusLista} />
                        </FormGroup>
                        <div className="btn-group d-flex justify-content-center" role="group">
                            <button onClick={buscar}
                                type="button"
                                className="btn btn-warning">
                                <i className="pi pi-search"></i> &nbsp; Buscar
                            </button>
                            <button onClick={preparaFormularioCadastro}
                                type="button"
                                className="btn btn-success">
                                <i className="pi pi-plus"></i> &nbsp; Cadastrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-md-12">
                    <div className="bs-component">
                        <LancamentosTable lancamentos={state.lancamentos}
                            deleteAction={abrirConfirmacao}
                            editAction={editar}
                            alterarStatus={alterarStatus} />
                    </div>
                </div>
            </div>
            <div className="card flex justify-content-center">
                <Dialog
                    header="Confirmação"
                    visible={state.showConfirmDialog}
                    onHide={() => setState({ ...state, showConfirmDialog: false })}
                    style={{ width: '50vw', zIndex: 1 }}
                    footer={confirmDialogFooter}
                    modal={true}
                >
                    Confirma a exclusão deste Lançamento?<br />
                    Descrição: {state.lancamentoDeletar.descricao}<br />
                    Valor: {formataValor.format(state.lancamentoDeletar.valor)}<br />
                    Tipo: {state.lancamentoDeletar.tipo}<br />
                    Mês: {state.lancamentoDeletar.mes}<br />
                    Situação: {state.lancamentoDeletar.status}<br />
                </Dialog>
            </div>
        </Card>

    )
}

export default ConsultaLancamentos;