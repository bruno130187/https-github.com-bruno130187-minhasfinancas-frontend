import ApiService from '../Apiservice';

class LancamentoService extends ApiService {

    constructor() {
        super('/api/lancamentos');
    }

    obterListaMeses() {
        return  [
            {label: 'Selecione...', value: ''},
            {label: 'Janeiro', value: 1},
            {label: 'Fevereiro', value: 2},
            {label: 'Março', value: 3},
            {label: 'Abril', value: 4},
            {label: 'Maio', value: 5},
            {label: 'Junho', value: 6},
            {label: 'Julho', value: 7},
            {label: 'Agosto', value: 8},
            {label: 'Setembro', value: 9},
            {label: 'Outubro', value: 10},
            {label: 'Novembro', value: 11},
            {label: 'Dezembro', value: 12}
        ]
    }

    obterListaTipos() {
        return  [
            {label: 'Selecione...', value: ''},
            {label: 'Despesa', value : 'DESPESA'},
            {label: 'Receita', value : 'RECEITA'}
        ]
    }

    obterListaStatus() {
        return  [
            {label: 'Selecione...', value: ''},
            {label: 'Cancelado', value : 'CANCELADO'},
            {label: 'Efetivado', value : 'EFETIVADO'},
            {label: 'Pendente', value : 'PENDENTE'}
        ]
    }

    obterPorId(id) {
        return this.get(`/${id}`);
    }

    alterarStatus(id, status) {
        return this.put(`/${id}/atualiza-status`, {status});
    }

    validar(lancamento) {
        const erros = [];

        if(!lancamento.ano){
            erros.push("Informe o Ano corretamente!");
        }

        if(!lancamento.mes){
            erros.push("Informe o Mês corretamente!");
        }

        if(!lancamento.descricao){
            erros.push("Informe a Descrição corretamente!");
        }

        if(!lancamento.valor || parseInt(lancamento.valor) < 0){
            erros.push("Informe o Valor corretamente!");
        }

        if(!lancamento.tipo){
            erros.push("Informe o Tipo corretamente!");
        }

        return erros;
    }

    salvar(lancamento) {
        return this.post('/', lancamento);
    }

    atualizar(lancamento) {
        return this.put(`/${lancamento.id}`, lancamento);
    }

    consultar(lancamentoFiltro) {
        //console.log("LancamentoService:", lancamentoFiltro);
        let params = `?ano=${lancamentoFiltro.ano}`;

        if(lancamentoFiltro.mes) {
            params = `${params}&mes=${lancamentoFiltro.mes}`;
        }

        if(lancamentoFiltro.tipo) {
            params = `${params}&tipo=${lancamentoFiltro.tipo}`;
        }

        if(lancamentoFiltro.status) {
            params = `${params}&status=${lancamentoFiltro.status}`;
        }

        if(lancamentoFiltro.usuario) {
            params = `${params}&usuario=${lancamentoFiltro.usuario.id}`;
        }

        if(lancamentoFiltro.descricao) {
            params = `${params}&descricao=${lancamentoFiltro.descricao}`;
        }

        return this.get(params);
    }

    deletar(id){
        return this.delete(`/${id}`);
    }
}

export default LancamentoService;