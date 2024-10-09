import { useState } from "react";
import { useLogin } from "../shared/hooks/useLogin";
import { RingLoader } from 'react-spinners';
import { Navigate, Outlet } from 'react-router-dom';
import toast from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/LoginStyle2.css';

const img = 'https://ideogram.ai/assets/image/lossless/response/K21yinLZTfCgO8s0aX3X7w';

export const Login = () => {
    const { login, isLoading } = useLogin();
    const [formData, setFormData] = useState({
        usuario: '',
        contrasena: ''
    });
    const [redirectToHome, setRedirectToHome] = useState(false);

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(formData.usuario, formData.contrasena);

        if (success) {
            setRedirectToHome(true);
        }
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <RingLoader />
            </div>
        );
    }

    if (redirectToHome) {
        return <Navigate to="/homePage" />;
    }

    return (
        <div className="login">
            <div className="funcionaDiv">
                <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
                    <div className="text-center mb-4">
                        <img src={img} alt="Logo de login" className="img-fluid imgP" style={{ maxHeight: "150px" }} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Usuario</label>
                            <input
                                value={formData.usuario}
                                onChange={handleChange}
                                name="usuario"
                                type="text"
                                className="form-control"
                                placeholder="Ingresa tu usuario"
                            />
                            <small className="form-text text-muted text-center">
                                Nunca compartiremos tu usuario y contraseña con otra persona.
                            </small>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contraseña</label>
                            <input
                                value={formData.contrasena}
                                onChange={handleChange}
                                name="contrasena"
                                type="password"
                                className="form-control"
                                placeholder="Ingresa tu contraseña"
                            />
                        </div>

                        <div className="form-check mb-3">
                            <input type="checkbox" className="form-check-input" id="recordarme" />
                            <label className="form-check-label" htmlFor="recordarme">
                                Recuerdame la contraseña
                            </label>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="botonLogin">Iniciar Sesión</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

	