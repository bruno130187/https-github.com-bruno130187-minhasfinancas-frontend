import React, { useState, createContext, useEffect, useMemo } from 'react';
import AuthService from '../app/service/AuthService';
import { mensagemAlerta, mensagemSucesso } from '../components/Toastr';
import jwtDecode from 'jwt-decode';

export const ProvedorAutenticacaoContext = createContext();

function AuthProvider({ children }) {

    const authService = useMemo(() => {
        return new AuthService();
    }, []);

    const [auth, setAuth] = useState({
        usuarioAutenticado: null,
        isAutenticado: false,
        isLoading: true,
        expiration: null
    });

    const iniciarSessao = (tokenDTO) => {
        const token = tokenDTO.token;
        const claims = jwtDecode(token);
        const usuario = {
            id: claims.userid,
            nome: claims.nome,
            email: claims.sub
        }
        authService.logar(usuario, token);
        const exp = authService.getExpirationTokenPlusNow();
        setAuth({ isAutenticado: true, usuarioAutenticado: usuario, expiration: exp });
        mensagemSucesso("Login efetuado com sucesso!");
    }

    const encerrarSessao = () => {
        if (authService.obterUsuarioAutenticado() !== null && authService.obterUsuarioAutenticado() !== '') {
            authService.removerUsuarioAutenticado();
            setAuth({ isAutenticado: false, usuarioAutenticado: null, isLoading: false, expiration: null });
            mensagemAlerta("Logoff efetuado com sucesso!");
        }
    }

    const getExpiration = () => {
        const exp = authService.getExpirationTokenPlusNow();
        console.log('exp: ', exp);
        setAuth({ ...auth, expiration: exp});
    }

    useEffect(() => {
            if (auth.isLoading) {
                const isAutenticado = authService.isUsuarioAutenticado();
                if (isAutenticado) {
                    const usuario = authService.refreshSession();
                    const exp = authService.getExpirationTokenPlusNow();
                    setAuth({ isAutenticado: true, usuarioAutenticado: usuario, isLoading: false, expiration: exp });
                } else {
                    setAuth({ ...auth, isLoading: false, expiration: null });
                }
            }
    }, []);

    return (
        <ProvedorAutenticacaoContext.Provider value={{ auth, setAuth, iniciarSessao, encerrarSessao }}>
            {children}
        </ProvedorAutenticacaoContext.Provider>
    );
};

export default AuthProvider;