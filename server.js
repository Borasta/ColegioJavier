"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

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

var mysql = undefined; //guarda la conexion

var app = (0, _express2.default)(); //guarda los objetos

var router = _express2.default.Router(); //guarda las rutas

//

app.set("port", process.env.PORT || 5000); //agregar el puerto

app.set("mysql", {
	"host": 'db4free.net',
	"user": 'jhoseww',
	"password": '5603410jwm',
	"database": 'javier' // Datos de mi usuario
});

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ "extended": false }));

app.use(_express2.default.static(__dirname + "/bower_components")); //se usa express en la carpeta (Bower Components)
app.use(_express2.default.static(__dirname + "/public")); //se usa express en la carpeta (public)

app.listen(app.get("port"), function () {
	//Conexion con la base de datos
	console.log("Servidor iniciado en http://localhost:" + app.get("port"));
	_promiseMysql2.default.createConnection(app.get("mysql")).then(function (conection) {
		mysql = conection;
		console.log("Conexion con la base de datos correcta");
		app.use((0, _request2.default)(router, mysql));
	}).catch(function (error) {
		console.log("" + error);
	});
});

app.use((0, _routes2.default)(router)); //Acceder a las rutas

//back end (es la parte que procesa los datos que recive del usuario) --> Servidor
// From end (es la parte del dise;o software donde interactua con el usuario) -->Login