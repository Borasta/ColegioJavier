"use strict";

module.exports = function (app, mysql) {
	var auth = false;
	var query = "";

	app.get("/auth/verify", function (req, res) {
		res.send(auth);
	});

	app.post("/auth/login/estudiante", function (req, res) {
		var userData = req.body;
		query = "\n            SELECT id_e,\n            \tnombres_e,\n\t            apellidos_e,\n\t            cedula_e,\n\t            fecha_nacimiento,\n\t            genero_e,\n\t            direccion_e,\n\t            user_e,\n\t            flag_e\n            FROM estudiantes\n            WHERE user_e = '" + userData.user + "' AND pass_e = '" + userData.pass + "';\n        ";
		mysql.query(query).then(function (row) {
			res.write("TODO CORRECTO");
			console.log(row);
		}).catch(function (error) {
			console.log(error);
		});
	});

	app.get("/estudiantes", function (req, res) {
		query = "\n            SELECT *\n            FROM estudiantes;\n        ";
		mysql.query(query).then(function (row) {
			console.log(row);
		}).catch(function (error) {
			console.log(error);
		});
	});

	app.post("/auth/signup/estudiante", function (req, res) {});

	app.get("/auth/logout", function (req, res) {
		auth = false;
		res.send(auth);
	});
};