import React, { useContext } from "react";
import 'bootswatch/dist/darkly/bootstrap.css';
import '../custom.css';
import Rotas from "./Rotas";
import Navbar from "../components/Navbar";
import 'toastr/build/toastr.css';
import 'toastr/build/toastr.min.js';
import 'primeicons/primeicons.css';
import "primereact/resources/primereact.min.css";
import { ProvedorAutenticacaoContext } from "../main/ProvedorAutenticacaoContext";

function App() {

  const { auth } = useContext(ProvedorAutenticacaoContext);
  console.log('auth: ', auth);

  return (
    <>
      <Navbar />
      <div className="App">
        <Rotas />
      </div>
    </>
  );
}

export default App;
