import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/usuariostable.css"
const usuariosTable = ({usuarios})=>{

  const [usuariosData, setusuariosData]=useState({usuarioid:'',nombre:'',email:'',password:''})
  const [isModalOpen,setIsModalOpen]=useState(false) //para abrir la creacion o edicion de un usuario
  const [isEditing, setIsEditing] = useState(false) //Para editar un usuario


  const openPopup=()=>{
    setusuariosData({ usuarioid: '', nombre: '', email: '', password: '' });
    setIsModalOpen(true)
  }
  const closePopup=()=>{
    setIsModalOpen(false)
    setIsEditing(false);
  }
  const handleChange=(e)=>{
    const{name,value}=e.target;
    setusuariosData({
      ...usuariosData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit= async (e)=>{
    e.preventDefault()
    try{
        if(isEditing){
          await axios.patch(`http://localhost:3000/usuarios/${usuariosData.usuarioid}`,usuariosData)
          alert("Usuario actualizado con exito")
        }else{
          await axios.post('http://localhost:3000/usuarios',usuariosData);
          setIsEditing(false);
          console.log("Usuario ingresado con exito", usuariosData)
        }
        closePopup();
        window.location.reload(); 

    }catch(error){
      console.log('Error al agregar al usuario',error)
    }
  }

  const handleDelete= async(usuarioid)=>{
    try{
      await axios.delete(`http://localhost:3000/usuarios/${usuarioid}`)
      alert('Usuario eliminado')
      closePopup();
      window.location.reload(); 
    }catch(error){
      console.log('Error al eliminar el usuario',error)
      alert('El usuario no fue eliminado')
    }
  }

  const handleEdit= async(usuario)=>{
    openPopup();
    setusuariosData(usuario)
    setIsEditing(true);
  }



    return(
      <section className="container content-page">
        <section className="container">
            <button class="btn btn-primary btn-add" onClick={openPopup}>
              <i class="fa-solid fa-user-plus"></i> Agregar Usuario
            </button>
        </section>
        {isModalOpen && 
          <form onSubmit={handleSubmit} className="container container-addusu ">
            <header className=" headeradd">
              <h3>Detalles de Usuario</h3>
              <div className=" closeBtn" onClick={closePopup}><i class="fa-solid fa-circle-xmark"></i></div>
            </header>

            <section className="container popupSection"> 
              <input className="popupInput" type="number" placeholder="Numero de Identificacion" name="usuarioid" onChange={handleChange} value={usuariosData.usuarioid}/>
              <input className="popupInput" type="text" placeholder="Nombre" name="nombre" onChange={handleChange} value={usuariosData.nombre}/>
              <input className="popupInput" type="email" placeholder="Correo electronico" name="email" onChange={handleChange} value={usuariosData.email}/>
              <input className="popupInput" type="password" placeholder="Contraseña" name="password" onChange={handleChange} value={usuariosData.password}/>
            </section>

            <footer>
              <button type="submit" class="btn btn-primary btn-add" >
                <i class="fa-solid fa-user-plus"></i>{isEditing?'Actualizar':'Añadir'}
              </button>
            </footer>
          </form>
        }
        <section className="container py-5">
          <h2>Usuarios</h2>
          <table>
            <tr>
              <th>CC usuario</th>
              <th>Nombre</th>
              <th>email</th>
              <th>contraseña</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
            <tbody>
              {usuarios.map((usuario)=>(
                <tr key={usuario.usuarioid}>
                  <td>{usuario.usuarioid}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.password}</td>
                  <td><button class="btn btn-edit" onClick={()=>handleEdit(usuario)}><i class="fa-solid fa-user-pen"></i></button></td>
                  <td><button class="btn btn-elm" onClick={()=>handleDelete(usuario.usuarioid)}><i class="fa-solid fa-trash-can"></i></button></td>

                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    )
}

export default usuariosTable;