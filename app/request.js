"use strict";

var _services = require("./services");

var _services2 = _interopRequireDefault(_services);

var _jwtSimple = require("jwt-simple");

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (router, mysql) {
	var auth = false;
	var query = "";

	router.get("/auth/verify", function (req, res) {
		res.send(auth);
	});

	router.route("/auth/login/estudiante").get(function () {}).post(function (req, res) {
		console.log(req.headers.authorization);
		var userData = req.body;
		query = "\n            SELECT id_e,\n            \tnombres_e,\n\t            apellidos_e,\n\t            cedula_e,\n\t            fecha_nacimiento,\n\t            genero_e,\n\t            direccion_e,\n\t            user_e,\n\t            flag_e\n            FROM estudiantes\n            WHERE user_e = '" + userData.user + "' AND pass_e = '" + userData.pass + "';\n        ";
		mysql.query(query).then(function (row) {

			if (row.length >= 1) {
				var token = _services2.default.createToken(row[0].id_e, {
					"time": 1,
					"type": "days"
				});
				res.status(200).send(token);
			}
		}).catch(function (error) {
			res.send(error);
		});
	});

	router.route("/auth/login/profesor").get(function () {}).post(function () {});

	router.get("/estudiantes", function (req, res) {
		query = "\n            SELECT *\n            FROM estudiantes;\n        ";
		mysql.query(query).then(function (row) {
			res.send(row);
		}).catch(function (error) {
			console.log(error);
		});
	});

	router.post("/auth/signup/estudiante", function (req, res) {});

	router.get("/auth/logout", function (req, res) {
		auth = false;
		res.send(auth);
	});

	return router;
};