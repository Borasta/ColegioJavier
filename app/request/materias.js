"use strict";

module.exports = function (mysql) {
	var query = "";

	return {
		"get": function get(req, res) {
			var tokenDecoded = req.data;
			req.query.data = req.query.data || '';
			var values = [];
			switch (tokenDecoded.flag) {
				case "a":
				case "b":
					{
						query = "\n\t\t\t\t\t\t\tSELECT\n\t\t\t\t\t\t\t\tid_m AS id,\n\t\t\t\t\t\t\t\tnombre_m AS nombre\n\t\t\t\t\t\t\tFROM\n\t\t\t\t\t\t\t\tmaterias\n\t\t\t\t\t\t\tWHERE\n\t\t\t\t\t\t\t\tUPPER(materias.nombre_m) LIKE UPPER(?) \n\t\t\t\t\t\t\tORDER BY\n\t\t\t\t\t\t\t\tnombre_m;\n\t\t\t\t        ";
						values = ["%" + req.query.data + "%"];
						break;
					}

				case "c":
					{
						query = "\n\t\t\t\t\t\t\tSELECT \n\t\t\t\t\t\t\t\tmaterias.id_m,\n\t\t\t\t\t\t\t\tmaterias.nombre_m as materia\n\t\t\t\t\t\t\t\tFROM docentes INNER JOIN docente_materia\n\t\t\t\t\t\t\t\t\tON docentes.id_d = docente_materia.id_d INNER JOIN cursos\n\t\t\t\t\t\t\t\t\tON docente_materia.id_dm = cursos.id_dm INNER JOIN estudiantes\n\t\t\t\t\t\t\t\t\tON cursos.id_e = estudiantes.id_e INNER JOIN notas\n\t\t\t\t\t\t\t\t\tON cursos.id_c = notas.id_c INNER JOIN grados\n\t\t\t\t\t\t\t\t\tON estudiantes.id_gra = grados.id_gra INNER JOIN materias\n\t\t\t\t\t\t\t\t\tON docente_materia.id_m = materias.id_m\n\t\t\t\t\t\t\tWHERE \n\t\t\t\t\t\t\t\tdocentes.id_d = ? \n\t\t\t\t\t\t\t\tAND grados.id_gra = ?\n\t\t\t\t\t\t\t\tAND (SELECT count(*) FROM anio) = notas.id_anio\n\t\t\t\t\t\t\tORDER BY nombre_m;\n\t\t\t\t        ";
						values = [tokenDecoded.id, req.query.id_gra];
						break;
					}

				default:
					res.status(403).send("No tienes permiso");
					break;
			}
			mysql.query(query, values).then(function (materias) {
				res.status(200).send(materias);
			}).catch(function (error) {
				res.status(404).send(error);
			});
		}, // Listo
		"post": function post(req, res) {
			var tokenDecoded = req.data;
			var values = [];
			switch (tokenDecoded.flag) {
				case "a":
				case "b":
					query = "\n\t\t\t\t\t\t\tINSERT INTO\n\t\t\t\t\t\t\t\tgrupos\n\t\t\t\t\t\t\tVALUES(\n\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t?,\n\t\t\t\t\t\t\t\t?\n\t\t\t\t\t\t\t)\n\t\t\t\t        ";
					values = [req.body.nombre, req.body.descripcion];
					break;

				default:
					res.status(403).send("No tienes permiso");
					break;
			}
			mysql.query(query, values).then(function (grupo) {
				res.status(200);
			}).catch(function (error) {
				res.status(404).send(error);
			});
		}, // Listo
		"put": function put(req, res) {
			var tokenDecoded = req.data;
			var values = [];
			switch (tokenDecoded.flag) {
				case "a":
				case "b":
					query = "\n\t\t\t\t            UPDATE materias SET\n\t\t\t\t\t            nombre_m = ?\n\t\t\t\t            WHERE id_m = ?\n\t\t\t\t        ";
					values = [req.body.nombre, req.body.id];
					break;

				default:
					res.status(403).send("No tienes permiso");
					break;
			}
			mysql.query(query).then(function (s) {
				res.status(200).send(s);
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
					query = "\n\t\t\t\t        \tDELETE FROM materias \n\t\t\t\t        \tWHERE id_m = ?\n\t\t\t\t    \t";
					values = [req.query.id_m];
					break;

				default:
					res.status(403).send("No tienes permiso");
					break;
			}
			mysql.query(query, values).then(function (materia) {
				res.status(200);
			}).catch(function (error) {
				res.status(404).send(error);
			});
		} // Listo
	};
};