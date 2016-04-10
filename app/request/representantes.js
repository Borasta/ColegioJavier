"use strict";

module.exports = function (mysql) {
	var query = "";

	return {
		"get": function get(req, res) {
			query = "\n\t\t            SELECT \n\t\t            \tid_r as id, \n\t\t            \tnombres_r as nombres, \n\t\t            \tapellidos_r as apellidos, \n\t\t            \tcedula_r as cedula, \n\t\t            \tgenero_r as genero \n\t\t            FROM representantes \n\t\t            WHERE \n\t\t            \tupper(nombres_r) LIKE upper(?) OR\n\t\t            \tupper(nombres_r) LIKE upper(?) OR\n\t\t            \tcedula_r LIKE ? \n\t\t            ORDER BY nombres_r;\n\t\t        ";
			var values = ["%" + req.query.data + "%", "%" + req.query.data + "%", "%" + req.query.data + "%"];
			mysql.query(query, values).then(function (representantes) {
				console.log(representantes);
				res.status(200).send(representantes);
			}).catch(function (error) {
				res.status(404).send(error);
			});
		},
		"post": function post(req, res) {
			query = "\n\t\t            INSERT INTO representantes VALUES ( \n\t\t\t            null, \n\t\t\t            '" + req.body.nombres + "', \n\t\t\t            '" + req.body.apellidos + "', \n\t\t\t            " + req.body.cedula + ", \n\t\t\t            '" + req.body.genero + "' \n\t\t            );\n\t\t        ";
			mysql.query(query).then(function (s) {
				res.status(200).send(s);
			}).catch(function (error) {
				res.status(404).send(error);
			});
		},
		"put": function put(req, res) {

			query = "\n\t\t            UPDATE representantes SET\n\t\t\t            nombres_r = '" + req.query.nombres + "', \n\t\t\t            apellidos_r = '" + req.query.apellidos + "', \n\t\t\t            cedula_r = " + req.query.cedula + ", \n\t\t\t            genero_r = '" + req.query.genero + "' \n\t\t            WHERE id_r = " + req.query.id + "\n\t\t            ;\n\t\t        ";
			mysql.query(query).then(function (s) {
				res.status(200).send(s);
			}).catch(function (error) {
				res.status(404).send(error);
			});
		},
		"delete": function _delete(req, res) {
			query = "\n\t\t            DELETE FROM representantes WHERE id_r = " + req.query.id + ";\n\t\t        ";
			mysql.query(query).then(function (s) {
				res.status(200).send(s);
			}).catch(function (error) {
				res.status(404).send(error);
			});
		}
	};
};