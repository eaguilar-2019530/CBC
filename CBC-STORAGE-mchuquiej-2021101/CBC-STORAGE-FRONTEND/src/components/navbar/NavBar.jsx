import { Link,Outlet, useLocation } from 'react-router-dom'; // Asegúrate de que react-router-dom esté instalado
import '../navbar/NavbarStyle8.css'; // Si necesitas estilos personalizados

const Navbar = () => {



    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                {/* Logo que redirige al Home */}
                <Link to="/" className="navbar-brand">
                    <img src="/logoCBC.png" width={100} height={50} />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/homePage" className="nav-link">
                                Home Page
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/categoria" className="nav-link">
                                Categoria
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/empleado" className="nav-link">
                                Empleado
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/herramienta" className="nav-link">
                                Herramienta
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/prestamo" className="nav-link">
                                Prestamo
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/ubicacion" className="nav-link">
                                Ubicación
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
