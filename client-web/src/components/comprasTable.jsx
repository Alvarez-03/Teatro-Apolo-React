import React from "react";

const comprasTable=({compras})=>{
    return(
      <section className="container py-5 ">
      <h2>Venta de Boletas || Teatro Apolo</h2>
      <table>
          <tr>
            <th>ID compra</th>
            <th>CC usuario</th>
            <th>ID funcion</th>

          </tr>
          <tbody>
              {compras.map((compras)=>(
                <tr key={compras.comprasid}>
                <td>{compras.compraid}</td>
                <td>{compras.usuarioid}</td>
                <td>{compras.funcionid}</td>
              </tr>
              ))}
          </tbody>
        </table>
      </section>
    )
}

export default comprasTable;