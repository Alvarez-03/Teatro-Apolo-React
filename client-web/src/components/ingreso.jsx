import React, {useState,useEffect} from "react";
import "../styles/ingresar.css"
import { Link, useNavigate} from "react-router-dom";

const Ingresarusuario =({usuarios})=>{

    const navigate = useNavigate();
    const [usuariosData, setusuariosData]=useState({email:'',password:''})
    const [isModalOpenError, setIsModalOpenError]=useState(false)
    const [isModalOpen, setIsModalOpen]=useState(false)

    const handleChange=(e)=>{
        const{name,value}=e.target;
        setusuariosData({
          ...usuariosData,
          [e.target.name]: e.target.value,
        })
    }

    const spanOpenError=()=>{
        setIsModalOpenError(true)
    }
    const spanCloseError=()=>{
        setIsModalOpenError(false)
    }
    const spanOpenBienv=()=>{
        setIsModalOpen(true)
    }

    const VerificacionUsuario= async(e)=>{
        e.preventDefault(e)
        try{

            if ( usuariosData.email === "admin@admin.com" && usuariosData.password === "admin"){
                localStorage.setItem("usuario", "Administrador");
                setTimeout(() => {
                navigate("/adminTA"); 
                window.location.reload();
                }, 500);
                spanOpenBienv();
                return;
            }

            const usuarioEncontrado= usuarios.find(
                (usuario)=> usuario.email === usuariosData.email && usuario.password === usuariosData.password
            )
            if(usuarioEncontrado){
                localStorage.setItem('usuario', usuarioEncontrado.nombre)
                setTimeout(() => {
                    navigate('/');
                    window.location.reload()
                }, 500);
                spanOpenBienv()

            }else{
                setTimeout(() => {
                    spanCloseError()
                }, 500);
                spanOpenError()
                setusuariosData({email:'',password:''})
            }

        }catch(error){
            console.error('error al ingresar el usuario')

        }
    }
    return(
        
        <section class="container" id="contenedor-ingresar">
            {isModalOpenError &&
                <span className="alert-usuerror">
                    <h3> <i class="fa-solid fa-circle-exclamation"></i> Usuario Mal ingresado</h3>
                </span>
            }
            {isModalOpen&&
                <span className="alert-usuregis">
                    <h3> Bienvenido a Teatro Apolo 🎥</h3>
                </span>
            }
            <h2>Cine Apolo</h2>
            <form id="form-ingreso" onSubmit={VerificacionUsuario}>
                <h3>Iniciar sesion</h3>
                <input type="text" placeholder="Correo" id="usuario" name="email" onChange={handleChange} value={usuariosData.email} required/>
                <input type="password" placeholder="Clave" id="clave" name='password' onChange={handleChange} value={usuariosData.password}  required/>
                <button type="submit" class="btn btn-primary">Ingresar</button>
                <Link to='/registrarTeatroApolo'>¿No estas Registrado? Registrate aqui.</Link>
            </form>
        </section>
    )
}

export default Ingresarusuario;