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

var mysql = undefined;

var app = (0, _express2.default)();

var router = _express2.default.Router();

app.set("port", process.env.PORT || 5000);

app.set("mysql", {
	"host": 'db4free.net',
	"user": 'jhoseww',
	"password": '5603410jwm',
	"database": 'javier'
});

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ "extended": false }));

app.use(_express2.default.static(__dirname + "/public"));
app.use(_express2.default.static(__dirname + "/bower_components"));

app.listen(app.get("port"), function () {
	console.log("Servidor iniciado en http://localhost:" + app.get("port"));
	_promiseMysql2.default.createConnection(app.get("mysql")).then(function (success) {
		mysql = success;
		console.log("Conexion con la base de datos correcta");
		app.use((0, _request2.default)(router, mysql));
	}).catch(function (error) {
		console.log("" + error);
	});
});

app.use((0, _routes2.default)(router));