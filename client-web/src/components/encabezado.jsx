import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../styles/header.css";

const Header = () => {
    const [NombreUsuario, setNombreUsuario] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);  // Agregar estado para verificar si el usuario es administrador
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const nombre = localStorage.getItem("usuario");
        if (nombre === 'Administrador') {
            setIsAdmin(true);  // Si es administrador, establecer el estado a true
        }
        if (nombre) {
            setNombreUsuario(nombre);
        }
    }, []);

    const CerrarSesion = () => {
        localStorage.removeItem("usuario");
        setNombreUsuario("");
        setIsAdmin(false);  // Reiniciar el estado de administrador

        navigate("/");
    };

    if (isAdmin) {  // Si el usuario es administrador, renderizar el encabezado de administrador
        return (
            <header className="header-principal">
                <nav>
                    <div>
                        <a className="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" id="boton-menu">
                            Menu
                        </a>
                        <div className="offcanvas offcanvas-start" id="offcanvasExample">
                            <button id="menu-desplegable-button">
                                <Link to="/" onClick={() => setPage('/')}>Cartelera</Link>
                            </button>
                            <button id="menu-desplegable-button">
                                <Link to="/adminTA" onClick={() => setPage('/adminTA')}>Dashboard</Link>
                            </button>
                        </div>
                    </div>
                    
                    <Link to="index.html">
                        <img src="img/teatro_apolo.png" alt="logo cine" id="logo_cine_encabezado" />
                    </Link>
                    
                    <h2 id="h2-dashboard"><b>Dashboard Teatro Apolo</b></h2>

                    {NombreUsuario ? (
                        <button className="btn btn-primary" id="boton-ingresar" type="button" onClick={CerrarSesion}>
                            <i className="fa-solid fa-door-open"></i> {NombreUsuario}
                        </button>
                    ) : (
                        <Link className="btn btn-primary" id="boton-ingresar" type="button" to={"/ingresarTeatroApolo"} onClick={() => setPage('ingresarTeatroApolo')}>
                            <i className="fa-solid fa-right-to-bracket"></i> Ingresar
                        </Link>
                    )}
                </nav>
            </header>
        );
    }

    // Si el usuario no es administrador, renderizar el encabezado normal
    return (
        <>
            <header className="header-principal">
                <nav>
                    <div>
                        <a className="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" id="boton-menu">
                            Menu
                        </a>
                        <div className="offcanvas offcanvas-start" id="offcanvasExample">
                            <button id="menu-desplegable-button">
                                <Link to="/" onClick={() => setPage('/')}>Cartelera</Link>
                            </button>
                            <button id="menu-desplegable-button">
                                <Link to="/hoy" onClick={() => setPage('Hoy')}>Hoy</Link>
                            </button>
                            <button id="menu-desplegable-button">
                                <Link to="/proximamente" onClick={() => setPage('proximamente')}>Próximamente</Link>
                            </button>
                        </div>
                    </div>
                    
                    <Link to="index.html">
                        <img src="img/teatro_apolo.png" alt="logo cine" id="logo_cine_encabezado" />
                    </Link>
                    
                    <div className="container " id="tittle-header">
                        <h1><b>Teatro Apolo</b></h1>
                    </div>

                    {NombreUsuario ? (
                        <button className="btn btn-primary" id="boton-ingresar" type="button" onClick={CerrarSesion}>
                            <i className="fa-solid fa-door-open"></i> {NombreUsuario}
                        </button>
                    ) : (
                        <Link className="btn btn-primary" id="boton-ingresar" type="button" to={"/ingresarTeatroApolo"} onClick={() => setPage('ingresarTeatroApolo')}>
                            <i className="fa-solid fa-right-to-bracket"></i> Ingresar
                        </Link>
                    )}
                </nav>
            </header>

            <section className="container" id="subMenu">
                <div id="boton-submenu">
                    <Link to="/" onClick={() => setPage('/')} type="button" className="btn btn-primary">Todas las peliculas</Link>
                </div>
                <div id="boton-submenu">
                    <Link type="button" className="btn btn-primary" to="/hoy" onClick={() => setPage('Hoy')}>Hoy</Link>
                </div>
                <div id="boton-submenu">
                    <Link type="button" className="btn btn-primary" to="/Proximamente" onClick={() => setPage('proximamente')}>Próximamente</Link>
                </div>
            </section>

            {isModalOpen && (
                <span className="alert-sesclose">
                    <h3><i className="fa-solid fa-door-open"></i> Sesión Cerrada</h3>
                </span>
            )}
        </>
    );
};

export default Header;
