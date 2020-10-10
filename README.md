# HolosTest


Antes de comenzar muchas gracias por la oportunidad,

El test se separa en 2 partes Front y Back

Requisitos  
Mongoo DB   
Node.js   
Angular 9+ (no estoy seguro si con el comando npm install ya lo instalaba)  

Bien para comenzar hay que descargar el repo y dentro de cada carpeta abrir consola y introducir el comando

$npm install

esto instalará todas las dependencias que necesita el proyecto para correr

el back debe estar en el puerto 3000 y el front en el puerto 4200

El front contiene un pequeño tutorial en video para mostrar la funcionalidad en la parte de usuarios, nada del otro mundo. 

para levantar el back correr el comando en la carpeta del back

$npx nodemon conn.js

la api del back funciona con con las siguientes rutas:  

POST http://localhost:3000/mutant/:cadena_dna  
GET http://localhost:3000/stats  
GET http://localhost:3000/getUsersList  
POST http://localhost:3000/create/:cadena_user&&&pass  
POST http://localhost:3000/delete/:id_user  
