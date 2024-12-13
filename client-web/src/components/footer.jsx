import React from "react";
import { Link } from 'react-router-dom';
import "../styles/footer.css"

const footer=()=>{
    return(
        <>
            <footer class="pie-pagina">
                <div class="grupo-1">
                    <div class="box">
                        <figure>
                            <a href="index.html">
                                <img src="img/teatro_apolo.png" alt="logo cine" id="logo_cine_footer"  />
                            </a>
                        </figure>
                    </div>
                    <div class="box">
                        <h2>SOBRE NOSOTROS</h2>
                        <p>Mas de 35 años regalando sonrisas a niños y adultos</p>
                        <p>Somos una empresa colombiana dedicada a compartir emociones</p>
                    </div>
                    <div class="box">
                        <h2>SIGUENOS</h2>
                        <div class="red-social">
                            <a href="#" class="fa fa-facebook"></a>
                            <a href="#"class="fa fa-instagram"></a>
                            <a href="#" class="fa fa-x"></a>
                            <a href="#" class="fa fa-youtube"></a>
                        </div>
                        <div class="formulario-contacto">
                            <button type="button" >
                                <Link href="formulario_contacto.html" to={"/ContactanosTeatroApolo"}>CONTACTANOS</Link>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="grupo-2">
                    <small>&copy;2024 <b>Teatro Apolo</b> - Todos los derechos reservados</small>
                </div>
            </footer>

        </>
    )
}

export default footer;