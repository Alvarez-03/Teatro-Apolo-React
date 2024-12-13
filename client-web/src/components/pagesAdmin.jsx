import React, { useState, useEffect } from "react";
import FuncionesTable from "./funcionesTable";
import UsuariosTable from './usuariosTable.jsx';
import ComprasTable from './comprasTable.jsx';
import PeliculasTable from "./peliculasTable.jsx";
import axios from "axios";

function PageAdmin() {
  // Definir los estados para las tablas
  const [funciones, setFunciones] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [compras, setCompras] = useState([]);

  // Función para cargar los datos desde la API
  const cargarDatos = async () => {
    try {
      const [funcionesResponse, usuariosResponse, comprasResponse] = await Promise.all([
        axios.get('http://localhost:3000/funciones'),
        axios.get('http://localhost:3000/usuarios'),
        axios.get('http://localhost:3000/compras'),
      ]);
      
      setFunciones(funcionesResponse.data);
      setUsuarios(usuariosResponse.data);
      setCompras(comprasResponse.data);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <>
      <FuncionesTable funciones={funciones} />
      <UsuariosTable usuarios={usuarios} />
      <ComprasTable compras={compras} />
      <PeliculasTable />
    </>
  );
}

export default PageAdmin;
