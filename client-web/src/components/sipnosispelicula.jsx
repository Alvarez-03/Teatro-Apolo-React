import React from "react";
import '../styles/sipnosis.css';
import { useParams } from "react-router-dom";
import ContentFunciones from "./seccionFunciones";

const Sipnosispelicula=({peliculas})=>{
    

    const{id}= useParams();
    const pelicula = peliculas.find((pelicula)=> pelicula.peliculaid === parseInt(id))

    console.log(pelicula)

    if (!pelicula) {
        return <p>Película no encontrada</p>; // Manejo de errores
    }

    return (
        <section className="container">
            <div key={pelicula.id}  id="container-sipnosis" class="container" className=" pelicula-sipnosis">
                    <div id="container-img">
                        <img 
                            src={pelicula.poster} 
                            alt={`${pelicula.titulo}`} 
                            id="img-poster" 
                            width="200px"
                        />
                    </div>
                    <div id="container-text-sipnosis">
                        <h2>{pelicula.titulo}</h2>
                        <p>{pelicula.sipnosis}</p>
                    </div>
                    <div id="container-fichatecnica">
                        <div>
                            <h4>Género: {pelicula.genero}</h4>
                        </div>
                        <div>
                            <h4>Duración: {pelicula.duracion} min</h4>
                        </div>
                    </div>
                </div>
                <ContentFunciones peliculaid={pelicula.peliculaid}/>
                
        </section>
    )

}
export default Sipnosispelicula;