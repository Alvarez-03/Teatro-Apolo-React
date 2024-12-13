import React from "react";
import axios from "axios"; // Asegúrate de tener Axios instalado

const comprasTable = ({ compras, setCompras }) => {
  // Función para manejar la eliminación
  const manejarEliminar = async (compraid) => {
    try{
      await axios.delete(`http://localhost:3000/compras/${compraid}`)
      alert('Compra eliminada')
      window.location.reload(); 
    }catch(error){
      console.log('Error al eliminar la compra',error)
      alert('La compra no fue eliminada')
    }
  };

  return (
    <section className="container py-5">
      <h2>Venta de Boletas || Teatro Apolo</h2>
      <table>
        <thead>
          <tr>
            <th>ID compra</th>
            <th>CC usuario</th>
            <th>ID funcion</th>
            <th>Sillas Reserva</th>
            <th>Eliminar</th> 
          </tr>
        </thead>
        <tbody>
          {compras.map((compra) => (
            <tr key={compra.comprasid}>
              <td>{compra.compraid}</td>
              <td>{compra.usuarioid}</td>
              <td>{compra.funcionid}</td>
              <td>{compra.asientos}</td>
              <td>
                <button className="btn btn-elm" onClick={() => manejarEliminar(compra.compraid)}>
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default comprasTable;
