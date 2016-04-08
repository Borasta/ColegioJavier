"use strict";

module.exports = function (mysql) {
	var query = "";

	return {
		"get": function get(req, res) {
			var tokenDecoded = req.data;
			var values = [];
			switch (tokenDecoded.type) {
				// Si somos estudiantes nos retorna nuestros grupos,
				case "e":
					{
						query = "\n\t\t\t\t\t\t\tSELECT \n\t\t\t\t\t\t\t\tgrupos.nombre_gru as nombre, \n\t\t\t\t\t\t\t\tgrupos.descripcion_gru as descripcion\n\t\t\t\t\t\t\tFROM estudiantes INNER JOIN miembros\n\t\t\t\t\t\t\t\tON estudiantes.id_e = miembros.id_e INNER JOIN grupos\n\t\t\t\t\t\t\t\tON miembros.id_gru = grupos.id_gru\n\t\t\t\t\t\t\tWHERE estudiantes.id_e = ?;\n\t\t\t\t\t\t";
						values = [tokenDecoded.id];
						break;
					}

				// Si somos un docente verificamos que flag tenemos
				case "d":
					{
						switch (tokenDecoded.flag) {
							// Si somos admin o moderador hacemos una busqueda entre todas las secciones
							case "a":
							case "b":
								{
									query = "\n\t\t\t\t\t\t\t\t\tSELECT \n\t\t\t\t\t\t\t\t\t\tseccion\n\t\t\t\t\t\t\t\t\tFROM secciones;\n\t\t\t\t\t\t\t\t";
									break;
								}

							// Si somos un docente normal retornamos las secciones en la que damos clases
							// segun el grado que le enviamos y el id del docente
							case "c":
								{
									query = "\n\t\t\t\t\t\t\t\tSELECT DISTINCT \n\t\t\t\t\t\t\t\t\tgrados.id_gra,\n\t\t\t\t\t\t\t\t\tseccion\n\t\t\t\t\t\t\t\tFROM docentes\n\t\t\t\t\t\t\t\t  INNER JOIN docente_materia\n\t\t\t\t\t\t\t\t\tON docentes.id_d = docente_materia.id_d\n\t\t\t\t\t\t\t\t  INNER JOIN cursos\n\t\t\t\t\t\t\t\t\tON docente_materia.id_dm = cursos.id_dm\n\t\t\t\t\t\t\t\t  INNER JOIN estudiantes\n\t\t\t\t\t\t\t\t\tON cursos.id_e = estudiantes.id_e\n\t\t\t\t\t\t\t\t  INNER JOIN grados\n\t\t\t\t\t\t\t\t\tON estudiantes.id_gra = grados.id_gra\n\t\t\t\t\t\t\t\t  INNER JOIN notas\n\t\t\t\t\t\t\t\t  \tON cursos.id_c = notas.id_c\n\t\t\t\t\t\t\t\tWHERE \n\t\t\t\t\t\t\t\t\tdocentes.id_d = ?\n\t\t\t\t\t\t\t\t\tAND grados.grado = ?\n\t\t\t\t\t\t\t\tORDER BY grado\n\t\t\t\t\t\t\t";
									values = [tokenDecoded.id, req.query.grado];
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

			mysql.query(query, values).then(function (grupos) {
				if (grupos.length >= 1) {
					console.log(grupos);
					res.status(200).send(grupos);
				}
			}).catch(function (error) {
				res.status(404).send(error);
			});
		}, // Listo
		"post": function post(req, res) {
			var values = [];
			query = "\n\t\t            INSERT INTO grupos VALUES ( \n\t\t\t            null, \n\t\t\t            ?, \n\t\t\t            ? \n\t\t            );\n\t\t        ";
			values = [req.body.nombre, req.body.descripcion];
			mysql.query(query).then(function (grupo) {
				res.status(200).send(grupo);
			}).catch(function (error) {
				res.status(404).send(error);
			});
		}, // Listo
		"put": function put(req, res) {
			var values = [];
			query = "\n\t\t            UPDATE grupos SET\n\t\t\t            nombre_gru = ?, \n\t\t\t            descripcion_gru = ? \n\t\t            ;\n\t\t        ";
			values = [req.query.nombre, req.query.descripcion];
			mysql.query(query, values).then(function (grupo) {
				res.status(200).send(grupo);
			}).catch(function (error) {
				res.status(404).send(error);
			});
		}, // Listo
		"delete": function _delete(req, res) {
			var values = [];
			query = "\n\t\t            DELETE FROM grupos\n\t\t            WHERE\n\t\t            \tid_gru = ? \n\t\t        ";
			values = [req.query.id];
			mysql.query(query, values).then(function (grupo) {
				res.status(200).send(grupo);
			}).catch(function (error) {
				res.status(404).send(error);
			});
		} // Listo
	};
};