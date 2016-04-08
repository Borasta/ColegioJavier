"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _methodOverride = require("method-override");

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _promiseMysql = require("promise-mysql");

var _promiseMysql2 = _interopRequireDefault(_promiseMysql);

var _routes = require("./app/routes");

var _routes2 = _interopRequireDefault(_routes);

var _request = require("./app/request");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importacion de las librerias

var mysql = void 0; //guarda la conexion

var app = (0, _express2.default)(); //guarda los objetos

var router = _express2.default.Router(); //guarda las rutas

app.set("port", process.env.PORT || 5000); //agregar el puerto

app.set("mysql", {
	"host": 'db4free.net',
	"user": 'jhoseww',
	"password": 'javier',
	"database": 'javier', // Datos de mi usuario
	"port": '3306'
});

app.set("local", {
	"host": 'localhost',
	"user": 'root',
	"password": '',
	"database": 'javier', // Datos de mi usuario
	"port": '3306'
});

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ "extended": false }));

app.use(_express2.default.static(__dirname + "/bower_components")); // se usa express en la carpeta (Bower Components)
app.use(_express2.default.static(__dirname + "/public")); // se usa express en la carpeta (public)
app.use((0, _methodOverride2.default)()); // Se usa para poder utilizar los metodos put y delete

app.listen(app.get("port"), function () {
	//Conexion con la base de datos
	console.log("Servidor iniciado en http://localhost:" + app.get("port"));

	// Tratamos de conectarnos a db4free
	_promiseMysql2.default.createConnection(app.get("mysql")).then(function (conection) {
		mysql = conection;
		console.log("Conexion con la base de datos correcta db4free");
		app.use((0, _request2.default)(router, mysql));
	}).catch(function (error) {
		console.log("" + error);

		// Si no se puede entonces tratamos de conectarnos a local
		_promiseMysql2.default.createConnection(app.get("local")).then(function (conection) {
			mysql = conection;
			console.log("Conexion con la base de datos correcta local");
			app.use((0, _request2.default)(router, mysql));
		}).catch(function (error) {
			console.log("" + error);
		});
	});
});

app.use((0, _routes2.default)(router)); //Acceder a las rutas

// Backend (es la parte que procesa los datos que recive del usuario) --> Servidor
// Frontend (es la parte del dise;o software donde interactua con el usuario) -->Login