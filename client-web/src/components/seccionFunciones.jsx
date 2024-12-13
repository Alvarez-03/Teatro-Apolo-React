import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "../styles/sipnosis.css";
import logo from "../../img/teatro_apolo.png";

function ContentFunciones({ peliculaid }) {
    const [funciones, setfunciones] = useState([]);
    const [usuarios, setusuarios] = useState([]);
    const [compras, setcompras] = useState([]);
    const [NombreUsuario, setNombreUsuario] = useState("");
    const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
    const [asientosReservados, setAsientosReservados] = useState([]);
    const [funcionSeleccionada, setFuncionSeleccionada] = useState(null);

    // Obtener funciones desde el servidor
    const getAllfunciones = async () => {
        try {
            const response = await axios.get("http://localhost:3000/funciones");
            setfunciones(response.data);
        } catch (error) {
            console.error("Error al obtener (funciones) de la base de datos");
        }
    };

    // Obtener compras desde el servidor
    const getAllcompras = async () => {
        try {
            const response = await axios.get("http://localhost:3000/compras");
            setcompras(response.data);
        } catch (error) {
            console.error("Error al obtener los datos (compras) del servidor");
        }
    };

    // Obtener usuarios desde el servidor
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

    // Seleccionar o deseleccionar asientos
    const toggleAsiento = (numero) => {
        if (asientosReservados.includes(numero)) return; // No permitir seleccionar asientos reservados
        setAsientosSeleccionados((prev) =>
            prev.includes(numero)
                ? prev.filter((asiento) => asiento !== numero)
                : [...prev, numero]
        );
    };

    // Manejar selección de función y mostrar asientos
    const seleccionarFuncion = (funcionId) => {
        setFuncionSeleccionada(funcionId);

        // Obtener asientos reservados para esta función
        const asientosReservadosFuncion = compras
            .filter((compra) => compra.funcionid === funcionId)
            .flatMap((compra) => compra.asientos);

        setAsientosReservados(asientosReservadosFuncion);
        setAsientosSeleccionados([]); // Reiniciar los seleccionados
    };

    // Manejar cierre de asientos
    const cerrarAsientos = () => {
        setFuncionSeleccionada(null);
        setAsientosSeleccionados([]);
        setAsientosReservados([]);
    };

    // Realizar compra
    const ComprarFuncion = async () => {
        if (!funcionSeleccionada) {
            alert("Por favor selecciona una función primero.");
            return;
        }

        const boletafuncion = funciones.find((funcion) => funcion.funcionid === funcionSeleccionada);
        const usuariocompra = usuarios.filter((usuario) => usuario.nombre === NombreUsuario);

        if (!usuariocompra || usuariocompra.length === 0) {
            alert("Debe ingresar un usuario");
            return;
        }

        const usuarioid = usuariocompra[0].usuarioid;

        const nuevacompra = {
            funcionid: funcionSeleccionada,
            usuarioid,
            asientos: asientosSeleccionados,
        };

        try {
            await axios.post("http://localhost:3000/compras", nuevacompra);
            alert(`Compra realizada ${NombreUsuario}`);

            // Generar factura en PDF
            const doc = new jsPDF();
            doc.addImage(logo, "PNG", 75, 20, 50, 50);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(14);
            doc.text(`Factura`, 90, 70);
            doc.text(`Número de Función: ${funcionSeleccionada}`, 10, 80);
            doc.text(`Cliente: ${NombreUsuario}`, 10, 90);
            doc.text(`Cliente CC: ${usuarioid}`, 10, 100);
            doc.text(`Fecha de Función: ${boletafuncion.fecha}`, 10, 110);
            doc.text(`Asientos: ${asientosSeleccionados.join(", ")}`, 10, 120);
            doc.setFontSize(10);
            doc.text(`Teatro Apolo - Más de 35 años regalando sonrisas a niños y adultos.`, 50, 140);
            doc.text(`Somos una empresa colombiana dedicada a compartir emociones.`, 50, 150);
            doc.setFontSize(14);
            doc.text(`Presente esta factura en taquilla.`, 70, 160);
            doc.text(`Preséntese 20 minutos antes en nuestro teatro.`, 55, 170);
            doc.save(`Factura_${NombreUsuario}_${boletafuncion.fecha}.pdf`);

            // Actualizar datos
            getAllcompras();
        } catch (error) {
            console.error("Error al realizar la compra", error);
            alert("Hubo un error al realizar la compra.");
        }
    };

    const funcionespel = funciones.filter((funcion) => funcion.peliculaid === peliculaid);

    return (
        <section className="container container-funciones">
            <section className="container">
                <h2>Funciones</h2>
                {funcionespel.map((funcion) => (
                    <button
                        key={funcion.funcionid}
                        className="btn-funcion"
                        onClick={() => seleccionarFuncion(funcion.funcionid)}
                    >
                        <i className="fa-solid fa-ticket"></i>
                        {funcion.fecha}
                    </button>
                ))}

                {funcionSeleccionada && (
                    <>
                        <div>
                        
                                <i class="fa-solid fa-circle-xmark btn-cerrar" onClick={cerrarAsientos}></i>
                            

                            <h3>Pantalla</h3>
                        </div>
                        
                        <div className="asientos-grid container">
                            {[...Array(30)].map((_, index) => {
                                const numero = index + 1;
                                const reservado = asientosReservados.includes(numero);
                                return (
                                    <button
                                        key={numero}
                                        className={`asiento ${reservado ? "reservado" : ""} ${
                                            asientosSeleccionados.includes(numero) ? "seleccionado" : ""
                                        }`}
                                        onClick={() => toggleAsiento(numero)}
                                        disabled={reservado}
                                    >
                                        <i className="fa-solid fa-couch"></i>
                                        {numero}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="botones-acciones">
                            <button className="btn-comprar btn" onClick={ComprarFuncion}>
                                <i className="fa-solid fa-file-invoice-dollar"></i>
                                Comprar
                            </button>
                            
                        </div>
                    </>
                )}
            </section>
        </section>
    );
}

export default ContentFunciones;
