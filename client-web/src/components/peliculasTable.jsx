import React, { useState, useEffect } from "react";
import axios from "axios"; 
import '../styles/peliculasTable.css'

const PeliculasTable = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [newPelicula, setNewPelicula] = useState({peliculaid: "",titulo: "",genero: "",duracion: "",sipnosis: "",trailer: "",poster: "",});
  const [isModalOpen,setIsModalOpen]=useState(false) 

  const openPopup=()=>{
    setNewPelicula({
        peliculaid: "",
        titulo: "",
        genero: "",
        duracion: "",
        sipnosis: "",
        trailer: "",
        poster: "",
      });
    setIsModalOpen(true)
  }
  const closePopup=()=>{
    setIsModalOpen(false)
    setIsEditing(false);
  }

  // Cargar las películas desde el servidor
  const cargarPeliculas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/peliculas");
      setPeliculas(response.data);
    } catch (error) {
      console.log("Error al cargar las películas", error);
    }
  };

  // Manejar el envío del formulario para agregar una nueva película
  const manejarAgregarPelicula = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/peliculas", newPelicula);
      alert("Película agregada exitosamente");
      setNewPelicula({
        peliculaid: "",
        titulo: "",
        genero: "",
        duracion: "",
        sipnosis: "",
        trailer: "",
        poster: "",
      });
      cargarPeliculas(); 

    } catch (error) {
      console.log("Error al agregar la película", error);
      alert("Error al agregar la película");
    }
  };

  // Manejar la eliminación de una película
  const manejarEliminar = async (peliculaid) => {
    try {
      await axios.delete(`http://localhost:3000/peliculas/${peliculaid}`);
      alert("Película eliminada");
      cargarPeliculas(); // Recargar la lista de películas
    } catch (error) {
      console.log("Error al eliminar la película", error);
      alert("La película no fue eliminada");
    }
  };

  useEffect(() => {
    cargarPeliculas();
  }, []);

  return (
    <>

      {/* Tabla para mostrar las películas */}
      <section className="container py-5">
        <button className="btn btn-primary m-5" id="bnt-openform" onClick={openPopup}> 
            <i className="fa-solid fa-plus m-1"></i> 
            Agregar Pelicula
        </button>

        {/* Formulario para agregar una nueva película */}
      {isModalOpen &&
      
      <form onSubmit={manejarAgregarPelicula} className="container" id="form-addPelicula">
          <header>
              <h3>Agregar Nueva Película</h3>
              <i class="fa-solid fa-circle-xmark closeBtn" onClick={closePopup}></i>
          </header>
      <input
        type="text"
        placeholder="ID Película"
        value={newPelicula.peliculaid}
        onChange={(e) => setNewPelicula({ ...newPelicula, peliculaid: e.target.value })}
      />
      <input
        type="text"
        placeholder="Título"
        value={newPelicula.titulo}
        onChange={(e) => setNewPelicula({ ...newPelicula, titulo: e.target.value })}
      />
      <input
        type="text"
        placeholder="Género"
        value={newPelicula.genero}
        onChange={(e) => setNewPelicula({ ...newPelicula, genero: e.target.value })}
      />
      <input
        type="text"
        placeholder="Duración"
        value={newPelicula.duracion}
        onChange={(e) => setNewPelicula({ ...newPelicula, duracion: e.target.value })}
      />
      <input
        type="text"
        placeholder="Sinopsis"
        value={newPelicula.sipnosis}
        onChange={(e) => setNewPelicula({ ...newPelicula, sipnosis: e.target.value })}
      />
      <input
        type="text"
        placeholder="Trailer"
        value={newPelicula.trailer}
        onChange={(e) => setNewPelicula({ ...newPelicula, trailer: e.target.value })}
      />
      <input
        type="text"
        placeholder="Poster"
        value={newPelicula.poster}
        onChange={(e) => setNewPelicula({ ...newPelicula, poster: e.target.value })}
      />
      <footer>
          <button className="btn btn-primary" type="submit"> 
              Agregar Película
          </button>
      </footer>
    </form>
    }


        <h2>Lista de Películas</h2>
        <table>
          <thead>
            <tr>
              <th>ID Película</th>
              <th>Título</th>
              <th>Género</th>
              <th>Duración</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {peliculas.map((pelicula) => (
              <tr key={pelicula.peliculaid}>
                <td>{pelicula.peliculaid}</td>
                <td>{pelicula.titulo}</td>
                <td>{pelicula.genero}</td>
                <td>{pelicula.duracion}</td>
                <td>
                  <button className="btn btn-elm" onClick={() => manejarEliminar(pelicula.peliculaid)}>
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default PeliculasTable;
