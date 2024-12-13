import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//imports components
import Peliculas from './components/peliculas.jsx';
import Header from './components/encabezado.jsx';
import Footer from './components/footer.jsx';
import Sipnosispelicula from './components/sipnosispelicula.jsx';
import Ingresarusuario from './components/ingreso.jsx';
import Registrousuarios from './components/registro.jsx';
import PageAdmin from './components/pagesAdmin.jsx';
import FormContactanos from './components/contactanos.jsx';

function App() {
  const [usuarios, setusuarios] = useState([]);
  const [funciones, setfunciones] = useState([]);
  const [peliculas, setpeliculas] = useState([]);
  const [compras, setcompras] = useState([]);

  const [filtereusuarios, setFilteredsetUsuarios] = useState([]);
  const [filterefunciones, setFilteredsetFunciones] = useState([]);
  const [filterepeliculas, setFilteredsetPeliculas] = useState([]);
  const [filterecompras, setFilteredsetCompras] = useState([]);

  const getAllusuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuarios');
      setusuarios(response.data);
      setFilteredsetUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener los datos (usuarios) del servidor');
    }
  };

  const getAllfunciones = async () => {
    try {
      const response = await axios.get('http://localhost:3000/funciones');
      setfunciones(response.data);
    } catch (error) {
      console.error('Error al obtener (funciones) de la base de datos');
    }
  };

  const getAllpeliculas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/peliculas');
      setpeliculas(response.data);
      setFilteredsetPeliculas(response.data);
    } catch (error) {
      console.error('Error al obtener los datos (peliculas) del servidor');
    }
  };

  const getAllcompras = async () => {
    try {
      const response = await axios.get('http://localhost:3000/compras');
      setcompras(response.data);
      setFilteredsetCompras(response.data);
    } catch (error) {
      console.error('Error al obtener los datos (compras) del servidor');
    }
  };

  useEffect(() => {
    getAllusuarios();
    getAllfunciones();
    getAllpeliculas();
    getAllcompras();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Peliculas peliculas={peliculas} />} />
        <Route path="/sipnosis/:id" element={<Sipnosispelicula peliculas={peliculas} />} />
        <Route path="/ingresarTeatroApolo" element={<Ingresarusuario usuarios={usuarios} />} />
        <Route path="/registrarTeatroApolo" element={<Registrousuarios />} />
        <Route path="/adminTA" element={<PageAdmin funciones={funciones} usuarios={usuarios} compras={compras} />} />
        <Route path="/ContactanosTeatroApolo" element={<FormContactanos />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
