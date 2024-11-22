import React, { useState, useEffect } from "react";
import {Link,BrowserRouter} from 'react-router-dom'
import "../styles/header.css"

const toPage = page => () =>{
    setPage(page)
}


const Header = () => {
    const [NombreUsuario, setNombreUsuario] = useState("");
    const [isModalOpen, setIsModalOpen]=useState(false)

    useEffect(() => {
        const nombre = localStorage.getItem("usuario");
        if (nombre) {
            setNombreUsuario(nombre);
        }
    }, []);



    const CerrarSesion=()=>{
        localStorage.removeItem("usuario")
        setNombreUsuario("")

        setTimeout(() => {
            setIsModalOpen(false)
        }, 1000);
        setIsModalOpen(true)
    }
    
    return (
    <BrowserRouter>
        <header className="header-principal">
            <nav>
            <div>
                <a className="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" id="boton-menu">
                Menu
                </a>
                <div className="offcanvas offcanvas-start" id="offcanvasExample">
                <button id="menu-desplegable-button">
                    <Link to="/" onClick={toPage('/')}>Cartelera</Link>
                </button>
                <button id="menu-desplegable-button">
                    <Link to="/hoy" onClick={toPage('Hoy')}>Hoy</Link>
                </button>
                <button id="menu-desplegable-button">
                    <Link to="/proximamente" onClick={toPage('proximamente')}>Próximamente</Link>
                </button>
                </div>
            </div>
    
            <Link to="index.html">
                <img src="img/teatro_apolo.png" alt="logo cine" id="logo_cine_encabezado" />
            </Link>
    
            <form className="container col" id="form_buscador_peliculas">
                <div id="input-Buscador">
                <input
                    className="form-control"
                    type="search"
                    id="buscador"
                    placeholder="Buscar Película"
                    aria-label="Search"
                />
                </div>
                <div id="boton-buscar-container">
                <button className="btn btn-primary" id="buscar-button" type="submit" onClick={() => buscar()} >
                    Buscar
                </button>
                </div>
            </form>

            {NombreUsuario?(
                <button className="btn btn-primary" id="boton-ingresar" type="button" onClick={CerrarSesion}>
                   <i class="fa-solid fa-door-open"></i> {NombreUsuario}
                </button>
            ):(
                <Link className="btn btn-primary" id="boton-ingresar" type="button" to={"/ingresarTeatroApolo"} onClick={toPage('ingresarTeatroApolo')}>
                    <i class="fa-solid fa-right-to-bracket"></i> Ingresar
                </Link>
            )}
    
            </nav>
        </header>
        <section class="container" id="subMenu">
                <div id="boton-submenu">
                <Link to="/" onClick={toPage('/')} type="button" class="btn btn-primary" >Todas las peliculas
                </Link>
            </div>
            <div id="boton-submenu" >
                <Link type="button" class="btn btn-primary" to="/hoy" onClick={toPage('Hoy')}>Hoy</Link>
            </div>
            <div id="boton-submenu">
                <Link type="button" class="btn btn-primary" to="/Proximamente" onClick={toPage('proximamente')}>Proximamente</Link>
            </div>
        </section>

            {isModalOpen &&
                <span className="alert-sesclose">
                    <h3> <i class="fa-solid fa-door-open"></i> Sesion Cerrada</h3>
                </span>
            }

    </BrowserRouter>
    );
  };

  export default Header