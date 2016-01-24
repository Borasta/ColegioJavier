import express from "express";
import bodyParser from "body-parser";
import Promise from "bluebird";
import Mysql from "promise-mysql";

import routes from "./app/routes";
import request from "./app/request";

let mysql;

let app = express();

let router = express.Router();

app.set("port", process.env.PORT || 5000);

app.set("mysql", {
	"host": 'db4free.net',
    "user": 'jhoseww',
    "password": '5603410jwm',
    "database": 'javier'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));

app.use( express.static(`${__dirname}/public`) );
app.use( express.static(`${__dirname}/bower_components`) );


app.listen(app.get("port"), () => {
	console.log(`Servidor iniciado en http://localhost:${app.get("port")}`);
	Mysql.createConnection(app.get("mysql")).
		then(success => {
			mysql = success;
			console.log(`Conexion con la base de datos correcta`);
			app.use( request( router, mysql ) );
		}).catch(error => {
			console.log(`${error}`)
	});
});

app.use( routes(router) );
