"use strict";

var _services = require("../services");

var _services2 = _interopRequireDefault(_services);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (mysql) {
	var query = "";

	return {
		"get": function get(req, res) {
			var tokenDecoded = req.data;
			if (tokenDecoded.type === "e") {
				query = "\n\t\t            SELECT id_e as id,\n\t\t            \tnombres_e as nombres,\n\t\t\t            apellidos_e as apellidos,\n\t\t\t            flag_e as flag\n\t\t            FROM estudiantes\n\t\t            WHERE id_e = " + tokenDecoded.id + ";\n\t\t        ";
			} else if (tokenDecoded.type === "d") {
				query = "\n\t\t            SELECT id_d as id,\n\t\t            \tnombres_d as nombres,\n\t\t\t            apellidos_d as apellidos,\n\t\t\t            flag_e as flag\n\t\t            FROM docentes\n\t\t            WHERE id_d = " + tokenDecoded.id + ";\n\t\t        ";
			}
			mysql.query(query).then(function (row) {
				if (row.length >= 1) {
					var data = {
						"token": req.params.token,
						"nombres": row[0].nombres,
						"apellidos": row[0].apellidos,
						"type": tokenDecoded.type,
						"flag": row[0].flag
					};
					res.status(200).send(data);
				}
			}).catch(function (error) {
				res.status(401).send({ "message": "Error, ingrese de nuevo" });
			});
		},
		"post": function post(req, res) {
			var userData = req.body;
			userData.type = req.params.token;
			switch (userData.type) {
				case "e":
					query = "\n\t\t\t            SELECT id_e as id,\n\t\t\t            \tnombres_e as nombres,\n\t\t\t\t            apellidos_e as apellidos,\n\t\t\t\t            flag_e as flag\n\t\t\t            FROM estudiantes\n\t\t\t            WHERE user_e = '" + userData.user + "' AND pass_e = '" + userData.pass + "';\n\t\t\t        ";
					break;
				case "d":
					query = "\n\t\t\t            SELECT id_d as id,\n\t\t\t            \tnombres_d as nombres,\n\t\t\t\t            apellidos_d as apellidos,\n\t\t\t\t            flag_d as flag\n\t\t\t            FROM docentes\n\t\t\t            WHERE user_d = '" + userData.user + "' AND pass_d = '" + userData.pass + "';\n\t\t\t        ";
					break;
				default:
					res.status(404).send({ message: "Error, ingrese de nuevo" });
					break;
			}
			mysql.query(query).then(function (row) {
				if (row.length >= 1) {
					var token = _services2.default.createToken({
						"id": row[0].id,
						"type": userData.type,
						"flag": row[0].flag
					}, {
						"time": 1,
						"type": "days"
					});
					console.log(token);
					var data = {
						"token": token,
						"nombres": row[0].nombres,
						"apellidos": row[0].apellidos,
						"type": userData.type,
						"flag": row[0].flag
					};
					res.status(200).send(data);
				}
			}).catch(function (error) {
				res.status(404).send(error);
			});
		}
	};
};