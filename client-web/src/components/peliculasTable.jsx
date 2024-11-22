import React from "react";
import '../styles/cardpelis.css';
import { Link } from 'react-router-dom';



const peliculasTable=({peliculas})=>{

    return(
      
    <section class='container my-5 py-5' id='seccion-card'>
      {peliculas.map((pelicula)=>(
        
        <div key={pelicula.id}  id="card-pelicula">
          <div>
            <img src={pelicula.poster} alt="img" id="img-poster" />
          </div>
          <div id="titulo-pelicula">
            <h4>{pelicula.titulo}</h4>
          </div>
          <div class="row" id="clasificaciones-pelicula">
            <h6 id="clasificacion">{pelicula.genero}</h6>
          </div>
          <div class="row content-buttons" >
            <a href={pelicula.trailer} type="button" class="btn btn-primary" id="link-trailer">
              <i class="fa-brands fa-youtube" id="icon-youtube"></i> Ver Trailer
            </a>
            <Link type="button" class="btn btn-primary" id="Comprar" to={`/sipnosis/${pelicula.peliculaid}`} >
            <i class="fa-solid fa-ticket"></i> Comprar
            </Link>
          </div>
        </div>
      ))}

    </section>
    )
}

export default peliculasTable;