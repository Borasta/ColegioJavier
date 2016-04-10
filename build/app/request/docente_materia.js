module.exports = mysql => {
	let query = ``;
	
	return {
		"get": (req, res) => {
			let tokenDecoded = req.data;
			let values = [];
			switch( tokenDecoded.flag ) {
				// Si somos admins retornamos cualquier docente admin o moderador
				// Si somos moderador retornamos cualquier docente
				case "a":
				case "b": {
					query = `
							SELECT DISTINCT 
								docente_materia.id_dm as id,
								nombres_d as nombres,
								apellidos_d as apellidos,
								nombre_m as materia
							FROM
								docente_materia 
								  INNER JOIN docentes 
									ON docente_materia.id_d = docentes.id_d
								  INNER JOIN materias
								    ON docente_materia.id_m = materias.id_m
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
						`%${req.query.data}%`,
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
				case "a":
				case "b": {
					query = `
				    		INSERT INTO docente_materia
				    		VALUES (
				    		  	null,
				    		  	(
				    		  		SELECT id_d FROM docentes 
				    		  		WHERE cedula_d = ? AND 
				    		  		(NOT flag_d = 'a' AND NOT flag_d = 'b')
				    		  	),
				    		  	?
				    		);
				        `;
					let values = [
						req.body.cedula,
						req.body.id_m
					];

					mysql.query(query, values)
						.then( s => {
							query = `
								INSERT INTO horarios
								VALUES (
									null,
									?,
									?,
									?,
									?
								);
							`;
							values = [
								s.insertId,
								req.body.id_dia,
								req.body.hora_inicio,
								req.body.hora_final
							];

							mysql.query(query, values)
								.then( h => {
									console.log(h);
									res.status(200).send(h);
								}).catch(error => {
								console.log(mysql.query);
								res.status(404).send(error);
							});
						}).catch(error => {
							console.log(mysql.query);
							res.status(404).send(error);
					});
					break;
				}

				default:
					res.status(403).send("No tienes permiso");
					break;
			}
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