module.exports = mysql => {
	let query = ``;
	
	return {
		"get": (req, res) => {
			let tokenDecoded = req.data;
			let values = [];
			switch( tokenDecoded.flag ) {
				// Si somos admins retornamos cualquier docente admin o moderador
				case "a": {
					query = `
							SELECT
								id_d AS id,
								nombres_d AS nombres,
								apellidos_d AS apellidos,
								cedula_d AS cedula,
								genero_d AS genero,
								user_d AS usuario
							FROM
								docentes
							WHERE
								(
									UPPER(nombres_d) LIKE UPPER(?) OR 
									UPPER(apellidos_d) LIKE UPPER(?) OR 
									cedula_d LIKE ? 
								)
							ORDER BY
								nombres_d;
				        `;
					values = [
						`%${req.query.data}%`,
						`%${req.query.data}%`,
						`%${req.query.data}%`
					];
					break;
				}

				// Si somos moderador retornamos cualquier docente
				case "b": {
					query = `
							SELECT
								id_d AS id,
								nombres_d AS nombres,
								apellidos_d AS apellidos,
								cedula_d AS cedula,
								genero_d AS genero,
								user_d AS usuario
							FROM
								docentes
							WHERE
								(
									UPPER(nombres_d) LIKE UPPER(?) OR 
									UPPER(apellidos_d) LIKE UPPER(?) OR 
									cedula_d LIKE ? 
								)
								AND NOT flag_d = 'b' 
								AND NOT flag_d = 'a'
								AND NOT id_d = ?
							ORDER BY
								nombres_d;
				        `;
					values = [
						`%${req.query.data}%`,
						`%${req.query.data}%`,
						`%${req.query.data}%`,
						tokenDecoded.id
					];
					break;
				}

				// Si somos docentes retornamos nuestros datos
				case "c": {
					query = `
							SELECT docentes.nombres_d as nombres,
								docentes.apellidos_d as apellidos,
								docentes.cedula_d as cedula,
								docentes.genero_d as genero,
								docentes.user_d as usuario
							FROM docentes
							WHERE docentes.id_d = ?;
						`;
					values = [
						tokenDecoded.id
					];
					break;
				}

				default:
					res.status(403).send("No tienes permiso");
					break;
			}
			mysql.query(query, values)
				 .then( docentes => {
					 if( tokenDecoded.flag == "c" )
						 res.status(200).send(docentes[0]);
					 else
						 res.status(200).send(docentes);
				 }).catch(error => {
				res.status(404).send(error);
			});
		}, // Listo
		"post": (req, res) => {
			let tokenDecoded = req.data;
			switch( tokenDecoded.flag ) {
				case "a": {
					query = `
				            INSERT INTO docentes VALUES ( 
					            null, 
					            '${req.body.nombres}', 
					            '${req.body.apellidos}', 
					            ${req.body.cedula}, 
					            '${req.body.genero}',
					            '${req.body.user}',
					            '${req.body.pass}',
					            '${req.body.flag}'
				            );
				        `;
					break;
				}

				case "b": {
					query = `
				            INSERT INTO docentes VALUES ( 
					            null, 
					            '${req.body.nombres}', 
					            '${req.body.apellidos}', 
					            ${req.body.cedula}, 
					            '${req.body.genero}',
					            '${req.body.user}',
					            '${req.body.pass}',
					            'c'
				            );
				        `;
					break;
				}

				default:
					res.status(403).send("No tienes permiso");
					break;
			}
			mysql.query(query)
				 .then( s => {
					 res.status(200).send(s);
				 }).catch(error => {
				res.status(404).send(error);
			});
		}, // Listo
		"put": (req, res) => {
			let tokenDecoded = req.data;
			var newPass = req.query.pass ? `, pass_d = '${req.query.pass}'` : ``;
			switch( tokenDecoded.flag ) {
				case "a": {
					query = `
				            UPDATE docentes SET
					            nombres_d = '${req.query.nombres}', 
					            apellidos_d = '${req.query.apellidos}', 
					            cedula_d = ${req.query.cedula}, 
					            genero_d = '${req.query.genero}',
					            user_d = '${req.query.usuario}'
					            ${newPass},
					            flag_d = '${req.query.flag}'
				            WHERE id_d = ${req.query.id}
				            ;
				        `;
					break;
				}

				case "b": {
					query = `
				            UPDATE docentes SET
					            nombres_d = '${req.query.nombres}', 
					            apellidos_d = '${req.query.apellidos}', 
					            cedula_d = ${req.query.cedula}, 
					            genero_d = '${req.query.genero}',
					            user_d = '${req.query.usuario}'
					            ${newPass}
				            WHERE id_d = ${req.query.id} 
				            AND NOT flag_d = 'b' 
				            AND NOT flag_d = 'a'
				            ;
				        `;
					break;
				}

				default:
					res.status(403).send("No tienes permiso");
					break;
			}
			mysql.query(query)
				 .then( s => {
					 res.status(200).send(s);
				 }).catch(error => {
				res.status(404).send(error);
			});
		}, // Listo
		"delete": (req, res) => {
			let tokenDecoded = req.data;
			switch( tokenDecoded.flag ) {
				case "a":
					query = `
				            DELETE FROM docentes WHERE id_d = ${req.query.id} 
				            AND NOT id_d = ${tokenDecoded.id};
				        `;
					break;

				case "b":
					query = `
							DELETE FROM docentes
				            WHERE id_d = ${req.query.id} 
				            AND NOT id_d = ${tokenDecoded.id} 
				            AND NOT flag_d = 'b' 
				            AND NOT flag_d = 'a'
				            ;
				        `;
					break;

				default:
					res.status(403).send("No tienes permiso");
					break;
			}
			mysql.query(query)
				 .then( s => {
					 res.status(200).send(s);
				 }).catch(error => {
				res.status(404).send(error);
			});
		} // Listo
	}
};