import { useNavigate } from "react-router-dom";

function NotFound() {

    const navigate = useNavigate();

    return (
        <div className="d-flex align-items-center justify-content-center vh-80">
            <div class="text-center">
                <h1 class="display-1 fw-bold">404</h1>
                <h1>Oops! Page not found.</h1><br /><br />
                <h3>Here are some helpful links:</h3>
                <div className="btn-group d-flex justify-content-center" role="group">
                    <button className="btn btn-primary" onClick={() => navigate("/")}>LandingPage</button>
                    <button className="btn btn-primary" onClick={() => navigate("/cadastro-usuario")}>Cadastro Usuário</button>
                    <button className="btn btn-primary" onClick={() => navigate("/login")}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default NotFound;