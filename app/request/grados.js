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
						query = "\n\t\t\t\t\t\t\tSELECT \n\t\t\t\t\t\t\t\tgrados.grado,\n\t\t\t\t\t\t\t\tgrados.seccion\n\t\t\t\t\t\t\tFROM estudiantes INNER JOIN grados\n\t\t\t\t\t\t\t\tON estudiantes.id_gra = grados.id_gra\n\t\t\t\t\t\t\tWHERE estudiantes.id_e = ?;\n\t\t\t\t\t\t";
						values = [tokenDecoded.id];
						mysql.query(query, values).then(function (grado) {
							if (grado.length >= 1) {
								res.status(200).send(grado[0]);
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
							// Si somos admin o moderador hacemos una busqueda entre todos los grupos
							case "a":
							case "b":
								{
									query = "\n\t\t\t\t\t\t\t\tSELECT DISTINCT\n\t\t\t\t\t\t\t\t  grado\n\t\t\t\t\t\t\t\tFROM grados\n\t\t\t\t\t\t\t";
									break;
								}

							// Si somos un docente normal retornamos los grados en los que damos clases
							case "c":
								{
									query = "\n\t\t\t\t\t\t\t\t\tSELECT DISTINCT \n\t\t\t\t\t\t\t\t\t\tgrado\n\t\t\t\t\t\t\t\t\tFROM docentes\n\t\t\t\t\t\t\t\t\t  INNER JOIN docente_materia\n\t\t\t\t\t\t\t\t\t\tON docentes.id_d = docente_materia.id_d\n\t\t\t\t\t\t\t\t\t  INNER JOIN cursos \n\t\t\t\t\t\t\t\t\t  \tON docente_materia.id_dm = cursos.id_dm\n\t\t\t\t\t\t\t\t\t  INNER JOIN estudiantes\n\t\t\t\t\t\t\t\t\t  \tON cursos.id_e = estudiantes.id_e\n\t\t\t\t\t\t\t\t\t  INNER JOIN grados\n\t\t\t\t\t\t\t\t\t  \tON estudiantes.id_gra = grados.id_gra\n\t\t\t\t\t\t\t\t\t  INNER JOIN notas\n\t\t\t\t\t\t\t\t\t  \tON cursos.id_c = notas.id_c\n\t\t\t\t\t\t\t\t\tWHERE \n\t\t\t\t\t\t\t\t\t\tdocentes.id_d = ? \n\t\t\t\t\t\t\t\t\t\tAND (SELECT count(*) FROM anio) = notas.id_anio\n\t\t\t\t\t\t\t\t\tORDER BY grado\n\t\t\t\t\t\t\t\t";
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