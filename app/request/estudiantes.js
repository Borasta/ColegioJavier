"use strict";

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (mysql) {
	var query = "";

	return {
		"get": function get(req, res) {
			var tokenDecoded = req.data;
			var values = [tokenDecoded.id];
			console.log("hola");
			switch (tokenDecoded.type) {
				// Si somos estudiantes nos retorna nuestros datos,
				// y los de nuestros padres
				case "e":
					{
						var _ret = function () {
							var data = {};
							query = "\n\t\t\t\t\t\t\tSELECT \n\t\t\t\t\t\t\t\testudiantes.nombres_e as nombres,\n\t\t\t\t\t\t\t\testudiantes.apellidos_e as apellidos,\n\t\t\t\t\t\t\t\testudiantes.fecha_nacimiento as edad,\n\t\t\t\t\t\t\t\testudiantes.cedula_e as cedula,\n\t\t\t\t\t\t\t\testudiantes.genero_e as genero,\n\t\t\t\t\t\t\t\testudiantes.direccion_e as direccion,\n\t\t\t\t\t\t\t\testudiantes.user_e as usuario,\n\t\t\t\t\t\t\t\tgrados.grado as grado,\n\t\t\t\t\t\t\t\tgrados.seccion as seccion\n\t\t\t\t\t\t\tFROM estudiantes INNER JOIN grados\n\t\t\t\t\t\t\t\tON estudiantes.id_gra = grados.id_gra\n\t\t\t\t\t\t\tWHERE estudiantes.id_e = ?;\n\t\t\t\t\t\t";
							mysql.query(query, values).then(function (estudiante) {
								if (estudiante.length == 1) {
									data.estudiante = estudiante[0];
									data.estudiante.edad = (0, _moment2.default)(data.estudiante.edad).fromNow();
									query = "\n\t\t\t\t\t\t\t\t\t\tSELECT representantes.nombres_r as nombres,\n\t\t\t\t\t\t\t\t\t\trepresentantes.apellidos_r as apellidos,\n\t\t\t\t\t\t\t\t\t\trepresentantes.cedula_r as cedula,\n\t\t\t\t\t\t\t\t\t\trepresentantes.genero_r as genero\n\t\t\t\t\t\t\t\t\t\tFROM estudiantes                          INNER JOIN familias\n\t\t\t\t\t\t\t\t\t\t\tON estudiantes.id_e = familias.id_e   INNER JOIN representantes\n\t\t\t\t\t\t\t\t\t\t\tON familias.id_r = representantes.id_r\n\t\t\t\t\t\t\t\t\t\tWHERE estudiantes.id_e = ?;\n\t\t\t\t\t\t\t\t\t";
									mysql.query(query, values).then(function (representantes) {
										if (representantes.length >= 1) {
											data.representantes = representantes;
											res.status(200).send(data);
										}
									}).catch(function (error) {
										res.status(404).send(error);
									});
								}
							}).catch(function (error) {
								res.status(404).send(error);
							});
							return "break";
						}();

						if (_ret === "break") break;
					}

				// Si somos un docente verificamos que flag tenemos
				case "d":
					{
						switch (tokenDecoded.flag) {
							// Si somos admin o moderador, buscamos entre todos los estudiantes
							case "a":
							case "b":
								{
									query = "\n\t\t\t\t\t\t\t\t\tSELECT \n\t\t\t\t\t\t\t\t\t\tid_e as id,\n\t\t\t\t\t\t\t\t\t\tnombres_e as nombres,\n\t\t\t\t\t\t\t\t\t\tapellidos_e as apellidos,\n\t\t\t\t\t\t\t\t\t\tcedula_e as cedula,\n\t\t\t\t\t\t\t\t\t\tgenero_e as genero,\n\t\t\t\t\t\t\t\t\t\tgrado as grado,\n\t\t\t\t\t\t\t\t\t\tuser_e as usuario,\n\t\t\t\t\t\t\t\t\t\tgrados.seccion as seccion\n\t\t\t\t\t\t\t\t\tFROM \n\t\t\t\t\t\t\t\t\t\testudiantes \n\t\t\t\t\t\t\t\t\t\tINNER JOIN grados\n\t\t\t\t\t\t\t\t\t\t\tON estudiantes.id_gra = grados.id_gra\n\t\t\t\t\t\t\t\t\tWHERE\n\t\t\t\t\t\t\t\t\t\tUPPER(grado) LIKE UPPER(?) OR \n\t\t\t\t\t\t\t\t\t\tUPPER(nombres_e) LIKE UPPER(?) OR \n\t\t\t\t\t\t\t\t\t\tUPPER(apellidos_e) LIKE UPPER(?) OR \n\t\t\t\t\t\t\t\t\t\tcedula_e LIKE ? \n\t\t\t\t\t\t\t\t\tORDER BY \n\t\t\t\t\t\t\t\t\t\tnombres_e;\n\t\t\t\t\t\t\t\t";
									values = ["%" + req.query.data1 + "%", "%" + req.query.data1 + "%", "%" + req.query.data1 + "%", "%" + req.query.data1 + "%"];
									break;
								}
							// Si somos docentes normales buscamos nuestros estudiantes
							case "c":
								{
									query = "\n\t\t\t\t\t\t\t\tSELECT \n\t\t\t\t\t\t\t\t\tnotas.id_c,\n\t\t\t\t\t\t\t\t\tnotas.id_anio,\n\t\t\t\t\t\t\t\t\testudiantes.nombres_e as nombres,\n\t\t\t\t\t\t\t\t\testudiantes.apellidos_e as apellidos,\n\t\t\t\t\t\t\t\t\testudiantes.cedula_e as cedula,\n\t\t\t\t\t\t\t\t\tnotas.lapso1 as 'lapso1',\n\t\t\t\t\t\t\t\t\tnotas.lapso2 as 'lapso2',\n\t\t\t\t\t\t\t\t\tnotas.lapso3 as 'lapso3',\n\t\t\t\t\t\t\t\t\tgrados.grado as grado\n\t\t\t\t\t\t\t\tFROM docentes\n\t\t\t\t\t\t\t\t  INNER JOIN docente_materia\n\t\t\t\t\t\t\t\t\tON docentes.id_d = docente_materia.id_d \n\t\t\t\t\t\t\t\t  INNER JOIN cursos\n\t\t\t\t\t\t\t\t\tON docente_materia.id_dm = cursos.id_dm \n\t\t\t\t\t\t\t\t  INNER JOIN estudiantes\n\t\t\t\t\t\t\t\t\tON cursos.id_e = estudiantes.id_e \n\t\t\t\t\t\t\t\t  INNER JOIN notas\n\t\t\t\t\t\t\t\t\tON cursos.id_c = notas.id_c \n\t\t\t\t\t\t\t\t  INNER JOIN grados\n\t\t\t\t\t\t\t\t\tON estudiantes.id_gra = grados.id_gra \n\t\t\t\t\t\t\t\t  INNER JOIN materias\n\t\t\t\t\t\t\t\t\tON docente_materia.id_m = materias.id_m\n\t\t\t\t\t\t\t\tWHERE \n\t\t\t\t\t\t\t\t\tdocentes.id_d = ? \n \t\t\t\t\t\t\t\t\tAND materias.id_m = ?\n \t\t\t\t\t\t\t\t\tAND grados.id_gra = ?\n\t\t\t\t\t\t\t\t\tAND (SELECT count(*) FROM anio) = notas.id_anio\n\t\t\t\t\t\t\t\tORDER BY grados.grado, grados.seccion, estudiantes.cedula_e;\n\t\t\t\t\t\t\t";
									values.push(req.query.id_m);
									values.push(req.query.id_gra);
									console.log(values);
									break;
								}

							default:
								{
									res.status(403).send("No tienes permiso");
									break;
								}
						}
						mysql.query(query, values).then(function (estudiantes) {
							if (estudiantes.length >= 1) {
								res.status(200).send(estudiantes);
							}
						}).catch(function (error) {
							res.status(404).send(error);
						});
						break;
					}

				default:
					{
						res.status(403).send("No tienes permiso");
						break;
					}

			}
		}, // Listo
		"post": function post(req, res) {
			var values = [];
			query = "\n\t\t\t\t\tINSERT INTO estudiantes VALUES (\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t?,\n\t\t\t\t\t\t?,\n\t\t\t\t\t\t?,\n\t\t\t\t\t\t?,\n\t\t\t\t\t\t?,\n\t\t\t\t\t\t?,\n\t\t\t\t\t\t?,\n\t\t\t\t\t\t?,\n\t\t\t\t\t\t?,\n\t\t\t\t\t\t(SELECT id_gra FROM grados WHERE grado = ? AND seccion = ?)\n\t\t\t\t\t);\n\t\t\t\t";
			values = [req.body.nombres, req.body.apellidos, req.body.cedula, req.body.fecha_nacimiento, req.body.genero, req.body.direccion, req.body.user, req.body.pass, 'c', req.body.grado, req.body.seccion];

			console.log(values);

			mysql.query(query, values).then(function (estudiante) {
				res.status(200).send(estudiante);
			}).catch(function (error) {
				res.status(404).send(error);
			});
		}, // Listo
		"put": function put(req, res) {
			var tokenDecoded = req.data;
			var values = [];
			var newPass = req.query.pass ? ", pass_d = '" + req.query.pass + "'" : "";
			query = "\n\t\t\t\t\tUPDATE estudiantes SET \n\t\t\t\t\t\tid_gra = ?,\n\t\t\t\t\t\tnombres_e = ?,\n\t\t\t\t\t\tapellidos_e = ?,\n\t\t\t\t\t\tcedula_e = ?,\n\t\t\t\t\t\tfecha_nacimiento = ?,\n\t\t\t\t\t\tgenero_e = ?,\n\t\t\t\t\t\tdireccion_e = ?,\n\t\t\t\t\t\tuser_e = ?\n\t\t\t\t\t\t" + newPass + "\n\t\t\t\t\tWHERE \n\t\t\t\t\t\tid_e = ?\n\t\t\t\t\t\n\t\t\t\t";
			values = [req.query.id_gra, req.query.nombres, req.query.apellidos, req.query.cedula, req.query.fecha_nacimiento, req.query.genero, req.query.direccion, req.query.user, tokenDecoded.id];

			mysql.query(query, values).then(function (estudiante) {
				res.status(200).send(estudiante);
			}).catch(function (error) {
				res.status(404).send(error);
			});
		}, // Listo
		"delete": function _delete(req, res) {
			var tokenDecoded = req.data;
			var values = [];
			query = "\n\t\t\t\t\tDELETE FROM estudiantes\n\t\t\t\t\tWHERE \n\t\t\t\t\t\tid_e = ?\n\t\t\t\t";
			values = [req.query.id];
			mysql.query(query, values).then(function (estudiante) {
				res.status(200).send(estudiante);
			}).catch(function (error) {
				res.status(404).send(error);
			});
		} // Listo
	};
};