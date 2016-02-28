"use strict";

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (mysql) {
	var query = "";

	return {
		"getData": function getData(req, res) {
			var tokenDecoded = req.data;
			var data = {};
			query = "\n\t            SELECT estudiantes.nombres_e as nombres,\n\t            estudiantes.apellidos_e as apellidos,\n\t            estudiantes.fecha_nacimiento as edad,\n\t            estudiantes.cedula_e as cedula,\n\t            estudiantes.genero_e as genero,\n\t            estudiantes.direccion_e as direccion,\n\t            estudiantes.user_e as usuario,\n\t            grados.grado as grado,\n\t            grados.seccion as seccion\n\t            FROM estudiantes                          INNER JOIN grados\n\t                ON estudiantes.id_gra = grados.id_gra\n\t            WHERE estudiantes.id_e = " + tokenDecoded.id + ";\n\t        ";
			mysql.query(query).then(function (estudiante) {
				if (estudiante.length >= 1) {
					data.estudiante = estudiante[0];
					data.estudiante.edad = (0, _moment2.default)(data.estudiante.edad).fromNow();
					query = "\n\t\t\t\t\t\tSELECT representantes.nombres_r as nombres,\n\t\t\t\t\t\trepresentantes.apellidos_r as apellidos,\n\t\t\t\t\t\trepresentantes.cedula_r as cedula,\n\t\t\t\t\t\trepresentantes.genero_r as genero\n\t\t\t\t\t\tFROM estudiantes                          INNER JOIN familias\n\t\t\t\t\t\t\tON estudiantes.id_e = familias.id_e   INNER JOIN representantes\n\t\t\t\t\t\t\tON familias.id_r = representantes.id_r\n\t\t\t\t\t\tWHERE estudiantes.id_e = " + tokenDecoded.id + ";\n\t\t\t\t\t";
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
		},
		"getNotas": function getNotas(req, res) {
			var tokenDecoded = req.data;
			query = "\n\t\t\t\tSELECT\n\t\t\t\t\tmaterias.nombre_m as materia,\n\t\t\t\t\tdocentes.nombres_d nombres,\n\t\t\t\t\tdocentes.apellidos_d apellidos,\n\t\t\t\t\tnotas.lapso1 as lapso1,\n\t\t\t\t\tnotas.lapso2 as lapso2,\n\t\t\t\t\tnotas.lapso3 as lapso3,\n\t\t\t\t\tCAST((notas.lapso1 + notas.lapso2 + notas.lapso3) / 3 as DECIMAL(4, 2) ) as promedio,\n\t\t\t\t\tanio.anio as anio\n\t\t\t\tFROM estudiantes INNER JOIN cursos\n\t\t\t\t\tON estudiantes.id_e = cursos.id_e       INNER JOIN docente_materia\n\t\t\t\t\tON cursos.id_dm = docente_materia.id_dm INNER JOIN docentes\n\t\t\t\t\tON docente_materia.id_d = docentes.id_d INNER JOIN materias\n\t\t\t\t\tON docente_materia.id_m = materias.id_m INNER JOIN notas\n\t\t\t\t\tON cursos.id_c = notas.id_c             INNER JOIN anio\n\t\t\t\t\tON notas.id_anio = anio.id_anio\n\t\t\t\tWHERE estudiantes.id_e = " + tokenDecoded.id + ";\n\t\t\t";
			mysql.query(query).then(function (row) {
				if (row.length >= 1) {
					console.log(row);
					res.status(200).send(row);
				}
			}).catch(function (error) {
				res.status(404).send(error);
			});
		},
		"getHorario": function getHorario(req, res) {
			var tokenDecoded = req.data;
			query = "\n\t\t\t\tSELECT docentes.nombres_d, materias.nombre_m, dias.dia, horarios.hora_inicio, horarios.hora_final\n\t\t\t\tFROM estudiantes\n\t\t\t\t\tINNER JOIN cursos\n\t\t\t\t\t\tON estudiantes.id_e = cursos.id_e\n\t\t\t\t\tINNER JOIN docente_materia\n\t\t\t\t\t\tON cursos.id_dm = docente_materia.id_dm\n\t\t\t\t\tINNER JOIN docentes\n\t\t\t\t\t\tON docente_materia.id_d = docentes.id_d\n\t\t\t\t\tINNER JOIN materias\n\t\t\t\t\t\tON docente_materia.id_m = materias.id_m\n\t\t\t\t\tINNER JOIN horarios\n\t\t\t\t\t\tON docente_materia.id_dm = horarios.id_dm\n\t\t\t\t\tINNER JOIN dias\n\t\t\t\t\t\tON horarios.id_dia = dias.id_dia\n\t\t\t\t\tINNER JOIN notas\n\t\t\t\t\t\tON cursos.id_c = notas.id_c\n\t\t\t\tWHERE estudiantes.id_e = " + tokenDecoded.id + " AND (SELECT count(*) FROM anio) = notas.id_anio\n\t\t\t\tORDER BY dias.id_dia, horarios.id_h;\n\t\t\t";
			mysql.query(query).then(function (materias) {
				if (materias.length >= 1) {
					console.log(materias);
					res.status(200).send(materias);
				}
			}).catch(function (error) {
				res.status(404).send(error);
			});
		},
		"getGrupos": function getGrupos(req, res) {
			var tokenDecoded = req.data;
			query = "\n\t\t\t\tSELECT \n\t\t\t\t\tgrupos.nombre_gru as nombre, \n\t\t\t\t\tgrupos.descripcion_gru as descripcion\n\t\t\t\tFROM estudiantes INNER JOIN miembros\n\t\t\t\t\tON estudiantes.id_e = miembros.id_e INNER JOIN grupos\n\t\t\t\t\tON miembros.id_gru = grupos.id_gru\n\t\t\t\tWHERE estudiantes.id_e = " + tokenDecoded.id + ";\n\t\t\t";
			mysql.query(query).then(function (grupos) {
				if (grupos.length >= 1) {
					console.log(grupos);
					res.status(200).send(grupos);
				}
			}).catch(function (error) {
				res.status(404).send(error);
			});
		}
	};
};