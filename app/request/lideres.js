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
							// Si somos admin o moderador hacemos una busqueda entre todos los grupos
							case "a":
							case "b":
								{
									query = "\n\t\t\t\t\t\t\t\t\tSELECT \n\t\t\t\t\t\t\t\t\t\tgrupos.nombre_gru as nombre, \n\t\t\t\t\t\t\t\t\t\tgrupos.descripcion_gru as descripcion\n\t\t\t\t\t\t\t\t\tFROM \n\t\t\t\t\t\t\t\t\t\tgrupos\n\t\t\t\t\t\t\t\t\tWHERE \n\t\t\t\t\t\t\t\t\t\tupper(nombre_gru) LIKE upper(?) \n\t\t            \t\t\t\tORDER BY \n\t\t            \t\t\t\t\tnombre_gru;\n\t\t\t\t\t\t\t\t";
									values = ["%" + (req.query.data || '') + "%"];
									break;
								}

							// Si somos un docente normal retornamos nuestro grupos
							case "c":
								{
									query = "\n\t\t\t\t\t\t\t\t\tSELECT \n\t\t\t\t\t\t\t\t\t\tgrupos.nombre_gru as nombre, \n\t\t\t\t\t\t\t\t\t\tgrupos.descripcion_gru as descripcion\n\t\t\t\t\t\t\t\t\tFROM docentes INNER JOIN lideres\n\t\t\t\t\t\t\t\t\t\tON docentes.id_d = lideres.id_d INNER JOIN grupos\n\t\t\t\t\t\t\t\t\t\tON lideres.id_gru = grupos.id_gru\n\t\t\t\t\t\t\t\t\tWHERE docentes.id_d = ?\n\t\t            \t\t\t\tORDER BY nombre_gru;\n\t\t\t\t\t\t\t\t";
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
					res.status(200).send(grupos);
				}
			}).catch(function (error) {
				console.log(error);
				res.status(404).send(error);
			});
		}, // Listo
		"post": function post(req, res) {
			var values = [];
			query = "\n\t\t            INSERT INTO lideres VALUES ( \n\t\t\t            ?,\n\t\t\t            (SELECT id_d FROM docentes WHERE cedula_d = ?)\n\t\t            );\n\t\t        ";
			values = [req.body.id, req.body.cedula];
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