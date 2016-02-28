"use strict";

module.exports = function (mysql) {
	var query = "";

	return {
		"getData": function getData(req, res) {
			var tokenDecoded = req.data;
			query = "\n\t            SELECT docentes.nombres_d as nombres,\n\t\t            docentes.apellidos_d as apellidos,\n\t\t            docentes.cedula_d as cedula,\n\t\t            docentes.genero_d as genero,\n\t\t            docentes.user_d as usuario\n\t            FROM docentes\n\t            WHERE docentes.id_d = " + tokenDecoded.id + ";\n\t        ";
			mysql.query(query).then(function (docente) {
				if (docente.length >= 1) {
					res.status(200).send(docente[0]);
				}
			}).catch(function (error) {
				res.status(404).send(error);
			});
		},
		"getSalones": function getSalones(req, res) {
			var tokenDecoded = req.data;
			query = "\n\t            SELECT DISTINCT \n\t            \tgrados.id_gra,\n\t            \tgrados.grado,\n\t\t\t\t\tgrados.seccion\n\t\t            FROM docentes INNER JOIN docente_materia\n\t\t            \tON docentes.id_d = docente_materia.id_d INNER JOIN cursos\n\t\t            \tON docente_materia.id_dm = cursos.id_dm INNER JOIN estudiantes\n\t\t            \tON cursos.id_e = estudiantes.id_e INNER JOIN grados\n\t\t            \tON estudiantes.id_gra = grados.id_gra INNER JOIN notas\n\t\t            \tON cursos.id_c = notas.id_c\n\t            WHERE docentes.id_d = " + tokenDecoded.id + " AND (SELECT count(*) FROM anio) = notas.id_anio\n\t            ORDER BY grados.grado, grados.seccion;\n\t        ";
			mysql.query(query).then(function (salones) {
				if (salones.length >= 1) {
					res.status(200).send(salones);
				}
			}).catch(function (error) {
				res.status(404).send(error);
			});
		},
		"getAlumnos": function getAlumnos(req, res) {
			var tokenDecoded = req.data;
			query = "\n\t\t        SELECT estudiantes.nombres_e,\n\t\t\t\t\testudiantes.apellidos_e,\n\t\t        \testudiantes.cedula_e,\n\t\t        \tnotas.lapso1,\n\t\t        \tnotas.lapso2,\n\t\t        \tnotas.lapso3\n\t\t            FROM docentes INNER JOIN docente_materia\n\t\t            \tON docentes.id_d = docente_materia.id_d INNER JOIN cursos\n\t\t            \tON docente_materia.id_dm = cursos.id_dm INNER JOIN estudiantes\n\t\t            \tON cursos.id_e = estudiantes.id_e INNER JOIN notas\n\t\t            \tON cursos.id_c = notas.id_calumnos\n\t\t        WHERE docentes.id_d = " + tokenDecoded.id + " AND grados.id_gra = " + req.body.id + " AND (SELECT count(*) FROM anio) = notas.id_anio\n\t\t        ORDER BY grados.grado, grados.seccion, estudiantes.cedula_e;\n\t\t    ";
			mysql.query(query).then(function (alumnos) {
				if (alumnos.length >= 1) {
					res.status(200).send(alumnos);
				}
			}).catch(function (error) {
				res.status(404).send(error);
			});
		},
		"getHorario": function getHorario(req, res) {
			var tokenDecoded = req.data;
			query = "\n\t            SELECT materias.nombre_m, dias.dia, horarios.hora_inicio, horarios.hora_final\n\t\t\t\t\tFROM docentes INNER JOIN docente_materia\n\t\t\t\t\t\tON docentes.id_d = docente_materia.id_d\n\t\t\t\t\t  INNER JOIN materias\n\t\t\t\t\t\tON docente_materia.id_m = materias.id_m\n\t\t\t\t\t  INNER JOIN horarios\n\t\t\t\t\t\tON docente_materia.id_dm = horarios.id_dm\n\t\t\t\t\t  INNER JOIN dias\n\t\t\t\t\t\tON horarios.id_dia = dias.id_dia\n\t\t\t\t\tWHERE docentes.id_d = " + tokenDecoded.id + "\n\t\t\t\t\tORDER BY dias.id_dia, horarios.id_h;\n\t        ";
			mysql.query(query).then(function (horario) {
				if (horario.length >= 1) {
					res.status(200).send(horario);
				}
			}).catch(function (error) {
				res.status(404).send(error);
			});
		}
	};
};