import React, { useState } from "react";
import axios from "axios";
import '../styles/funcionTable.css'

const FuncionesTable = ({ funciones }) => {
  const [nuevaFuncion, setNuevaFuncion] = useState({funcionid: "",peliculaid: "",fecha: "",});
  const [isModalOpen,setIsModalOpen]=useState(false) 
    
  // Maneja cambios en los campos del formulario
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevaFuncion({
      ...nuevaFuncion,
      [name]: value,
    });
  };

  const openPopup=()=>{
    setNuevaFuncion({ funcionid: '', peliculaid: '', fecha: ''});
    setIsModalOpen(true)
  }
  const closePopup=()=>{
    setIsModalOpen(false)
    setIsEditing(false);
  }

  // Maneja el envío del formulario para agregar una nueva función
  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/funciones", nuevaFuncion);
      console.log("Función agregada:", response.data);
      window.location.reload(); 
      setNuevaFuncion({ funcionid: "", peliculaid: "", fecha: "" }); // Reiniciar el formulario
    } catch (error) {
      console.error("Error al agregar la función:", error);
    }
  };

  const manejarEliminar = async (funcionid) => {
    try{
        await axios.delete(`http://localhost:3000/funciones/${funcionid}`)
        alert('funcion eliminada')
        window.location.reload(); 
      }catch(error){
        console.log('Error al eliminar la funcion',error)
        alert('La funcion no fue eliminada')
      }
  };

  return (
    <section className="container py-5">
      
        <button className="btn btn-primary m-5" onClick={openPopup}> 
            <i className="fa-solid fa-plus m-1"></i> 
            Agregar Funcion
        </button>

        {/* Formulario para agregar funciones */}
        {isModalOpen &&

            <form onSubmit={manejarSubmit} className="add-funcion container">
                <header>
                    <h3>Agregar nueva función</h3>
                    <i class="fa-solid fa-circle-xmark closeBtn" onClick={closePopup}></i>
                </header>
                    
                    <input type="number" name="funcionid" placeholder="ID funcion" value={nuevaFuncion.funcionid} onChange={manejarCambio} required/>
                    <input type="number" name="peliculaid" placeholder="ID pelicula" value={nuevaFuncion.peliculaid} onChange={manejarCambio} required/>
                <div>
                    <label>Fecha: </label>
                    <input type="datetime-local" name="fecha" value={nuevaFuncion.fecha} onChange={manejarCambio}  min="2024-12-12T09:00"  required/>
                </div>
                <footer>
                    <button className="btn btn-primary" type="submit">Agregar Función</button>
                </footer>
            </form>

            }

      <h2>Funciones</h2>
      {/* Tabla de funciones */}
      <table>
        <thead>
          <tr>
            <th>ID función</th>
            <th>ID película</th>
            <th>Fecha</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {funciones.map((funcion) => (
            <tr key={funcion.funcionid}>
              <td>{funcion.funcionid}</td>
              <td>{funcion.peliculaid}</td>
              <td>{funcion.fecha}</td>
              <td>
                {/* Botón para eliminar */}
                <button onClick={() => manejarEliminar(funcion.funcionid)} className="btn btn-elm" >
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

export default FuncionesTable;
