"use strict";

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _services = require("./services");

var _services2 = _interopRequireDefault(_services);

var _middleware = require("./middleware");

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (router, mysql) {
	var query = "";

	router.get("/auth/login/:token", _middleware2.default.authenticated, function (req, res) {
		var tokenDecoded = req.data;
		if (tokenDecoded.type === "e") {
			query = "\n\t            SELECT id_e,\n\t            \tnombres_e,\n\t\t            apellidos_e\n\t            FROM estudiantes\n\t            WHERE id_e = " + tokenDecoded.id + ";\n\t        ";
		} else if (tokenDecoded.type === "p") {
			query = "\n\t            SELECT id_p,\n\t            \tnombres_p,\n\t\t            apellidos_p\n\t            FROM profesores\n\t            WHERE id_p = " + tokenDecoded.id + ";\n\t        ";
		}
		mysql.query(query).then(function (row) {
			if (row.length >= 1) {
				var data = {
					"token": req.params.token,
					"nombres": row[0].nombres_e,
					"apellidos": row[0].apellidos_e
				};
				res.status(200).send(data);
			}
		}).catch(function (error) {
			res.status(401).send({ "message": "Error, ingrese de nuevo" });
		});
	});

	router.post("/auth/login", function (req, res) {
		var userData = req.body;
		switch (req.body.type) {
			case "e":
				query = "\n\t\t            SELECT id_e as id,\n\t\t            \tnombres_e as nombres,\n\t\t\t            apellidos_e as apellidos,\n\t\t\t            flag_e as flag\n\t\t            FROM estudiantes\n\t\t            WHERE user_e = '" + userData.user + "' AND pass_e = '" + userData.pass + "';\n\t\t        ";
				break;
			case "p":
				query = "\n\t\t            SELECT id_p as id,\n\t\t            \tnombres_p as nombres,\n\t\t\t            apellidos_p as apellidos,\n\t\t\t            flag_p as flag\n\t\t            FROM profesores\n\t\t            WHERE user_p = '" + userData.user + "' AND pass_p = '" + userData.pass + "';\n\t\t        ";
				break;
			default:
				res.status(404).send({ message: "Error, ingrese de nuevo" });
				break;
		}
		mysql.query(query).then(function (row) {
			if (row.length >= 1) {
				var token = _services2.default.createToken({
					"id": row[0].id,
					"type": "e"
				}, {
					"time": 1,
					"type": "days"
				});
				var data = {
					"token": token,
					"nombres": row[0].nombres,
					"apellidos": row[0].apellidos
				};
				res.status(200).send(data);
			}
		}).catch(function (error) {
			res.status(404).send(error);
		});
	});

	router.get("/estudiantes", function (req, res) {
		query = "\n            SELECT *\n            FROM estudiantes;\n        ";
		mysql.query(query).then(function (row) {
			res.send(row);
		}).catch(function (error) {
			console.log(error);
		});
	});

	router.post("/perfil/estudiante/notas", _middleware2.default.authenticated, function (req, res) {
		var tokenDecoded = req.data;
		query = "\n\t\t\tSELECT\n\t\t\t\tmaterias.nombre_m as materia,\n\t\t\t\tdocentes.nombres_d nombres,\n\t\t\t\tdocentes.apellidos_d apellidos,\n\t\t\t\tnotas.lapso1 as lapso1,\n\t\t\t\tnotas.lapso2 as lapso2,\n\t\t\t\tnotas.lapso3 as lapso3,\n\t\t\t\tCAST((notas.lapso1 + notas.lapso2 + notas.lapso3) / 3 as DECIMAL(4, 2) ) as promedio,\n\t\t\t\tanio.anio as anio\n\t\t\tFROM estudiantes INNER JOIN cursos\n\t\t\t\tON estudiantes.id_e = cursos.id_e       INNER JOIN docente_materia\n\t\t\t\tON cursos.id_dm = docente_materia.id_dm INNER JOIN docentes\n\t\t\t\tON docente_materia.id_d = docentes.id_d INNER JOIN materias\n\t\t\t\tON docente_materia.id_m = materias.id_m INNER JOIN notas\n\t\t\t\tON cursos.id_c = notas.id_c             INNER JOIN anio\n\t\t\t\tON notas.id_anio = anio.id_anio\n\t\t\tWHERE estudiantes.id_e = " + tokenDecoded.id + ";\n\t\t";
		mysql.query(query).then(function (row) {
			if (row.length >= 1) {
				console.log(row);
				res.status(200).send(row);
			}
		}).catch(function (error) {
			res.status(404).send(error);
		});
	});

	router.post("/perfil/estudiante/data", _middleware2.default.authenticated, function (req, res) {
		var tokenDecoded = req.data;
		var data = {};
		query = "\n            SELECT estudiantes.nombres_e as nombres,\n            estudiantes.apellidos_e as apellidos,\n            estudiantes.fecha_nacimiento as edad,\n            estudiantes.cedula_e as cedula,\n            estudiantes.genero_e as genero,\n            estudiantes.direccion_e as direccion,\n            estudiantes.user_e as usuario,\n            grados.grado as grado,\n            secciones.seccion as seccion\n            FROM estudiantes                          INNER JOIN grados\n                ON estudiantes.id_gra = grados.id_gra INNER JOIN secciones\n                ON grados.id_s = secciones.id_s\n            WHERE estudiantes.id_e = " + tokenDecoded.id + ";\n        ";
		mysql.query(query).then(function (estudiante) {
			if (estudiante.length >= 1) {
				data.estudiante = estudiante[0];
				data.estudiante.edad = (0, _moment2.default)(data.estudiante.edad).fromNow();
				query = "\n\t\t\t\t\tSELECT representantes.nombres_r as nombres,\n\t\t\t\t\trepresentantes.apellidos_r as apellidos,\n\t\t\t\t\trepresentantes.cedula_r as cedula,\n\t\t\t\t\trepresentantes.genero_r as genero\n\t\t\t\t\tFROM estudiantes                          INNER JOIN familias\n\t\t\t\t\t\tON estudiantes.id_e = familias.id_e   INNER JOIN representantes\n\t\t\t\t\t\tON familias.id_r = representantes.id_r\n\t\t\t\t\tWHERE estudiantes.id_e = " + tokenDecoded.id + ";\n\t\t\t\t";
				console.log(query);
				mysql.query(query).then(function (representantes) {
					if (representantes.length >= 1) {
						data.representantes = representantes;
						res.status(200).send(data);
					}
				}).catch(function (error) {
					res.status(404).send(error);
				});
			}
		}).catch(function (error) {
			res.status(404).send(error);
		});
	});

	router.post("/perfil/estudiante/horario", _middleware2.default.authenticated, function (req, res) {
		var tokenDecoded = req.data;
		query = "\n\t\t\tSELECT docentes.nombres_d, materias.nombre_m, dias.dia, horarios.hora_inicio, horarios.hora_final\n\t\t\tFROM estudiantes\n\t\t\t\tINNER JOIN cursos\n\t\t\t\t\tON estudiantes.id_e = cursos.id_e\n\t\t\t\tINNER JOIN docente_materia\n\t\t\t\t\tON cursos.id_dm = docente_materia.id_dm\n\t\t\t\tINNER JOIN docentes\n\t\t\t\t\tON docente_materia.id_d = docentes.id_d\n\t\t\t\tINNER JOIN materias\n\t\t\t\t\tON docente_materia.id_m = materias.id_m\n\t\t\t\tINNER JOIN horarios\n\t\t\t\t\tON docente_materia.id_dm = horarios.id_dm\n\t\t\t\tINNER JOIN dias\n\t\t\t\t\tON horarios.id_dia = dias.id_dia\n\t\t\t\tINNER JOIN notas\n\t\t\t\t\tON cursos.id_c = notas.id_c\n\t\t\tWHERE estudiantes.id_e = " + tokenDecoded.id + " AND (SELECT count(*) FROM anio) = notas.id_anio\n\t\t\tORDER BY dias.id_dia, horarios.id_h;\n\t\t";
		mysql.query(query).then(function (materias) {
			if (materias.length >= 1) {
				console.log(materias);
				res.status(200).send(materias);
			}
		}).catch(function (error) {
			res.status(404).send(error);
		});
	});

	return router;
};