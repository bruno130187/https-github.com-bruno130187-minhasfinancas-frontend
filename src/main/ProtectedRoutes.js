import React, { useMemo } from 'react';
import { Navigate, Outlet } from 'react-router';
import AuthService from '../app/service/AuthService';

const ProtectedRoutes = () => {
    const authService = useMemo(() => {
        return new AuthService();
    }, []);
    const isAutenticado = authService.isUsuarioAutenticado();
    return isAutenticado ? <Outlet /> : <Navigate to={'/login'} />;
};

export default ProtectedRoutes;