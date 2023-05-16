import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';
import { ProvedorAutenticacaoContext } from "../main/ProvedorAutenticacaoContext";

function ProtectedRoutes() {
    const { auth } = useContext(ProvedorAutenticacaoContext);
    return auth.isAutenticado ? <Outlet /> : <Navigate to={'/login'} />;
};

export default ProtectedRoutes;