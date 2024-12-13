La aplicacion cuenta con un administrador donde permite crear y visualizar la informacion de usuarios, peliculas, compras y funciones por pelicula; Por el lado del usuario permite crear un usuario,
loguiarse con el usuario, comprar y elegir una o varias sillas de una funcion, ademas cuenta con una dependencia (jspdf) que permite crear pdfs como factura de la compra.

La aplicacion fue creada con React, PostgreSQL, express y node.
Informacion sobre la base de datos Creada en PostgreSQL



Tabla usuarios
usuarioid --> PK

column_name |     data_type     | is_nullable
-------------+-------------------+-------------
 usuarioid   | numeric           | NO
 nombre      | character varying | YES
 email       | character varying | YES
 password    | character varying | YES




Tabla peliculas
peliculaid -->PK

column_name |     data_type     | is_nullable
-------------+-------------------+-------------
 duracion    | bigint            | YES
 peliculaid  | integer           | NO
 genero      | character varying | YES
 poster      | character varying | YES
 sipnosis    | text              | YES
 trailer     | character varying | YES
 titulo      | character varying | NO



Tabla funciones --> 
funcionid --> PK
peliculaid --> FK

 column_name | data_type | is_nullable
-------------+-----------+-------------
 funcionid   | integer   | NO
 peliculaid  | integer   | NO
 fecha       | text      | NO




Tabla compra --> Para Guardar la informacion de las funciones compradas
compraid --> PK
usuarioid --> FK
funcionid --> FK

 column_name | data_type | is_nullable
-------------+-----------+-------------
 compraid    | integer   | NO
 usuarioid   | integer   | NO
 funcionid   | integer   | NO
