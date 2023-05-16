import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../views/Login";
import CadastroUsuario from "../views/CadastroUsuario";
import LandingPage from '../views/LandingPage';
import Home from "../views/Home";
import ConsultaLancamentos from "../views/lancamentos/ConsultaLancamentos";
import CadastroLancamentos from "../views/lancamentos/CadastroLancamentos";
import ProtectedRoutes from "./ProtectedRoutes";
import Navbar from "../components/Navbar";
import NotFound from "../components/NotFound";

function Rotas() {
    return (
        <Routes>
            <Route path="/login"                         element={<Login /> }>              </Route>
            <Route path="/"                              element={<LandingPage /> }>        </Route>
            <Route path="/cadastro-usuario"              element={<CadastroUsuario /> }>    </Route>
            <Route path="/navbar"                        element={<Navbar /> }>             </Route>

            <Route element={<ProtectedRoutes />}>
                <Route path="/home"                       element={<Home /> }>               </Route>
                <Route path="/consulta-lancamentos"       element={<ConsultaLancamentos /> }></Route>
                <Route path="/cadastro-lancamentos/:id?"  element={<CadastroLancamentos /> }></Route>
            </Route>

            <Route path="*"                                element={<NotFound /> }>          </Route>
        </Routes>
    );
}

export default Rotas;