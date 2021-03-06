"use strict";

module.exports = function (mysql) {
	var query = "";

	return {
		"get": function get(req, res) {
			var tokenDecoded = req.data;
			var values = [];
			values = [req.query.id_dm];
			switch (tokenDecoded.flag) {
				// Si somos admin o moderador hacemos una busqueda entre todos los grupos
				case "a":
				case "b":
					{
						query = "\n\t\t\t\t\t\tSELECT \n\t\t\t\t\t\t\tid_c as id,\n\t\t\t\t\t\t\tCONCAT(nombres_d, ' ', apellidos_d) as docente,\n\t\t\t\t\t\t\tapellidos_d,\n\t\t\t\t\t\t\tnombre_m as materia,\n\t\t\t\t\t\t\tCONCAT(nombres_e, ' ', apellidos_e) as estudiante\n\t\t\t\t\t\tFROM cursos\n\t\t\t\t\t\t  INNER JOIN estudiantes\n\t\t\t\t\t\t    ON cursos.id_e = estudiantes.id_e\n\t\t\t\t\t\t  INNER JOIN docente_materia\n\t\t\t\t\t\t    ON cursos.id_dm = docente_materia.id_dm\n\t\t\t\t\t\t  INNER JOIN docentes\n\t\t\t\t\t\t  \tON docente_materia.id_d = docentes.id_d\n\t\t\t\t\t\t  INNER JOIN materias\n\t\t\t\t\t\t  \tON docente_materia.id_m = materias.id_m\n\t\t\t\t\t\tWHERE \n\t\t\t\t\t\t\t(\n\t\t\t\t\t\t\t\tUPPER(nombres_d) LIKE UPPER(?) OR \n\t\t\t\t\t\t\t\tUPPER(apellidos_d) LIKE UPPER(?) OR \n\t\t\t\t\t\t\t\tcedula_d LIKE ? \n\t\t\t\t\t\t\t)\n\t\t\t\t\t\tORDER BY\n\t\t\t\t\t\t\tnombres_d;\n\t\t\t\t\t\t;\n\t\t\t\t\t";
						values = ["%" + req.query.data + "%", "%" + req.query.data + "%", "%" + req.query.data + "%"];
						break;
					}

				// Si somos un docente normal retornamos los cursos de nuestro estudiantes
				case "c":
					{
						query = "\n\t\t\t\t\t\tSELECT \n\t\t\t\t\t\t\tmaterias.id_m,\n\t\t\t\t\t\t\tnombres_e,\n\t\t\t\t\t\t\tnombre_m,\n\t\t\t\t\t\t\tgrado,\n\t\t\t\t\t\t\tseccion\n\t\t\t\t\t\tFROM docentes\n\t\t\t\t\t\t  INNER JOIN docente_materia\n\t\t\t\t\t\t\tON docentes.id_d = docente_materia.id_d\n\t\t\t\t\t\t  INNER JOIN cursos \n\t\t\t\t\t\t\tON docente_materia.id_dm = cursos.id_dm\n\t\t\t\t\t\t  INNER JOIN estudiantes\n\t\t\t\t\t\t\tON cursos.id_e = estudiantes.id_e\n\t\t\t\t\t\t  INNER JOIN grados\n\t\t\t\t\t\t\tON estudiantes.id_gra = grados.id_gra\n\t\t\t\t\t\t  INNER JOIN materias\n\t\t\t\t\t\t\tON docente_materia.id_m = materias.id_m\n\t\t\t\t\t\t  INNER JOIN notas\n\t\t\t\t\t\t  \tON cursos.id_c = notas.id_c\n\t\t\t\t\t\tWHERE \n\t\t\t\t\t\t\tdocentes.id_d = ?\n\t\t\t\t\t\t\tAND grados.id_gra = ?\n\t\t\t\t\t\t\tAND (SELECT count(*) FROM anio) = notas.id_anio\n\t\t\t\t\t\tORDER BY grado, seccion\n\t\t\t\t\t";
						values = [tokenDecoded.id, req.query.id_gra];
						break;
					}

				default:
					res.status(403).send("No tienes permiso");
					break;
			}
			mysql.query(query, values).then(function (curso) {
				console.log(curso);
				res.status(200).send(curso);
			}).catch(function (error) {
				res.status(404).send(error);
			});
		},
		"post": function post(req, res) {
			var tokenDecoded = req.data;
			var values = [];
			query = "\n\t\t\t\t\tINSERT INTO cursos VALUES (\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t?,\n\t\t\t\t\t\t?\n\t\t\t\t\t)\n\t\t\t\t";
			values = [req.body.id_dm, req.body.id_e];
			mysql.query(query, values).then(function (curso) {
				res.status(200).send(curso);
			}).catch(function (error) {
				res.status(404).send(error);
			});
		}, // Listo
		"put": function put(req, res) {
			var tokenDecoded = req.data;
			var values = [];
			query = "\n\t\t\t\t\tUPDATE cursos SET \n\t\t\t\t\tid_dm = ?,\n\t\t\t\t\tid_e = ?\n\t\t\t\t";
			values = [req.query.id_dm, req.query.id_e];
			mysql.query(query, values).then(function (curso) {
				res.status(200).send(curso);
			}).catch(function (error) {
				res.status(404).send(error);
			});
		}, // Listo
		"delete": function _delete(req, res) {
			var values = [];
			query = "\n\t\t\t\t\tDELETE FROM cursos WHERE id_c = ?;\n\t\t\t\t";
			values = [req.query.id];
			mysql.query(query, values).then(function (curso) {
				res.status(200).send(curso);
			}).catch(function (error) {
				res.status(404).send(error);
			});
		} // Listo
	};
};