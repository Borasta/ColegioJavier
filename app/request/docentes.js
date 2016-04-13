"use strict";

module.exports = function (mysql) {
	var query = "";

	return {
		"get": function get(req, res) {
			var tokenDecoded = req.data;
			var values = [];
			switch (tokenDecoded.flag) {
				// Si somos admins retornamos cualquier docente admin o moderador
				case "a":
					{
						query = "\n\t\t\t\t\t\t\tSELECT\n\t\t\t\t\t\t\t\tid_d AS id,\n\t\t\t\t\t\t\t\tnombres_d AS nombres,\n\t\t\t\t\t\t\t\tapellidos_d AS apellidos,\n\t\t\t\t\t\t\t\tcedula_d AS cedula,\n\t\t\t\t\t\t\t\tgenero_d AS genero,\n\t\t\t\t\t\t\t\tuser_d AS usuario,\n\t\t\t\t\t\t\t\tflag_d as flag\n\t\t\t\t\t\t\tFROM\n\t\t\t\t\t\t\t\tdocentes\n\t\t\t\t\t\t\tWHERE\n\t\t\t\t\t\t\t\t(\n\t\t\t\t\t\t\t\t\tUPPER(CONCAT(nombres_d, ' ', apellidos_d)) LIKE UPPER(?) OR \n\t\t\t\t\t\t\t\t\tcedula_d LIKE ? \n\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\tORDER BY\n\t\t\t\t\t\t\t\tnombres_d;\n\t\t\t\t        ";
						values = ["%" + req.query.data + "%", "%" + req.query.data + "%"];
						break;
					}

				// Si somos moderador retornamos cualquier docente
				case "b":
					{
						query = "\n\t\t\t\t\t\t\tSELECT\n\t\t\t\t\t\t\t\tid_d AS id,\n\t\t\t\t\t\t\t\tnombres_d AS nombres,\n\t\t\t\t\t\t\t\tapellidos_d AS apellidos,\n\t\t\t\t\t\t\t\tcedula_d AS cedula,\n\t\t\t\t\t\t\t\tgenero_d AS genero,\n\t\t\t\t\t\t\t\tuser_d AS usuario\n\t\t\t\t\t\t\tFROM\n\t\t\t\t\t\t\t\tdocentes\n\t\t\t\t\t\t\tWHERE\n\t\t\t\t\t\t\t\t(\n\t\t\t\t\t\t\t\t\tUPPER(nombres_d) LIKE UPPER(?) OR \n\t\t\t\t\t\t\t\t\tUPPER(apellidos_d) LIKE UPPER(?) OR \n\t\t\t\t\t\t\t\t\tcedula_d LIKE ? \n\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\tAND NOT flag_d = 'b' \n\t\t\t\t\t\t\t\tAND NOT flag_d = 'a'\n\t\t\t\t\t\t\t\tAND NOT id_d = ?\n\t\t\t\t\t\t\tORDER BY\n\t\t\t\t\t\t\t\tnombres_d;\n\t\t\t\t        ";
						values = ["%" + req.query.data + "%", "%" + req.query.data + "%", "%" + req.query.data + "%", tokenDecoded.id];
						break;
					}

				// Si somos docentes retornamos nuestros datos
				case "c":
					{
						query = "\n\t\t\t\t\t\t\tSELECT docentes.nombres_d as nombres,\n\t\t\t\t\t\t\t\tdocentes.apellidos_d as apellidos,\n\t\t\t\t\t\t\t\tdocentes.cedula_d as cedula,\n\t\t\t\t\t\t\t\tdocentes.genero_d as genero,\n\t\t\t\t\t\t\t\tdocentes.user_d as usuario\n\t\t\t\t\t\t\tFROM docentes\n\t\t\t\t\t\t\tWHERE docentes.id_d = ?;\n\t\t\t\t\t\t";
						values = [tokenDecoded.id];
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
					{
						query = "\n\t\t\t\t            INSERT INTO docentes VALUES ( \n\t\t\t\t\t            null, \n\t\t\t\t\t            '" + req.body.nombres + "', \n\t\t\t\t\t            '" + req.body.apellidos + "', \n\t\t\t\t\t            " + req.body.cedula + ", \n\t\t\t\t\t            '" + req.body.genero + "',\n\t\t\t\t\t            '" + req.body.user + "',\n\t\t\t\t\t            '" + req.body.pass + "',\n\t\t\t\t\t            '" + req.body.flag + "'\n\t\t\t\t            );\n\t\t\t\t        ";
						break;
					}

				case "b":
					{
						query = "\n\t\t\t\t            INSERT INTO docentes VALUES ( \n\t\t\t\t\t            null, \n\t\t\t\t\t            '" + req.body.nombres + "', \n\t\t\t\t\t            '" + req.body.apellidos + "', \n\t\t\t\t\t            " + req.body.cedula + ", \n\t\t\t\t\t            '" + req.body.genero + "',\n\t\t\t\t\t            '" + req.body.user + "',\n\t\t\t\t\t            '" + req.body.pass + "',\n\t\t\t\t\t            'c'\n\t\t\t\t            );\n\t\t\t\t        ";
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