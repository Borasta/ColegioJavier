"use strict";

module.exports = function (mysql) {
	var query = "";

	return {
		"get": function get(req, res) {
			var tokenDecoded = req.data;
			var values = [];
			switch (tokenDecoded.flag) {
				// Si somos admins retornamos cualquier docente admin o moderador
				// Si somos moderador retornamos cualquier docente
				case "a":
				case "b":
					{
						query = "\n\t\t\t\t\t\t\tSELECT DISTINCT \n\t\t\t\t\t\t\t\tdocente_materia.id_dm as id,\n\t\t\t\t\t\t\t\tnombres_d as nombres,\n\t\t\t\t\t\t\t\tapellidos_d as apellidos,\n\t\t\t\t\t\t\t\tnombre_m as materia\n\t\t\t\t\t\t\tFROM\n\t\t\t\t\t\t\t\tdocente_materia \n\t\t\t\t\t\t\t\t  INNER JOIN docentes \n\t\t\t\t\t\t\t\t\tON docente_materia.id_d = docentes.id_d\n\t\t\t\t\t\t\t\t  INNER JOIN materias\n\t\t\t\t\t\t\t\t    ON docente_materia.id_m = materias.id_m\n\t\t\t\t\t\t\tWHERE\n\t\t\t\t\t\t\t\t(\n\t\t\t\t\t\t\t\t\tUPPER(nombres_d) LIKE UPPER(?) OR \n\t\t\t\t\t\t\t\t\tUPPER(apellidos_d) LIKE UPPER(?) OR \n\t\t\t\t\t\t\t\t\tcedula_d LIKE ? \n\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\tORDER BY\n\t\t\t\t\t\t\t\tnombres_d;\n\t\t\t\t        ";
						values = ["%" + req.query.data + "%", "%" + req.query.data + "%", "%" + req.query.data + "%", tokenDecoded.id];
						break;
					}

				default:
					res.status(403).send("No tienes permiso");
					break;
			}
			mysql.query(query, values).then(function (docentes) {
				if (tokenDecoded.flag == "c") res.status(200).send(docentes[0]);else res.status(200).send(docentes);
			}).catch(function (error) {
				res.status(404).send(error);
			});
		}, // Listo
		"post": function post(req, res) {
			var tokenDecoded = req.data;
			switch (tokenDecoded.flag) {
				case "a":
				case "b":
					{
						var _ret = function () {
							query = "\n\t\t\t\t    \t\tINSERT INTO docente_materia\n\t\t\t\t    \t\tVALUES (\n\t\t\t\t    \t\t  \tnull,\n\t\t\t\t    \t\t  \t(\n\t\t\t\t    \t\t  \t\tSELECT id_d FROM docentes \n\t\t\t\t    \t\t  \t\tWHERE cedula_d = ? AND \n\t\t\t\t    \t\t  \t\t(NOT flag_d = 'a' AND NOT flag_d = 'b')\n\t\t\t\t    \t\t  \t),\n\t\t\t\t    \t\t  \t?\n\t\t\t\t    \t\t);\n\t\t\t\t        ";
							var values = [req.body.cedula, req.body.id_m];

							mysql.query(query, values).then(function (s) {
								query = "\n\t\t\t\t\t\t\t\tINSERT INTO horarios\n\t\t\t\t\t\t\t\tVALUES (\n\t\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t\t?,\n\t\t\t\t\t\t\t\t\t?,\n\t\t\t\t\t\t\t\t\t?,\n\t\t\t\t\t\t\t\t\t?\n\t\t\t\t\t\t\t\t);\n\t\t\t\t\t\t\t";
								values = [s.insertId, req.body.id_dia, req.body.hora_inicio, req.body.hora_final];

								mysql.query(query, values).then(function (h) {
									console.log(h);
									res.status(200).send(h);
								}).catch(function (error) {
									console.log(mysql.query);
									res.status(404).send(error);
								});
							}).catch(function (error) {
								console.log(mysql.query);
								res.status(404).send(error);
							});
							return "break";
						}();

						if (_ret === "break") break;
					}

				default:
					res.status(403).send("No tienes permiso");
					break;
			}
		}, // Listo
		"put": function put(req, res) {
			var tokenDecoded = req.data;
			var newPass = req.query.pass ? ", pass_d = '" + req.query.pass + "'" : "";
			switch (tokenDecoded.flag) {
				case "a":
					{
						query = "\n\t\t\t\t            UPDATE docentes SET\n\t\t\t\t\t            nombres_d = '" + req.query.nombres + "', \n\t\t\t\t\t            apellidos_d = '" + req.query.apellidos + "', \n\t\t\t\t\t            cedula_d = " + req.query.cedula + ", \n\t\t\t\t\t            genero_d = '" + req.query.genero + "',\n\t\t\t\t\t            user_d = '" + req.query.usuario + "'\n\t\t\t\t\t            " + newPass + ",\n\t\t\t\t\t            flag_d = '" + req.query.flag + "'\n\t\t\t\t            WHERE id_d = " + req.query.id + "\n\t\t\t\t            ;\n\t\t\t\t        ";
						break;
					}

				case "b":
					{
						query = "\n\t\t\t\t            UPDATE docentes SET\n\t\t\t\t\t            nombres_d = '" + req.query.nombres + "', \n\t\t\t\t\t            apellidos_d = '" + req.query.apellidos + "', \n\t\t\t\t\t            cedula_d = " + req.query.cedula + ", \n\t\t\t\t\t            genero_d = '" + req.query.genero + "',\n\t\t\t\t\t            user_d = '" + req.query.usuario + "'\n\t\t\t\t\t            " + newPass + "\n\t\t\t\t            WHERE id_d = " + req.query.id + " \n\t\t\t\t            AND NOT flag_d = 'b' \n\t\t\t\t            AND NOT flag_d = 'a'\n\t\t\t\t            ;\n\t\t\t\t        ";
						break;
					}

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
			var tokenDecoded = req.data;
			switch (tokenDecoded.flag) {
				case "a":
					query = "\n\t\t\t\t            DELETE FROM docentes WHERE id_d = " + req.query.id + " \n\t\t\t\t            AND NOT id_d = " + tokenDecoded.id + ";\n\t\t\t\t        ";
					break;

				case "b":
					query = "\n\t\t\t\t\t\t\tDELETE FROM docentes\n\t\t\t\t            WHERE id_d = " + req.query.id + " \n\t\t\t\t            AND NOT id_d = " + tokenDecoded.id + " \n\t\t\t\t            AND NOT flag_d = 'b' \n\t\t\t\t            AND NOT flag_d = 'a'\n\t\t\t\t            ;\n\t\t\t\t        ";
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
		} // Listo
	};
};