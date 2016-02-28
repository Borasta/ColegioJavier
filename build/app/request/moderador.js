module.exports = mysql => {
	let query = ``;
	
	return {
		"docentes": {
			"get": (req, res) => {
				let tokenDecoded = req.data;
				switch( tokenDecoded.flag ) {
					case "a":
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
					        	UPPER(${req.query.type}_d) LIKE UPPER('%${req.query.data}%')
					        ORDER BY 
					        	nombres_d;
				    	`;
						break;

					case "b":
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
								UPPER(${req.query.type}_d) LIKE UPPER('%${req.query.data}%') AND NOT flag_d = 'b' AND NOT flag_d = 'a'
							ORDER BY
								nombres_d;
				        `;
						break;

					default:
						res.status(403).send("No tienes permiso");
						break;
				}
				console.log(query);
				mysql.query(query)
		        .then( docentes => {
		        	console.log(docentes)
					res.status(200).send(docentes);
		        }).catch(error => {
		        	res.status(404).send(error);
		        });
			},
			"post": (req, res) => {
				let tokenDecoded = req.data;
				switch( tokenDecoded.flag ) {
					case "a":
						query = `
				            INSERT INTO representantes VALUES ( 
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

					case "b":
						query = `
				            INSERT INTO representantes VALUES ( 
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
			},
			"put": (req, res) => {
				let tokenDecoded = req.data;
				query = `
		            UPDATE representantes SET
			            nombres_r = '${req.query.nombres}', 
			            apellidos_r = '${req.query.apellidos}', 
			            cedula_r = ${req.query.cedula}, 
			            genero_r = '${req.query.genero}',
			            user_r = '${req.query.genero}'
		            WHERE id_r = ${req.query.id} AND flag_d NOT 'b' AND flag_d NOT 'a'
		            ;
		        `;
				mysql.query(query)
		        .then( s => {
					res.status(200).send(s);
		        }).catch(error => {
		        	res.status(404).send(error);
		        });
			},
			"delete": (req, res) => {
				console.log("aqui toy")
				let tokenDecoded = req.data;
				query = `
		            DELETE FROM representantes WHERE id_r = ${req.query.id};
		        `;
				mysql.query(query)
		        .then( s => {
					res.status(200).send(s);
		        }).catch(error => {
		        	res.status(404).send(error);
		        });
			}
		},
		"alumnos": {
			"get": (req, res) => {
			
			},
			"post": (req, res) => {
			
			},
			"put": (req, res) => {
			
			},
			"delete": (req, res) => {
			
			}
		},
		"representantes": {
			"get": (req, res) => {
				let tokenDecoded = req.data;
				query = `
		            SELECT 
		            	id_r as id, 
		            	nombres_r as nombres, 
		            	apellidos_r as apellidos, 
		            	cedula_r as cedula, 
		            	genero_r as genero 
		            FROM representantes WHERE upper(${req.query.type}_r) LIKE upper('%${req.query.data}%') 
		            ORDER BY nombres_r;
		        `;
				mysql.query(query)
		        .then( representantes => {
		        	console.log(representantes)
					res.status(200).send(representantes);
		        }).catch(error => {
		        	res.status(404).send(error);
		        });
			},
			"post": (req, res) => {
				let tokenDecoded = req.data;
				query = `
		            INSERT INTO representantes VALUES ( 
			            null, 
			            '${req.body.nombres}', 
			            '${req.body.apellidos}', 
			            ${req.body.cedula}, 
			            '${req.body.genero}' 
		            );
		        `;
				mysql.query(query)
		        .then( s => {
					res.status(200).send(s);
		        }).catch(error => {
		        	res.status(404).send(error);
		        });
			},
			"put": (req, res) => {
				let tokenDecoded = req.data;
				query = `
		            UPDATE representantes SET
			            nombres_r = '${req.query.nombres}', 
			            apellidos_r = '${req.query.apellidos}', 
			            cedula_r = ${req.query.cedula}, 
			            genero_r = '${req.query.genero}' 
		            WHERE id_r = ${req.query.id}
		            ;
		        `;
				mysql.query(query)
		        .then( s => {
					res.status(200).send(s);
		        }).catch(error => {
		        	res.status(404).send(error);
		        });
			},
			"delete": (req, res) => {
				console.log("aqui toy")
				let tokenDecoded = req.data;
				query = `
		            DELETE FROM representantes WHERE id_r = ${req.query.id};
		        `;
				mysql.query(query)
		        .then( s => {
					res.status(200).send(s);
		        }).catch(error => {
		        	res.status(404).send(error);
		        });
			}
		},
		"materias": {
			"get": (req, res) => {
			
			},
			"post": (req, res) => {
			
			},
			"put": (req, res) => {
			
			},
			"delete": (req, res) => {
			
			}
		},
		"horarios": {
			"get": (req, res) => {
			
			},
			"post": (req, res) => {
			
			},
			"put": (req, res) => {
			
			},
			"delete": (req, res) => {
			
			}
		},
		"cursos": {
			"get": (req, res) => {
			
			},
			"post": (req, res) => {
			
			},
			"put": (req, res) => {
			
			},
			"delete": (req, res) => {
			
			}
		}
	}
}