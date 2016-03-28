module.exports = mysql => {
	let query = ``;
	
	return {
		"get": (req, res) => {
			let tokenDecoded = req.data;
			let values = [];
			switch( tokenDecoded.type ) {
				// Si somos estudiantes nos retorna nuestros horario,
				case "e": {
					query = `
							SELECT 
							docentes.nombres_d, 
							materias.nombre_m, 
							dias.dia, 
							horarios.hora_inicio, 
							horarios.hora_final
							FROM estudiantes
								INNER JOIN cursos
									ON estudiantes.id_e = cursos.id_e
								INNER JOIN docente_materia
									ON cursos.id_dm = docente_materia.id_dm
								INNER JOIN docentes
									ON docente_materia.id_d = docentes.id_d
								INNER JOIN materias
									ON docente_materia.id_m = materias.id_m
								INNER JOIN horarios
									ON docente_materia.id_dm = horarios.id_dm
								INNER JOIN dias
									ON horarios.id_dia = dias.id_dia
								INNER JOIN notas
									ON cursos.id_c = notas.id_c
							WHERE estudiantes.id_e = ? 
								AND (SELECT count(*) FROM anio) = notas.id_anio
							ORDER BY dias.id_dia, horarios.id_h;
						`;
					values = [
						tokenDecoded.id
					];
					break;
				}

				// Si somos un docente verificamos que flag tenemos
				case "d": {
					switch( tokenDecoded.flag ) {
						// Si somo admin o moderador hacemos una busqueda entre todos
						// los horarios
						case "a":
						case "b": {
							query = `
									SELECT 
										horarios.id_h as id,
										docentes.nombres_d as nombres,
										docentes.apellidos_d as apellidos,
										materias.nombre_m as materia,
										dias.dia,
										horarios.hora_inicio,
										horarios.hora_final
									FROM 
										horarios 
										INNER JOIN dias 
											ON horarios.id_dia = dias.id_dia
										INNER JOIN docente_materia
											ON horarios.id_dm = docente_materia.id_dm
										INNER JOIN materias
											ON docente_materia.id_m = materias.id_m
										INNER JOIN docentes
											ON docente_materia.id_d = docentes.id_d
									WHERE 
										UPPER(${req.query.type}) LIKE UPPER(?)
									ORDER BY 
										nombres_d;
								`;
							values = [
								`%${req.query.data}%`
							];
							console.log(values);
							break;
						}

						// Si somos un docente normal retornamos nuestro horario
						case "c": {
							query = `
									SELECT 
									materias.nombre_m, 
									dias.dia, 
									horarios.hora_inicio, 
									horarios.hora_final
									FROM docentes INNER JOIN docente_materia
										ON docentes.id_d = docente_materia.id_d
									  INNER JOIN materias
										ON docente_materia.id_m = materias.id_m
									  INNER JOIN horarios
										ON docente_materia.id_dm = horarios.id_dm
									  INNER JOIN dias
										ON horarios.id_dia = dias.id_dia
									WHERE docentes.id_d = ?
									ORDER BY dias.id_dia, horarios.id_h;
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
					break;
				}

				default: {
					res.status(403).send("No tienes permiso");
					break;
				}
			}

			mysql.query(query, values)
				 .then( horarios => {
					 res.status(200).send(horarios);
				 })
				 .catch(error => {
					 res.status(404).send(error);
				 });

		}, // Listo
		"post": (req, res) => {
			/*
			 * Parametros:
			 * 	type: Hace referencia a por que parametro se hara la busqueda,
			 * 		  si por nombre de materia, docente o apellido.
			 * 		  Ej:
			 * 		  	nombre_m	materia
			 * 		  	nombres_d	nombre de docente
			 * 		  	apellidos_d	apellido de docente
			 *
			 * 	data: Hace referencia al valor de la busqueda, puede ser
			 * 		  el nombre de la materia, del docente o el apellido.
			 */
			let tokenDecoded = req.data;
			let values = [];
			switch( tokenDecoded.flag ) {
				case "a":
				case "b":
					query = `
				        	INSERT INTO horarios VALUES (
				        		null,
				        		?,
				        		?,
				        		?,
				        		?
				        	)
				    	`;
					values = [
						req.body.id_dm,
						req.body.id_dia,
						req.body.hora_inicio,
						req.body.hora_final
					];
					break;

				default:
					res.status(403).send("No tienes permiso");
					break;
			}
			mysql.query(query, values)
				 .then( horario => {
					 res.status(200);
				 }).catch(error => {
				res.status(404).send(error);
			});
		}, // Listo
		"put": (req, res) => {
			/*
			 * Parametros:
			 * 	type: Hace referencia a por que parametro se hara la busqueda,
			 * 		  si por nombre de materia, docente o apellido.
			 * 		  Ej:
			 * 		  	nombre_m	materia
			 * 		  	nombres_d	nombre de docente
			 * 		  	apellidos_d	apellido de docente
			 *
			 * 	data: Hace referencia al valor de la busqueda, puede ser
			 * 		  el nombre de la materia, del docente o el apellido.
			 */
			let tokenDecoded = req.data;
			let values = [];
			switch( tokenDecoded.flag ) {
				case "a":
				case "b":
					query = `
				        	UPDATE horarios SET
				        		id_dm = ?,
				        		id_dia = ?,
				        		hora_inicio = ?,
				        		hora_final = ?
				        	WHERE id_h = ?
				    	`;
					values = [
						req.query.id_dm,
						req.query.id_dia,
						req.query.hora_inicio,
						req.query.hora_final,
						req.query.id_h
					];
					break;

				default:
					res.status(403).send("No tienes permiso");
					break;
			}
			mysql.query(query, values)
				 .then( horario => {
					 res.status(200);
				 }).catch(error => {
				res.status(404).send(error);
			});
		}, // Listo
		"delete": (req, res) => {
			/*
			 * Parametros:
			 * 	type: Hace referencia a por que parametro se hara la busqueda,
			 * 		  si por nombre de materia, docente o apellido.
			 * 		  Ej:
			 * 		  	nombre_m	materia
			 * 		  	nombres_d	nombre de docente
			 * 		  	apellidos_d	apellido de docente
			 *
			 * 	data: Hace referencia al valor de la busqueda, puede ser
			 * 		  el nombre de la materia, del docente o el apellido.
			 */
			let tokenDecoded = req.data;
			let values = [];
			switch( tokenDecoded.flag ) {
				case "a":
				case "b":
					query = `
				        	DELETE FROM horarios 
				        	WHERE id_h = ?
				    	`;
					values = [
						req.query.id_h
					];
					break;

				default:
					res.status(403).send("No tienes permiso");
					break;
			}
			mysql.query(query, values)
				 .then( horario => {
					 res.status(200);
				 }).catch(error => {
				res.status(404).send(error);
			});
		} // Listo
	}
};