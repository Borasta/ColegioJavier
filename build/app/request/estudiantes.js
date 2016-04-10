import moment from "moment";

module.exports = mysql => {
	let query = ``;
	
	return {
		"get": (req, res) => {
			let tokenDecoded = req.data;
			let values = [
				tokenDecoded.id
			];
			switch( tokenDecoded.type ) {
				// Si somos estudiantes nos retorna nuestros datos,
				// y los de nuestros padres
				case "e": {
					let data = {};
					query = `
							SELECT 
								estudiantes.nombres_e as nombres,
								estudiantes.apellidos_e as apellidos,
								estudiantes.fecha_nacimiento as edad,
								estudiantes.cedula_e as cedula,
								estudiantes.genero_e as genero,
								estudiantes.direccion_e as direccion,
								estudiantes.user_e as usuario,
								grados.grado as grado,
								grados.seccion as seccion
							FROM estudiantes INNER JOIN grados
								ON estudiantes.id_gra = grados.id_gra
							WHERE estudiantes.id_e = ?;
						`;
					mysql.query(query, values)
						 .then( estudiante => {
							 if( estudiante.length == 1 ) {
								 data.estudiante = estudiante[0];
								 data.estudiante.edad = moment(data.estudiante.edad).fromNow();
								 query = `
										SELECT representantes.nombres_r as nombres,
										representantes.apellidos_r as apellidos,
										representantes.cedula_r as cedula,
										representantes.genero_r as genero
										FROM estudiantes                          INNER JOIN familias
											ON estudiantes.id_e = familias.id_e   INNER JOIN representantes
											ON familias.id_r = representantes.id_r
										WHERE estudiantes.id_e = ?;
									`;
								 mysql.query(query, values)
									  .then( representantes => {
										  if( representantes.length >= 1 ) {
											  data.representantes = representantes;
											  res.status(200).send(data);
										  }
									  }).catch(error => {
									 res.status(404).send(error);
								 });
							 }
						 })
						 .catch(error => {
							 res.status(404).send(error);
						 });
					break;
				}

				// Si somos un docente verificamos que flag tenemos
				case "d": {
					switch( tokenDecoded.flag ) {
						// Si somos admin o moderador, buscamos entre todos los estudiantes
						case "a":
						case "b": {
							query = `
									SELECT 
										id_e as id,
										nombres_e as nombres,
										apellidos_e as apellidos,
										cedula_e as cedula,
										genero_e as genero,
										grado as grado,
										user_e as usuario,
										grados.seccion as seccion
									FROM 
										estudiantes 
										INNER JOIN grados
											ON estudiantes.id_gra = grados.id_gra
									WHERE
										UPPER(grado) LIKE UPPER(?) OR 
										UPPER(nombres_e) LIKE UPPER(?) OR 
										UPPER(apellidos_e) LIKE UPPER(?) OR 
										cedula_e LIKE ? 
									ORDER BY 
										nombres_e;
								`;
							values = [
								`%${req.query.data}%`,
								`%${req.query.data}%`,
								`%${req.query.data}%`,
								`%${req.query.data}%`
							];
							break;

						}
						// Si somos docentes normales buscamos nuestros estudiantes
						case "c": {
							query = `
								SELECT 
									notas.id_c,
									notas.id_anio,
									estudiantes.nombres_e as nombres,
									estudiantes.apellidos_e as apellidos,
									estudiantes.cedula_e as cedula,
									notas.lapso1 as 'lapso1',
									notas.lapso2 as 'lapso2',
									notas.lapso3 as 'lapso3',
									grados.grado as grado
								FROM docentes
								  INNER JOIN docente_materia
									ON docentes.id_d = docente_materia.id_d 
								  INNER JOIN cursos
									ON docente_materia.id_dm = cursos.id_dm 
								  INNER JOIN estudiantes
									ON cursos.id_e = estudiantes.id_e 
								  INNER JOIN notas
									ON cursos.id_c = notas.id_c 
								  INNER JOIN grados
									ON estudiantes.id_gra = grados.id_gra 
								  INNER JOIN materias
									ON docente_materia.id_m = materias.id_m
								WHERE 
									docentes.id_d = ? 
# 									AND materias.id_m = ?
# 									AND grados.id_gra = ?
									AND (SELECT count(*) FROM anio) = notas.id_anio
								ORDER BY grados.grado, grados.seccion, estudiantes.cedula_e;
							`;
							values.push(req.query.id_m);
							values.push(req.query.id_gra);
							console.log(values);
							break;
						}

						default: {
							res.status(403).send("No tienes permiso");
							break
						}
					}
					mysql.query(query, values)
						 .then( estudiantes => {
							 if( estudiantes.length >= 1 ) {
								 res.status(200).send(estudiantes);
							 }
						 })
						 .catch(error => {
							 res.status(404).send(error);
						 });
					break;
				}

				default: {
					res.status(403).send("No tienes permiso");
					break;
				}

			}
		},	// Listo
		"post": (req, res) => {
			let values = [];
			query = `
					INSERT INTO estudiantes VALUES (
						null,
						?,
						?,
						?,
						?,
						?,
						?,
						?,
						?,
						?,
						?
					);
				`;
			values = [
				req.body.id_gra,
				req.body.nombres,
				req.body.apellidos,
				req.body.cedula,
				req.body.fecha_nacimiento,
				req.body.genero,
				req.body.direccion,
				req.body.user,
				req.body.pass,
				'c'
			];

			mysql.query(query, values)
				 .then( estudiante => {
					 res.status(200).send(estudiante);
				 })
				 .catch(error => {
					 res.status(404).send(error);
				 });

		}, // Listo
		"put": (req, res) => {
			let tokenDecoded = req.data;
			let values = [];
			var newPass = req.query.pass ? `, pass_d = '${req.query.pass}'` : ``;
			query = `
					UPDATE estudiantes SET 
						id_gra = ?,
						nombres_e = ?,
						apellidos_e = ?,
						cedula_e = ?,
						fecha_nacimiento = ?,
						genero_e = ?,
						direccion_e = ?,
						user_e = ?
						${newPass}
					WHERE 
						id_e = ?
					
				`;
			values = [
				req.query.id_gra,
				req.query.nombres,
				req.query.apellidos,
				req.query.cedula,
				req.query.fecha_nacimiento,
				req.query.genero,
				req.query.direccion,
				req.query.user,
				tokenDecoded.id
			];

			mysql.query(query, values)
				 .then( estudiante => {
					 res.status(200).send(estudiante);
				 })
				 .catch(error => {
					 res.status(404).send(error);
				 });

		}, // Listo
		"delete": (req, res) => {
			let tokenDecoded = req.data;
			let values = [];
			query = `
					DELETE FROM estudiantes
					WHERE 
						id_e = ?
				`;
			values = [
				req.query.id
			];
			mysql.query(query, values)
				 .then( estudiante => {
					 res.status(200).send(estudiante);
				 })
				 .catch(error => {
					 res.status(404).send(error);
				 });

		} // Listo
	}
};