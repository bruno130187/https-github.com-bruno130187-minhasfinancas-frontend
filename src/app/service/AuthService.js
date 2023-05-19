import LocalStorageService from './LocalstorageService';
import ApiService from '../Apiservice'
import jwtDecode from 'jwt-decode';

export const USUARIO_LOGADO = '_usuario_logado';
export const TOKEN = '_access_token';

class AuthService {

    isUsuarioAutenticado() {
        const token = LocalStorageService.obterItem(TOKEN);
        if(!token){
            return false;
        }
        const decodedToken = jwtDecode(token);
        const expiration = decodedToken.exp;
        const isTokenInvalido = Date.now() >= (expiration * 1000);
        return !isTokenInvalido;
    }

    getExpirationTokenPlusNow() {
        var date = new Date(0);
        const token = LocalStorageService.obterItem(TOKEN);
        if(!token){
            return 0;
        }
        date.setUTCSeconds(jwtDecode(token).exp);
        return date;
    }

    removerUsuarioAutenticado() {
        LocalStorageService.removerItem(USUARIO_LOGADO);
        LocalStorageService.removerItem(TOKEN);
    }

    logar(usuario, token) {
        LocalStorageService.adicionarItem(USUARIO_LOGADO, usuario);
        LocalStorageService.adicionarItem(TOKEN, token);
        ApiService.registrarToken(token);
    }

    obterUsuarioAutenticado() {
        const token = LocalStorageService.obterItem(TOKEN);
        if(!token){
            return '';
        }
        const claims = jwtDecode(token);
        const usuario = {
            id: claims.userid,
            nome: claims.nome,
            email: claims.sub
        }
        return usuario;
    }

    refreshSession() {
        const token  = LocalStorageService.obterItem(TOKEN);
        const usuario = this.obterUsuarioAutenticado();
        this.logar(usuario, token);
        return usuario;
    }

}

export default AuthService;