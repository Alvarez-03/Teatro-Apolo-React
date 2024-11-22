import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/sipnosis.css';

function ContentFunciones({ peliculaid }) {
    const [funciones, setfunciones] = useState([]);
    const [usuarios, setusuarios] = useState([]);
    const [compras, setcompras] = useState([]);
    const [NombreUsuario, setNombreUsuario] = useState("");

    // Obtener funciones
    const getAllfunciones = async () => {
        try {
            const response = await axios.get("http://localhost:3000/funciones");
            setfunciones(response.data);
        } catch (error) {
            console.error("Error al obtener (funciones) de la base de datos");
        }
    };

    // Obtener compras
    const getAllcompras = async () => {
        try {
            const response = await axios.get('http://localhost:3000/compras');
            setcompras(response.data);
        } catch (error) {
            console.error("Error al obtener los datos (compras) del servidor");
        }
    };

    // Obtener usuarios
    const getAllusuarios = async () => {
        try {
            const response = await axios.get("http://localhost:3000/usuarios");
            setusuarios(response.data);
        } catch (error) {
            console.error("Error al obtener los datos (usuarios) del servidor");
        }
    };

    useEffect(() => {
        getAllfunciones();
        getAllcompras();
        getAllusuarios();

        const nombre = localStorage.getItem("usuario");
        if (nombre) {
            setNombreUsuario(nombre);
        }
    }, []);

    // Filtra las funciones de acuerdo al peliculaid
    const funcionespel = funciones.filter((funcion) => funcion.peliculaid === peliculaid);

    // Función para la compra de una función
    const ComprarFuncion = async (fecha) => {
        const boletafuncion = funciones.find((funcion) => funcion.fecha === fecha);
        const usuariocompra= usuarios.filter((usuario)=> usuario.nombre === NombreUsuario);

        if(!usuariocompra || usuariocompra.length === 0){
            alert("Debe ingresar un usuario")
            
        }

        const usuarioid=usuariocompra[0].usuarioid;
        const funcionid= boletafuncion.funcionid;
        
        //son los valores que se mandan a el post
        const nuevacompra={
            funcionid,
            usuarioid
        }


        try{
            await axios.post("http://localhost:3000/compras", nuevacompra);
            alert("Compra Realizada")
        }catch (error) {
            console.error("Error al realizar la compra", error);
            alert("Hubo un error al realizar la compra.");
        }
        

        
    
    };

    return (
        <section className="container container-funciones">
            <h2>Funciones</h2>
            <section className="container">
                {funcionespel.map((funcion) => (
                        <button key={funcion.funcionid} className="btn-funcion" onClick={() => ComprarFuncion(funcion.fecha)}>
                            <i className="fa-solid fa-ticket"></i>
                            {funcion.fecha}
                        </button>
                    ))}
            </section>
        </section>
    );
}

export default ContentFunciones;
