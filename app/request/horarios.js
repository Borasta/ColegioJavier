"use strict";

module.exports = function (mysql) {
	var query = "";

	return {
		"get": function get(req, res) {
			var tokenDecoded = req.data;
			var values = [];
			switch (tokenDecoded.type) {
				// Si somos estudiantes nos retorna nuestros horario,
				case "e":
					{
						query = "\n\t\t\t\t\t\t\tSELECT \n\t\t\t\t\t\t\tdocentes.nombres_d, \n\t\t\t\t\t\t\tmaterias.nombre_m, \n\t\t\t\t\t\t\tdias.dia, \n\t\t\t\t\t\t\thorarios.hora_inicio, \n\t\t\t\t\t\t\thorarios.hora_final\n\t\t\t\t\t\t\tFROM estudiantes\n\t\t\t\t\t\t\t\tINNER JOIN cursos\n\t\t\t\t\t\t\t\t\tON estudiantes.id_e = cursos.id_e\n\t\t\t\t\t\t\t\tINNER JOIN docente_materia\n\t\t\t\t\t\t\t\t\tON cursos.id_dm = docente_materia.id_dm\n\t\t\t\t\t\t\t\tINNER JOIN docentes\n\t\t\t\t\t\t\t\t\tON docente_materia.id_d = docentes.id_d\n\t\t\t\t\t\t\t\tINNER JOIN materias\n\t\t\t\t\t\t\t\t\tON docente_materia.id_m = materias.id_m\n\t\t\t\t\t\t\t\tINNER JOIN horarios\n\t\t\t\t\t\t\t\t\tON docente_materia.id_dm = horarios.id_dm\n\t\t\t\t\t\t\t\tINNER JOIN dias\n\t\t\t\t\t\t\t\t\tON horarios.id_dia = dias.id_dia\n\t\t\t\t\t\t\t\tINNER JOIN notas\n\t\t\t\t\t\t\t\t\tON cursos.id_c = notas.id_c\n\t\t\t\t\t\t\tWHERE estudiantes.id_e = ? \n\t\t\t\t\t\t\t\tAND (SELECT count(*) FROM anio) = notas.id_anio\n\t\t\t\t\t\t\tORDER BY dias.id_dia, horarios.id_h;\n\t\t\t\t\t\t";
						values = [tokenDecoded.id];
						break;
					}

				// Si somos un docente verificamos que flag tenemos
				case "d":
					{
						switch (tokenDecoded.flag) {
							// Si somo admin o moderador hacemos una busqueda entre todos
							// los horarios
							case "a":
							case "b":
								{
									query = "\n\t\t\t\t\t\t\t\t\tSELECT \n\t\t\t\t\t\t\t\t\t\thorarios.id_h as id,\n\t\t\t\t\t\t\t\t\t\tdocentes.nombres_d as nombres,\n\t\t\t\t\t\t\t\t\t\tdocentes.apellidos_d as apellidos,\n\t\t\t\t\t\t\t\t\t\tmaterias.nombre_m as materia,\n\t\t\t\t\t\t\t\t\t\tdias.dia,\n\t\t\t\t\t\t\t\t\t\thorarios.hora_inicio,\n\t\t\t\t\t\t\t\t\t\thorarios.hora_final\n\t\t\t\t\t\t\t\t\tFROM \n\t\t\t\t\t\t\t\t\t\thorarios \n\t\t\t\t\t\t\t\t\t\tINNER JOIN dias \n\t\t\t\t\t\t\t\t\t\t\tON horarios.id_dia = dias.id_dia\n\t\t\t\t\t\t\t\t\t\tINNER JOIN docente_materia\n\t\t\t\t\t\t\t\t\t\t\tON horarios.id_dm = docente_materia.id_dm\n\t\t\t\t\t\t\t\t\t\tINNER JOIN materias\n\t\t\t\t\t\t\t\t\t\t\tON docente_materia.id_m = materias.id_m\n\t\t\t\t\t\t\t\t\t\tINNER JOIN docentes\n\t\t\t\t\t\t\t\t\t\t\tON docente_materia.id_d = docentes.id_d\n\t\t\t\t\t\t\t\t\tWHERE \n\t\t\t\t\t\t\t\t\t\tUPPER(" + req.query.type + ") LIKE UPPER(?)\n\t\t\t\t\t\t\t\t\tORDER BY \n\t\t\t\t\t\t\t\t\t\tnombres_d;\n\t\t\t\t\t\t\t\t";
									values = ["%" + req.query.data + "%"];
									console.log(values);
									break;
								}

							// Si somos un docente normal retornamos nuestro horario
							case "c":
								{
									query = "\n\t\t\t\t\t\t\t\t\tSELECT \n\t\t\t\t\t\t\t\t\tmaterias.nombre_m, \n\t\t\t\t\t\t\t\t\tdias.dia, \n\t\t\t\t\t\t\t\t\thorarios.hora_inicio, \n\t\t\t\t\t\t\t\t\thorarios.hora_final\n\t\t\t\t\t\t\t\t\tFROM docentes INNER JOIN docente_materia\n\t\t\t\t\t\t\t\t\t\tON docentes.id_d = docente_materia.id_d\n\t\t\t\t\t\t\t\t\t  INNER JOIN materias\n\t\t\t\t\t\t\t\t\t\tON docente_materia.id_m = materias.id_m\n\t\t\t\t\t\t\t\t\t  INNER JOIN horarios\n\t\t\t\t\t\t\t\t\t\tON docente_materia.id_dm = horarios.id_dm\n\t\t\t\t\t\t\t\t\t  INNER JOIN dias\n\t\t\t\t\t\t\t\t\t\tON horarios.id_dia = dias.id_dia\n\t\t\t\t\t\t\t\t\tWHERE docentes.id_d = ?\n\t\t\t\t\t\t\t\t\tORDER BY dias.id_dia, horarios.id_h;\n\t\t\t\t\t\t\t\t";
									values = [tokenDecoded.id];
									break;
								}

							default:
								res.status(403).send("No tienes permiso");
								break;
						}
						break;
					}

				default:
					{
						res.status(403).send("No tienes permiso");
						break;
					}
			}

			mysql.query(query, values).then(function (horarios) {
				res.status(200).send(horarios);
			}).catch(function (error) {
				res.status(404).send(error);
			});
		}, // Listo
		"post": function post(req, res) {
			/*
    * Parametros:
    * 	type: Hace referencia a por que parametro se hara la busqueda,
    * 		  si por nombre de materia, docente o apellido.
    * 		  Ej:
    * 		  	nombre_m	materia
    * 		  	nombres_d	nombre de docente
    * 		  	apellidos_d	apellido de docente
    *
    * 	data: Hace referencia al valor de la busqueda, puede ser
    * 		  el nombre de la materia, del docente o el apellido.
    */
			var tokenDecoded = req.data;
			var values = [];
			switch (tokenDecoded.flag) {
				case "a":
				case "b":
					query = "\n\t\t\t\t        \tINSERT INTO horarios VALUES (\n\t\t\t\t        \t\tnull,\n\t\t\t\t        \t\t?,\n\t\t\t\t        \t\t?,\n\t\t\t\t        \t\t?,\n\t\t\t\t        \t\t?\n\t\t\t\t        \t)\n\t\t\t\t    \t";
					values = [req.body.id_dm, req.body.id_dia, req.body.hora_inicio, req.body.hora_final];
					break;

				default:
					res.status(403).send("No tienes permiso");
					break;
			}
			mysql.query(query, values).then(function (horario) {
				res.status(200);
			}).catch(function (error) {
				res.status(404).send(error);
			});
		}, // Listo
		"put": function put(req, res) {
			/*
    * Parametros:
    * 	type: Hace referencia a por que parametro se hara la busqueda,
    * 		  si por nombre de materia, docente o apellido.
    * 		  Ej:
    * 		  	nombre_m	materia
    * 		  	nombres_d	nombre de docente
    * 		  	apellidos_d	apellido de docente
    *
    * 	data: Hace referencia al valor de la busqueda, puede ser
    * 		  el nombre de la materia, del docente o el apellido.
    */
			var tokenDecoded = req.data;
			var values = [];
			switch (tokenDecoded.flag) {
				case "a":
				case "b":
					query = "\n\t\t\t\t        \tUPDATE horarios SET\n\t\t\t\t        \t\tid_dm = ?,\n\t\t\t\t        \t\tid_dia = ?,\n\t\t\t\t        \t\thora_inicio = ?,\n\t\t\t\t        \t\thora_final = ?\n\t\t\t\t        \tWHERE id_h = ?\n\t\t\t\t    \t";
					values = [req.query.id_dm, req.query.id_dia, req.query.hora_inicio, req.query.hora_final, req.query.id_h];
					break;

				default:
					res.status(403).send("No tienes permiso");
					break;
			}
			mysql.query(query, values).then(function (horario) {
				res.status(200);
			}).catch(function (error) {
				res.status(404).send(error);
			});
		}, // Listo
		"delete": function _delete(req, res) {
			/*
    * Parametros:
    * 	type: Hace referencia a por que parametro se hara la busqueda,
    * 		  si por nombre de materia, docente o apellido.
    * 		  Ej:
    * 		  	nombre_m	materia
    * 		  	nombres_d	nombre de docente
    * 		  	apellidos_d	apellido de docente
    *
    * 	data: Hace referencia al valor de la busqueda, puede ser
    * 		  el nombre de la materia, del docente o el apellido.
    */
			var tokenDecoded = req.data;
			var values = [];
			switch (tokenDecoded.flag) {
				case "a":
				case "b":
					query = "\n\t\t\t\t        \tDELETE FROM horarios \n\t\t\t\t        \tWHERE id_h = ?\n\t\t\t\t    \t";
					values = [req.query.id_h];
					break;

				default:
					res.status(403).send("No tienes permiso");
					break;
			}
			mysql.query(query, values).then(function (horario) {
				res.status(200);
			}).catch(function (error) {
				res.status(404).send(error);
			});
		} // Listo
	};
};