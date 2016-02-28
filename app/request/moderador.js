"use strict";

module.exports = function (mysql) {
	var query = "";

	return {
		"docentes": {
			"get": function get(req, res) {
				var tokenDecoded = req.data;
				switch (tokenDecoded.flag) {
					case "a":
						query = "\n\t\t\t\t        \tSELECT \n\t\t\t\t\t          \tid_d AS id, \n\t\t\t\t\t          \tnombres_d AS nombres, \n\t\t\t\t\t          \tapellidos_d AS apellidos, \n\t\t\t\t\t          \tcedula_d AS cedula, \n\t\t\t\t\t          \tgenero_d AS genero,\n\t\t\t\t\t          \tuser_d AS usuario\n\t\t\t\t\t        FROM \n\t\t\t\t\t        \tdocentes \n\t\t\t\t\t        WHERE \n\t\t\t\t\t        \tUPPER(" + req.query.type + "_d) LIKE UPPER('%" + req.query.data + "%')\n\t\t\t\t\t        ORDER BY \n\t\t\t\t\t        \tnombres_d;\n\t\t\t\t    \t";
						break;

					case "b":
						query = "\n\t\t\t\t\t\t\tSELECT\n\t\t\t\t\t\t\t\tid_d AS id,\n\t\t\t\t\t\t\t\tnombres_d AS nombres,\n\t\t\t\t\t\t\t\tapellidos_d AS apellidos,\n\t\t\t\t\t\t\t\tcedula_d AS cedula,\n\t\t\t\t\t\t\t\tgenero_d AS genero,\n\t\t\t\t\t\t\t\tuser_d AS usuario\n\t\t\t\t\t\t\tFROM\n\t\t\t\t\t\t\t\tdocentes\n\t\t\t\t\t\t\tWHERE\n\t\t\t\t\t\t\t\tUPPER(" + req.query.type + "_d) LIKE UPPER('%" + req.query.data + "%') AND NOT flag_d = 'b' AND NOT flag_d = 'a'\n\t\t\t\t\t\t\tORDER BY\n\t\t\t\t\t\t\t\tnombres_d;\n\t\t\t\t        ";
						break;

					default:
						res.status(403).send("No tienes permiso");
						break;
				}
				console.log(query);
				mysql.query(query).then(function (docentes) {
					console.log(docentes);
					res.status(200).send(docentes);
				}).catch(function (error) {
					res.status(404).send(error);
				});
			},
			"post": function post(req, res) {
				var tokenDecoded = req.data;
				switch (tokenDecoded.flag) {
					case "a":
						query = "\n\t\t\t\t            INSERT INTO representantes VALUES ( \n\t\t\t\t\t            null, \n\t\t\t\t\t            '" + req.body.nombres + "', \n\t\t\t\t\t            '" + req.body.apellidos + "', \n\t\t\t\t\t            " + req.body.cedula + ", \n\t\t\t\t\t            '" + req.body.genero + "',\n\t\t\t\t\t            '" + req.body.user + "',\n\t\t\t\t\t            '" + req.body.pass + "',\n\t\t\t\t\t            'c'\n\t\t\t\t            );\n\t\t\t\t        ";
						break;

					case "b":
						query = "\n\t\t\t\t            INSERT INTO representantes VALUES ( \n\t\t\t\t\t            null, \n\t\t\t\t\t            '" + req.body.nombres + "', \n\t\t\t\t\t            '" + req.body.apellidos + "', \n\t\t\t\t\t            " + req.body.cedula + ", \n\t\t\t\t\t            '" + req.body.genero + "',\n\t\t\t\t\t            '" + req.body.user + "',\n\t\t\t\t\t            '" + req.body.pass + "',\n\t\t\t\t\t            'c'\n\t\t\t\t            );\n\t\t\t\t        ";
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
			},
			"put": function put(req, res) {
				var tokenDecoded = req.data;
				query = "\n\t\t            UPDATE representantes SET\n\t\t\t            nombres_r = '" + req.query.nombres + "', \n\t\t\t            apellidos_r = '" + req.query.apellidos + "', \n\t\t\t            cedula_r = " + req.query.cedula + ", \n\t\t\t            genero_r = '" + req.query.genero + "',\n\t\t\t            user_r = '" + req.query.genero + "'\n\t\t            WHERE id_r = " + req.query.id + " AND flag_d NOT 'b' AND flag_d NOT 'a'\n\t\t            ;\n\t\t        ";
				mysql.query(query).then(function (s) {
					res.status(200).send(s);
				}).catch(function (error) {
					res.status(404).send(error);
				});
			},
			"delete": function _delete(req, res) {
				console.log("aqui toy");
				var tokenDecoded = req.data;
				query = "\n\t\t            DELETE FROM representantes WHERE id_r = " + req.query.id + ";\n\t\t        ";
				mysql.query(query).then(function (s) {
					res.status(200).send(s);
				}).catch(function (error) {
					res.status(404).send(error);
				});
			}
		},
		"alumnos": {
			"get": function get(req, res) {},
			"post": function post(req, res) {},
			"put": function put(req, res) {},
			"delete": function _delete(req, res) {}
		},
		"representantes": {
			"get": function get(req, res) {
				var tokenDecoded = req.data;
				query = "\n\t\t            SELECT \n\t\t            \tid_r as id, \n\t\t            \tnombres_r as nombres, \n\t\t            \tapellidos_r as apellidos, \n\t\t            \tcedula_r as cedula, \n\t\t            \tgenero_r as genero \n\t\t            FROM representantes WHERE upper(" + req.query.type + "_r) LIKE upper('%" + req.query.data + "%') \n\t\t            ORDER BY nombres_r;\n\t\t        ";
				mysql.query(query).then(function (representantes) {
					console.log(representantes);
					res.status(200).send(representantes);
				}).catch(function (error) {
					res.status(404).send(error);
				});
			},
			"post": function post(req, res) {
				var tokenDecoded = req.data;
				query = "\n\t\t            INSERT INTO representantes VALUES ( \n\t\t\t            null, \n\t\t\t            '" + req.body.nombres + "', \n\t\t\t            '" + req.body.apellidos + "', \n\t\t\t            " + req.body.cedula + ", \n\t\t\t            '" + req.body.genero + "' \n\t\t            );\n\t\t        ";
				mysql.query(query).then(function (s) {
					res.status(200).send(s);
				}).catch(function (error) {
					res.status(404).send(error);
				});
			},
			"put": function put(req, res) {
				var tokenDecoded = req.data;
				query = "\n\t\t            UPDATE representantes SET\n\t\t\t            nombres_r = '" + req.query.nombres + "', \n\t\t\t            apellidos_r = '" + req.query.apellidos + "', \n\t\t\t            cedula_r = " + req.query.cedula + ", \n\t\t\t            genero_r = '" + req.query.genero + "' \n\t\t            WHERE id_r = " + req.query.id + "\n\t\t            ;\n\t\t        ";
				mysql.query(query).then(function (s) {
					res.status(200).send(s);
				}).catch(function (error) {
					res.status(404).send(error);
				});
			},
			"delete": function _delete(req, res) {
				console.log("aqui toy");
				var tokenDecoded = req.data;
				query = "\n\t\t            DELETE FROM representantes WHERE id_r = " + req.query.id + ";\n\t\t        ";
				mysql.query(query).then(function (s) {
					res.status(200).send(s);
				}).catch(function (error) {
					res.status(404).send(error);
				});
			}
		},
		"materias": {
			"get": function get(req, res) {},
			"post": function post(req, res) {},
			"put": function put(req, res) {},
			"delete": function _delete(req, res) {}
		},
		"horarios": {
			"get": function get(req, res) {},
			"post": function post(req, res) {},
			"put": function put(req, res) {},
			"delete": function _delete(req, res) {}
		},
		"cursos": {
			"get": function get(req, res) {},
			"post": function post(req, res) {},
			"put": function put(req, res) {},
			"delete": function _delete(req, res) {}
		}
	};
};