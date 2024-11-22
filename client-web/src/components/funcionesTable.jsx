import React from "react";

const FuncionesTable=({funciones})=>{
    return(
        <section className="container py-5">
            <h2>Funciones</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID funcion</th>
                        <th>ID pelicula</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {funciones.map((funciones)=>(
                        <tr key={funciones.funcionid}>
                        <td>{funciones.funcionid}</td>
                        <td>{funciones.peliculaid}</td>
                        <td>{funciones.fecha}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
      </section>
    )
}

export default FuncionesTable;