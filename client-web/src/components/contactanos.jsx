import React from "react";
import '../styles/contactanos.css'

function FormContactanos(){
    return(
        <div className="container">
            <h2 id="tittle-contacto">Contactanos</h2>
            <form action="" id="form-contacto">
                <input type="text" placeholder="Nombre" required/>
                <input type="text" placeholder="Apellido" required/>
                <input type="email" placeholder="Correo" required/>
                <input type="text" placeholder="Asunto" required/>
                <textarea name="" id="" placeholder="Mensaje"></textarea>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    )
}

export default FormContactanos