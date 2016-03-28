"use strict";

module.exports = function (mysql) {
	var query = "";

	return {
		"get": function get(req, res) {
			var tokenDecoded = req.data;
			var values = [tokenDecoded.id];
			switch (tokenDecoded.type) {
				// Si somos estudiantes nos retorna nuestras notas,
				case "e":
					{
						query = "\n\t\t\t\t\t\t\tSELECT\n\t\t\t\t\t\t\t\tmaterias.nombre_m as materia,\n\t\t\t\t\t\t\t\tdocentes.nombres_d nombres,\n\t\t\t\t\t\t\t\tdocentes.apellidos_d apellidos,\n\t\t\t\t\t\t\t\tnotas.lapso1 as lapso1,\n\t\t\t\t\t\t\t\tnotas.lapso2 as lapso2,\n\t\t\t\t\t\t\t\tnotas.lapso3 as lapso3,\n\t\t\t\t\t\t\t\tCAST((notas.lapso1 + notas.lapso2 + notas.lapso3) / 3 as DECIMAL(4, 2) ) as promedio,\n\t\t\t\t\t\t\t\tanio.anio as anio\n\t\t\t\t\t\t\tFROM estudiantes INNER JOIN cursos\n\t\t\t\t\t\t\t\tON estudiantes.id_e = cursos.id_e       INNER JOIN docente_materia\n\t\t\t\t\t\t\t\tON cursos.id_dm = docente_materia.id_dm INNER JOIN docentes\n\t\t\t\t\t\t\t\tON docente_materia.id_d = docentes.id_d INNER JOIN materias\n\t\t\t\t\t\t\t\tON docente_materia.id_m = materias.id_m INNER JOIN notas\n\t\t\t\t\t\t\t\tON cursos.id_c = notas.id_c             INNER JOIN anio\n\t\t\t\t\t\t\t\tON notas.id_anio = anio.id_anio\n\t\t\t\t\t\t\tWHERE estudiantes.id_e = ?\n\t\t\t\t\t\t\tORDER BY anio;\n\t\t\t\t\t\t";
						values = [tokenDecoded.id];
						mysql.query(query, values).then(function (notas) {
							if (notas.length >= 1) {
								res.status(200).send(notas);
							}
						}).catch(function (error) {
							res.status(404).send(error);
						});
						break;
					}

				// Si somos un docente verificamos que flag tenemos
				case "d":
					{
						switch (tokenDecoded.flag) {
							// Si somos admin o moderador, buscamos entre todas las notas
							case "a":
							case "b":
								{
									query = "\n\t\t\t\t\t\t\t\t\tSELECT\n\t\t\t\t\t\t\t\t\t\testudiantes.nombres_e nombres,\n\t\t\t\t\t\t\t\t\t\testudiantes.apellidos_e apellidos,\n\t\t\t\t\t\t\t\t\t\tmaterias.nombre_m as materia,\n\t\t\t\t\t\t\t\t\t\tnotas.lapso1 as lapso1,\n\t\t\t\t\t\t\t\t\t\tnotas.lapso2 as lapso2,\n\t\t\t\t\t\t\t\t\t\tnotas.lapso3 as lapso3,\n\t\t\t\t\t\t\t\t\t\tCAST((notas.lapso1 + notas.lapso2 + notas.lapso3) / 3 as DECIMAL(4, 2) ) as promedio,\n\t\t\t\t\t\t\t\t\t\tanio.anio as anio\n\t\t\t\t\t\t\t\t\tFROM estudiantes INNER JOIN cursos\n\t\t\t\t\t\t\t\t\t\tON estudiantes.id_e = cursos.id_e       INNER JOIN docente_materia\n\t\t\t\t\t\t\t\t\t\tON cursos.id_dm = docente_materia.id_dm INNER JOIN docentes\n\t\t\t\t\t\t\t\t\t\tON docente_materia.id_d = docentes.id_d INNER JOIN materias\n\t\t\t\t\t\t\t\t\t\tON docente_materia.id_m = materias.id_m INNER JOIN notas\n\t\t\t\t\t\t\t\t\t\tON cursos.id_c = notas.id_c             INNER JOIN anio\n\t\t\t\t\t\t\t\t\t\tON notas.id_anio = anio.id_anio\n\t\t\t\t\t\t\t\t\tWHERE \n\t\t\t\t\t\t\t\t\t\tUPPER(estudiantes." + req.query.type + "_e) LIKE UPPER(?)\n\t\t\t\t\t\t\t\t\tORDER BY \n\t\t\t\t\t\t\t\t\t\tnombres_e;\n\t\t\t\t\t\t\t\t";
									values = ["%" + req.query.data + "%"];
									break;
								}
							// Si somos docentes normales buscamos nuestros
							// estudiantes
							case "c":
								{
									query = "\n\t\t\t\t\t\t\t\t\tSELECT\n\t\t\t\t\t\t\t\t\t\testudiantes.nombres_e nombres,\n\t\t\t\t\t\t\t\t\t\testudiantes.apellidos_e apellidos,\n\t\t\t\t\t\t\t\t\t\tmaterias.nombre_m as materia,\n\t\t\t\t\t\t\t\t\t\tnotas.lapso1 as lapso1,\n\t\t\t\t\t\t\t\t\t\tnotas.lapso2 as lapso2,\n\t\t\t\t\t\t\t\t\t\tnotas.lapso3 as lapso3,\n\t\t\t\t\t\t\t\t\t\tCAST((notas.lapso1 + notas.lapso2 + notas.lapso3) / 3 as DECIMAL(4, 2) ) as promedio\n\t\t\t\t\t\t\t\t\tFROM estudiantes INNER JOIN cursos\n\t\t\t\t\t\t\t\t\t\tON estudiantes.id_e = cursos.id_e       INNER JOIN docente_materia\n\t\t\t\t\t\t\t\t\t\tON cursos.id_dm = docente_materia.id_dm INNER JOIN docentes\n\t\t\t\t\t\t\t\t\t\tON docente_materia.id_d = docentes.id_d INNER JOIN materias\n\t\t\t\t\t\t\t\t\t\tON docente_materia.id_m = materias.id_m INNER JOIN notas\n\t\t\t\t\t\t\t\t\t\tON cursos.id_c = notas.id_c             INNER JOIN anio\n\t\t\t\t\t\t\t\t\t\tON notas.id_anio = anio.id_anio\n\t\t\t\t\t\t\t\t\tWHERE \n\t\t\t\t\t\t\t\t\t\tUPPER(docentes." + req.query.type + "_d) LIKE UPPER(?)\n\t\t\t\t\t\t\t\t\t\tAND (SELECT count(*) FROM anio) = notas.id_anio\n\t\t\t\t\t\t\t\t\tORDER BY \n\t\t\t\t\t\t\t\t\t\tnombres_e;\n\t\t\t\t\t\t\t\t";
									values = ["%" + req.query.data + "%"];
									break;
								}

							default:
								{
									res.status(403).send("No tienes permiso");
									break;
								}
						}
						mysql.query(query, values).then(function (estudiantes) {
							if (estudiantes.length >= 1) {
								res.status(200).send(estudiantes);
							}
						}).catch(function (error) {
							res.status(404).send(error);
						});
						break;
					}

				default:
					{
						res.status(403).send("No tienes permiso");
						break;
					}

			}
		}, // Listo
		"post": function post(req, res) {
			var tokenDecoded = req.data;
			var values = [tokenDecoded.id];
			switch (tokenDecoded.flag) {
				// Si somos admin o moderador, modificamos las nota del alumno que nos pasaron
				case "a":
				case "b":
					{
						query = "\n\t\t\t\t\t\t\tSELECT\n\t\t\t\t\t\t\t\testudiantes.nombres_e nombres,\n\t\t\t\t\t\t\t\testudiantes.apellidos_e apellidos,\n\t\t\t\t\t\t\t\tmaterias.nombre_m as materia,\n\t\t\t\t\t\t\t\tnotas.lapso1 as lapso1,\n\t\t\t\t\t\t\t\tnotas.lapso2 as lapso2,\n\t\t\t\t\t\t\t\tnotas.lapso3 as lapso3,\n\t\t\t\t\t\t\t\tCAST((notas.lapso1 + notas.lapso2 + notas.lapso3) / 3 as DECIMAL(4, 2) ) as promedio,\n\t\t\t\t\t\t\t\tanio.anio as anio\n\t\t\t\t\t\t\tFROM estudiantes INNER JOIN cursos\n\t\t\t\t\t\t\t\tON estudiantes.id_e = cursos.id_e       INNER JOIN docente_materia\n\t\t\t\t\t\t\t\tON cursos.id_dm = docente_materia.id_dm INNER JOIN docentes\n\t\t\t\t\t\t\t\tON docente_materia.id_d = docentes.id_d INNER JOIN materias\n\t\t\t\t\t\t\t\tON docente_materia.id_m = materias.id_m INNER JOIN notas\n\t\t\t\t\t\t\t\tON cursos.id_c = notas.id_c             INNER JOIN anio\n\t\t\t\t\t\t\t\tON notas.id_anio = anio.id_anio\n\t\t\t\t\t\t\tWHERE \n\t\t\t\t\t\t\t\tUPPER(estudiantes." + req.query.type + "_e) LIKE UPPER(?)\n\t\t\t\t\t\t\tORDER BY \n\t\t\t\t\t\t\t\tnombres_e;\n\t\t\t\t\t\t";
						values = ["%" + req.query.data + "%"];
						break;
					}
				// Si somos docentes normales buscamos nuestros
				// estudiantes
				case "c":
					{
						query = "\n\t\t\t\t\t\tUPDATE notas \n\t\t\t\t\t\tSET\t\n\t\t\t\t\t\t\tlapso1 = ?,\n\t\t\t\t\t\t\tlapso2 = ?,\n\t\t\t\t\t\t\tlapso3 = ?\n\t\t\t\t\t\tWHERE id_c = ? AND id_anio = ?\n\t\t\t\t\t";
						values = [req.body.lapso1, req.body.lapso2, req.body.lapso3, req.body.id_c, req.body.id_anio];
						break;
					}

				default:
					{
						res.status(403).send("No tienes permiso");
						break;
					}
			}
			mysql.query(query, values).then(function (estudiantes) {
				if (estudiantes.length >= 1) {
					res.status(200).send(estudiantes);
				}
			}).catch(function (error) {
				res.status(404).send(error);
			});
		},
		"put": function put(req, res) {},
		"delete": function _delete(req, res) {}
	};
};