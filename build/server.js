import express from "express";
import bodyParser from "body-parser";
import Promise from "bluebird";
import Mysql from "promise-mysql";

import routes from "./app/routes";
import request from "./app/request";

// importacion de las librerias


let mysql; //guarda la conexion

let app = express(); //guarda los objetos

let router = express.Router(); //guarda las rutas

app.set("port", process.env.PORT || 5000); //agregar el puerto 

app.set("mysql", {
	"host": 'db4free.net',
    "user": 'jhoseww',
    "password": 'javier',
    "database": 'javier'  // Datos de mi usuario
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));

app.use( express.static(`${__dirname}/bower_components`) ); //se usa express en la carpeta (Bower Components)
app.use( express.static(`${__dirname}/public`) ); //se usa express en la carpeta (public)

app.listen(app.get("port"), () => { //Conexion con la base de datos
	console.log(`Servidor iniciado en http://localhost:${app.get("port")}`); 
	Mysql.createConnection(app.get("mysql")) 
		.then(conection => {
			mysql = conection;
			console.log(`Conexion con la base de datos correcta`);
			app.use( request( router, mysql ) );
		}).catch(error => {
			console.log(`${error}`)
	});
});

app.use( routes(router) ); //Acceder a las rutas


// Backend (es la parte que procesa los datos que recive del usuario) --> Servidor
// Frontend (es la parte del dise;o software donde interactua con el usuario) -->Login 