import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import "../styles/registrar.css"

const Registrousuarios=()=>{

    const navigate = useNavigate();
    const [usuariosData, setusuariosData]=useState({usuarioid:'',nombre:'',email:'',password:''})
    const [isModalOpen,setIsModalOpen]=useState(false)

    const openPopup=()=>{
        setIsModalOpen(true)
      }
    const closePopup=()=>{
        setIsModalOpen(false)
    }

    const handleChange=(e)=>{
        const{name,value}=e.target;
        setusuariosData({
          ...usuariosData,
          [e.target.name]: e.target.value,
        })
      }
    const handleSubmit= async (e)=>{
        try{
            e.preventDefault();
            await axios.post('http://localhost:3000/usuarios',usuariosData);
            console.log("Usuario ingresado con exito", usuariosData)
            openPopup();
            setTimeout(() => {
                closePopup();
                navigate('/')
            }, 1000);
            
    
        }catch(error){
          console.log('Error al agregar al usuario',error)
        }
    }


    return(
        <section class="container">

            {isModalOpen &&
                <span className="alert-usuadd">
                    <h3> <i class="fa-solid fa-check"></i> Usuario Creado</h3>
                </span>
            }

        <form class="container-registro" onSubmit={handleSubmit}>
           
            <h2>  <i class="fa-regular fa-id-card"></i> Registro De Usuario</h2>
            <div class="datosDeAcceso">
                <input type="email" placeholder="Correo" id="correo" name="email" onChange={handleChange} value={usuariosData.email} required/>
                <input type="password" placeholder="Crear clave" id="clave" name="password" onChange={handleChange} value={usuariosData.password} required/>
            </div>
            <div class="datosPersonales">
                <select name="" id="tipoDocumento" >
                    <option value="" disabled selected>Tipo de documento</option>
                    <option value="cedulaExtrangeria">Cedula extrangeria</option>
                    <option value="tarjetaIdentidad">Tarjeta de identidad</option>
                    <option value="ppt">PPT</option>
                </select>
                <input type="number" name="usuarioid" id="numeroDocumento" placeholder="Numero de Identificacion" onChange={handleChange} value={usuariosData.usuarioid} required/>
                <input type="text" placeholder="Nombre" id="nombre" name="nombre" onChange={handleChange} value={usuariosData.nombre} required/>
                <input type="tel" name="" id="telefono" placeholder="Telefono"/>
                <label for="fechaNacimiento" id="fechaNacimiento">Fecha de Nacimiento</label>
                <input type="date" name="" id="fechaNacimiento"/>
            </div>
            <div class="container-TYC">
                <div>
                    <input type="checkbox" name="" id="TyC" /> 
                    Acepto terminos y condiciones a la politica y privacidad de datos personales del Teatro Apolo.
                </div>
                <div>
                    <input type="checkbox" name="" id="Contactar" /> 
                    Autorizo recibir informacion de promociones, eventos y lanzamientos del Teatro Apolo por email, SMS, llamadas telefonicas o whatsapp.
                </div>
                <button type="submit" class="btn btn-primary btn-submmit" >Enviar Registro</button>
                <Link to="/ingresarTeatroApolo">¿Ya estas Registrado? Ingresa aqui.</Link>
            </div>
        </form>
        </section>
    )
}

export default Registrousuarios;