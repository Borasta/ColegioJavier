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
		console.log(tokenDecoded);
		if (tokenDecoded.type === "e") {
			query = "\n\t            SELECT id_e as id,\n\t            \tnombres_e as nombres,\n\t\t            apellidos_e as apellidos\n\t            FROM estudiantes\n\t            WHERE id_e = " + tokenDecoded.id + ";\n\t        ";
		} else if (tokenDecoded.type === "d") {
			query = "\n\t            SELECT id_d as id,\n\t            \tnombres_d as nombres,\n\t\t            apellidos_d as apellidos\n\t            FROM docentes\n\t            WHERE id_d = " + tokenDecoded.id + ";\n\t        ";
		}
		mysql.query(query).then(function (row) {
			if (row.length >= 1) {
				var data = {
					"token": req.params.token,
					"nombres": row[0].nombres,
					"apellidos": row[0].apellidos
				};
				res.status(200).send(data);
			}
		}).catch(function (error) {
			res.status(401).send({ "message": "Error, ingrese de nuevo" });
		});
	});

	router.post("/auth/login", function (req, res) {
		var userData = req.body;
		switch (userData.type) {
			case "e":
				query = "\n\t\t            SELECT id_e as id,\n\t\t            \tnombres_e as nombres,\n\t\t\t            apellidos_e as apellidos,\n\t\t\t            flag_e as flag\n\t\t            FROM estudiantes\n\t\t            WHERE user_e = '" + userData.user + "' AND pass_e = '" + userData.pass + "';\n\t\t        ";
				break;
			case "d":
				query = "\n\t\t            SELECT id_d as id,\n\t\t            \tnombres_d as nombres,\n\t\t\t            apellidos_d as apellidos,\n\t\t\t            flag_d as flag\n\t\t            FROM docentes\n\t\t            WHERE user_d = '" + userData.user + "' AND pass_d = '" + userData.pass + "';\n\t\t        ";
				break;
			default:
				res.status(404).send({ message: "Error, ingrese de nuevo" });
				break;
		}
		mysql.query(query).then(function (row) {
			if (row.length >= 1) {
				var token = _services2.default.createToken({
					"id": row[0].id,
					"type": userData.type
				}, {
					"time": 1,
					"type": "days"
				});
				console.log(token);
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
		query = "\n            SELECT estudiantes.nombres_e as nombres,\n            estudiantes.apellidos_e as apellidos,\n            estudiantes.fecha_nacimiento as edad,\n            estudiantes.cedula_e as cedula,\n            estudiantes.genero_e as genero,\n            estudiantes.direccion_e as direccion,\n            estudiantes.user_e as usuario,\n            grados.grado as grado,\n            grados.seccion as seccion\n            FROM estudiantes                          INNER JOIN grados\n                ON estudiantes.id_gra = grados.id_gra\n            WHERE estudiantes.id_e = " + tokenDecoded.id + ";\n        ";
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

	router.post("/perfil/estudiante/grupos", _middleware2.default.authenticated, function (req, res) {
		var tokenDecoded = req.data;
		query = "\n\t\t\tSELECT \n\t\t\t\tgrupos.nombre_gru as nombre, \n\t\t\t\tgrupos.descripcion_gru as descripcion\n\t\t\tFROM estudiantes INNER JOIN miembros\n\t\t\t\tON estudiantes.id_e = miembros.id_e INNER JOIN grupos\n\t\t\t\tON miembros.id_gru = grupos.id_gru\n\t\t\tWHERE estudiantes.id_e = " + tokenDecoded.id + ";\n\t\t";
		mysql.query(query).then(function (grupos) {
			if (grupos.length >= 1) {
				console.log(grupos);
				res.status(200).send(grupos);
			}
		}).catch(function (error) {
			res.status(404).send(error);
		});
	});

	router.post("/perfil/docente/data", _middleware2.default.authenticated, function (req, res) {
		var tokenDecoded = req.data;
		query = "\n            SELECT docentes.nombres_d as nombres,\n\t            docentes.apellidos_d as apellidos,\n\t            docentes.cedula_d as cedula,\n\t            docentes.genero_d as genero,\n\t            docentes.user_d as usuario\n            FROM docentes\n            WHERE docentes.id_d = " + tokenDecoded.id + ";\n        ";
		mysql.query(query).then(function (docente) {
			if (docente.length >= 1) {
				res.status(200).send(docente[0]);
			}
		}).catch(function (error) {
			res.status(404).send(error);
		});
	});

	router.post("/perfil/docente/salones", _middleware2.default.authenticated, function (req, res) {
		var tokenDecoded = req.data;
		query = "\n            SELECT DISTINCT \n            \tgrados.id_gra,\n            \tgrados.grado,\n\t\t\t\tgrados.seccion\n\t            FROM docentes INNER JOIN docente_materia\n\t            \tON docentes.id_d = docente_materia.id_d INNER JOIN cursos\n\t            \tON docente_materia.id_dm = cursos.id_dm INNER JOIN estudiantes\n\t            \tON cursos.id_e = estudiantes.id_e INNER JOIN grados\n\t            \tON estudiantes.id_gra = grados.id_gra INNER JOIN notas\n\t            \tON cursos.id_c = notas.id_c\n            WHERE docentes.id_d = " + tokenDecoded.id + " AND (SELECT count(*) FROM anio) = notas.id_anio\n            ORDER BY grados.grado, grados.seccion;\n        ";
		mysql.query(query).then(function (salones) {
			if (salones.length >= 1) {
				res.status(200).send(salones);
			}
		}).catch(function (error) {
			res.status(404).send(error);
		});
	});

	router.post("/perfil/docente/alumnos", _middleware2.default.authenticated, function (req, res) {
		var tokenDecoded = req.data;
		query = "\n            SELECT estudiantes.nombres_e,\n\t\t\t\testudiantes.apellidos_e,\n            \testudiantes.cedula_e,\n            \tnotas.lapso1,\n            \tnotas.lapso2,\n            \tnotas.lapso3\n\t            FROM docentes INNER JOIN docente_materia\n\t            \tON docentes.id_d = docente_materia.id_d INNER JOIN cursos\n\t            \tON docente_materia.id_dm = cursos.id_dm INNER JOIN estudiantes\n\t            \tON cursos.id_e = estudiantes.id_e INNER JOIN notas\n\t            \tON cursos.id_c = notas.id_calumnos\n            WHERE docentes.id_d = " + tokenDecoded.id + " AND grados.id_gra = " + req.body.id + " AND (SELECT count(*) FROM anio) = notas.id_anio\n            ORDER BY grados.grado, grados.seccion, estudiantes.cedula_e;\n        ";
		mysql.query(query).then(function (alumnos) {
			if (alumnos.length >= 1) {
				res.status(200).send(alumnos);
			}
		}).catch(function (error) {
			res.status(404).send(error);
		});
	});

	router.post("/perfil/docente/horario", _middleware2.default.authenticated, function (req, res) {
		var tokenDecoded = req.data;
		query = "\n            SELECT materias.nombre_m, dias.dia, horarios.hora_inicio, horarios.hora_final\n\t\t\t\tFROM docentes INNER JOIN docente_materia\n\t\t\t\t\tON docentes.id_d = docente_materia.id_d\n\t\t\t\t  INNER JOIN materias\n\t\t\t\t\tON docente_materia.id_m = materias.id_m\n\t\t\t\t  INNER JOIN horarios\n\t\t\t\t\tON docente_materia.id_dm = horarios.id_dm\n\t\t\t\t  INNER JOIN dias\n\t\t\t\t\tON horarios.id_dia = dias.id_dia\n\t\t\t\tWHERE docentes.id_d = " + tokenDecoded.id + "\n\t\t\t\tORDER BY dias.id_dia, horarios.id_h;\n        ";
		mysql.query(query).then(function (horario) {
			if (horario.length >= 1) {
				res.status(200).send(horario);
			}
		}).catch(function (error) {
			res.status(404).send(error);
		});
	});

	return router;
};