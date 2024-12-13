const express = require('express')
const cors = require('cors')
const postgressPOOL= require('pg').Pool
const bodyparser = require('body-parser')




const app= express()
const port= 3000;

app.use(bodyparser.json())
app.use(cors())

const pool = new postgressPOOL({
    host: 'localhost',
    user: 'postgres',
    password: '1105366846',
    database: 'bd_Cine_Apolo',
    port:5432,
})

pool.connect((error, connection)=>{
    if(error) throw error;
    console.log(`conexion a base de datos exitosa! ${port}`)
})

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

//=====================   Usuarios
app.get('/usuarios',(req,res)=>{
    const sql= 'SELECT * FROM usuarios';
    pool.query(sql,(error,resultado)=>{
        if(error) return res.json(error);
        return res.status(200).json(resultado.rows)
    })
})

//buscar usuario por ID
app.get('/usuarios/:usuarioid', (req,res)=>{
    const usuID= Number(req.params.usuarioid);
    const sql= 'SELECT * FROM usuarios WHERE usuarioid = $1'

    pool.query(sql,[usuID],(error,resultado)=>{
        if(error) return res.json(error);
        return res.status(200).json(resultado.rows[0])
    })
})

app.post('/usuarios',(req,res)=>{
    const {usuarioid,nombre,email,password} = req.body;
    console.log(req.body);

    const sql = 'INSERT INTO usuarios (usuarioid, nombre, email, password) VALUES ($1, $2, $3, $4) RETURNING *';

    pool.query(sql,[usuarioid,nombre,email,password],(error,resultado)=>{
        if(error) return res.json(error);
        return res.status(201).json(resultado.rows)
    })
})

app.delete('/usuarios/:usuarioid', (req,res)=>{
    const usuid = Number(req.params.usuarioid);

    if(isNaN(usuid)){
        return res.status(400).send("El ID del estudiante no es valido")
    }

    const sql='DELETE FROM usuarios WHERE "usuarioid"=$1';
    pool.query(sql,[usuid],(error,resultado)=>{
        if(error){
            console.log("Error al eliminar el Usuario: ",error);
            return res.status(500).json({error: error.message})
        }
        if (resultado.rowCount === 0) {
            return res.status(404).send(`No se encontró el usuario con ID ${usuid}`);
        }

        return res.status(200).send(`El usuario con ID ${usuid} fue eliminado.`);
    })
})

app.patch('/usuarios/:usuarioid',(req,res)=>{
    const usuid= Number(req.params.usuarioid)
    const {usuarioid,nombre,email,password}=req.body
    console.log(req.body);
    
    const sql='UPDATE usuarios SET usuarioid=$1, nombre=$2, email=$3, password=$4 WHERE "usuarioid"=$1'
    pool.query(sql,[usuarioid,nombre,email,password],(error,resultado)=>{
        if(error) return res.json(error);
        return res.status(200).send(`El usuario ha sido actualizado por el codigo: ${usuid}`);
    })
})

//================= peliculas
app.get('/peliculas', (req,res)=>{
    const sql='SELECT * FROM peliculas';
    pool.query(sql,(error,resultado)=>{
        if(error) return res.json(error);
        return res.status(200).json(resultado.rows)
    })
})


app.post('/peliculas', (req,res)=>{
    const{peliculaid,titulo,genero,duracion,sipnosis,trailer,poster} = req.body
    console.log(req.body)
    const sql='INSERT INTO peliculas(peliculaid, titulo, genero, duracion, sipnosis, trailer, poster) VALUES ($1,$2,$3,$4,$5,$6,$7)'
    pool.query(sql,[peliculaid,titulo,genero,duracion,sipnosis,trailer,poster],(error,resultado)=>{
        if(error) return res.json(error);
        return res.status(201).json('La pelicula se agrego a la base de datos')
    })
})

app.delete('/peliculas/:peliculaid', (req, res) => {
    const peliid = Number(req.params.peliculaid);
  
    if (isNaN(peliid)) {
      return res.status(400).send("El ID de la película no es válido");
    }
  
    // Primero, eliminamos las dependencias en la tabla 'compras'
    const deleteComprasSql = 'DELETE FROM compras WHERE funcionid IN (SELECT funcionid FROM funciones WHERE peliculaid = $1)';
    pool.query(deleteComprasSql, [peliid], (error, resultado) => {
      if (error) {
        console.log("Error al eliminar las compras: ", error);
        return res.status(500).json({ error: error.message });
      }
  
      // Luego, eliminamos las dependencias en la tabla 'funciones'
      const deleteFuncionesSql = 'DELETE FROM funciones WHERE peliculaid = $1';
      pool.query(deleteFuncionesSql, [peliid], (error, resultado) => {
        if (error) {
          console.log("Error al eliminar las funciones: ", error);
          return res.status(500).json({ error: error.message });
        }
  
        // Finalmente, eliminamos la película en la tabla 'peliculas'
        const deletePeliculaSql = 'DELETE FROM peliculas WHERE peliculaid = $1';
        pool.query(deletePeliculaSql, [peliid], (error, resultado) => {
          if (error) {
            console.log("Error al eliminar la película: ", error);
            return res.status(500).json({ error: error.message });
          }
  
          if (resultado.rowCount === 0) {
            return res.status(404).send(`No se encontró la película con ID ${peliid}`);
          }
  
          return res.status(200).send(`La película con ID ${peliid} fue eliminada exitosamente.`);
        });
      });
    });
  });
  
  

//============== funciones

app.get('/funciones', (req,res)=>{
    const sql='SELECT * FROM funciones';
    pool.query(sql,(error,resultado)=>{
        if(error) return res.json(error);
        return res.status(200).json(resultado.rows)
    })
})

app.get('/funciones/:funcionid', (req,res)=>{
    const idfunc= Number(req.params.funcionid)
    const sql='SELECT * FROM funciones WHERE funcionid = $1';
    pool.query(sql,[idfunc],(error,resultado)=>{
        if(error) return res.json(error);
        return res.status(200).json(resultado.rows[0])
    })
})

app.post('/funciones', (req,res)=>{
    const{funcionid,peliculaid,fecha}=req.body
    console.log(req.body)
    const sql='INSERT INTO funciones(funcionid,peliculaid,fecha) VALUES ($1,$2,$3)'

    pool.query(sql,[funcionid,peliculaid,fecha],(error,resultado)=>{
        if(error) return res.json(error);
        return res.status(201).json('La funcion se agrego a la base de datos')
    })
})

app.delete('/funciones/:funcionid', (req,res)=>{
    const funcionid = Number(req.params.funcionid);

    if(isNaN(funcionid)){
        return res.status(400).send("El ID de la funcion no es valida")
    }

    const sql='DELETE FROM funciones WHERE "funcionid"=$1';
    pool.query(sql,[funcionid],(error,resultado)=>{
        if(error){
            console.log("Error al eliminar el Usuario: ",error);
            return res.status(500).json({error: error.message})
        }
        if (resultado.rowCount === 0) {
            return res.status(404).send(`No se encontró el usuario con ID ${funcionid}`);
        }

        return res.status(200).send(`El usuario con ID ${funcionid} fue eliminado.`);
    })
})

//======= compras

app.get('/compras',(req,res)=>{
    const sql='SELECT * FROM compras';
    pool.query(sql,(error,resultado)=>{
        if(error) return res.json(error);
        return res.status(200).json(resultado.rows);
    
    })
})

app.get('/compras/:usuarioid',(req,res)=>{
    const idusu=Number(req.params.usuarioid)
    const sql='SELECT * FROM compras WHERE usuarioid = $1'

    pool.query(sql,[idusu],(error,resultado)=>{
        if(error){
            return res.status(500).json(error)
        };
        return res.status(200).json(resultado.rows)
    })
})

app.post('/compras',(req,res)=>{
    const{usuarioid, funcionid, asientos}=req.body;
    console.log(req.body)
    const sql='INSERT INTO compras (usuarioid,funcionid,asientos) VALUES($1,$2,$3)'
    pool.query(sql,[usuarioid,funcionid,asientos],(error,resultado)=>{
        if(error){
             return res.status(500).json(error);
        }
        return res.status(201).json('Compra exitosa')
    })
})

app.delete('/compras/:compraid', (req,res)=>{
    const compraid = Number(req.params.compraid);

    if(isNaN(compraid)){
        return res.status(400).send("El ID de la compra no es valida")
    }

    const sql='DELETE FROM compras WHERE compraid=$1';
    pool.query(sql,[compraid],(error,resultado)=>{
        if(error){
            console.log("Error al eliminar La compra: ",error);
            return res.status(500).json({error: error.message})
        }
        if (resultado.rowCount === 0) {
            return res.status(404).send(`No se encontró la compra con ID ${compraid}`);
        }

        return res.status(200).send(`El usuario con ID ${compraid} fue eliminado.`);
    })
})
  

