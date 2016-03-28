module.exports = mysql => {
	let query = ``;
	
	return {
		"get": (req, res) => {
			let tokenDecoded = req.data;
			let values = [
				tokenDecoded.id
			];
			switch( tokenDecoded.type ) {
				// Si somos estudiantes nos retorna nuestras notas,
				case "e": {
					query= `
							SELECT
								materias.nombre_m as materia,
								docentes.nombres_d nombres,
								docentes.apellidos_d apellidos,
								notas.lapso1 as lapso1,
								notas.lapso2 as lapso2,
								notas.lapso3 as lapso3,
								CAST((notas.lapso1 + notas.lapso2 + notas.lapso3) / 3 as DECIMAL(4, 2) ) as promedio,
								anio.anio as anio
							FROM estudiantes INNER JOIN cursos
								ON estudiantes.id_e = cursos.id_e       INNER JOIN docente_materia
								ON cursos.id_dm = docente_materia.id_dm INNER JOIN docentes
								ON docente_materia.id_d = docentes.id_d INNER JOIN materias
								ON docente_materia.id_m = materias.id_m INNER JOIN notas
								ON cursos.id_c = notas.id_c             INNER JOIN anio
								ON notas.id_anio = anio.id_anio
							WHERE estudiantes.id_e = ?
							ORDER BY anio;
						`;
					values = [
						tokenDecoded.id
					];
					mysql.query(query, values)
						 .then( notas => {
							 if( notas.length >= 1 ) {
								 res.status(200).send(notas);
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
						// Si somos admin o moderador, buscamos entre todas las notas
						case "a":
						case "b": {
							query= `
									SELECT
										estudiantes.nombres_e nombres,
										estudiantes.apellidos_e apellidos,
										materias.nombre_m as materia,
										notas.lapso1 as lapso1,
										notas.lapso2 as lapso2,
										notas.lapso3 as lapso3,
										CAST((notas.lapso1 + notas.lapso2 + notas.lapso3) / 3 as DECIMAL(4, 2) ) as promedio,
										anio.anio as anio
									FROM estudiantes INNER JOIN cursos
										ON estudiantes.id_e = cursos.id_e       INNER JOIN docente_materia
										ON cursos.id_dm = docente_materia.id_dm INNER JOIN docentes
										ON docente_materia.id_d = docentes.id_d INNER JOIN materias
										ON docente_materia.id_m = materias.id_m INNER JOIN notas
										ON cursos.id_c = notas.id_c             INNER JOIN anio
										ON notas.id_anio = anio.id_anio
									WHERE 
										UPPER(estudiantes.${req.query.type}_e) LIKE UPPER(?)
									ORDER BY 
										nombres_e;
								`;
							values = [
								`%${req.query.data}%`
							];
							break;

						}
						// Si somos docentes normales buscamos nuestros
						// estudiantes
						case "c": {
							query= `
									SELECT
										estudiantes.nombres_e nombres,
										estudiantes.apellidos_e apellidos,
										materias.nombre_m as materia,
										notas.lapso1 as lapso1,
										notas.lapso2 as lapso2,
										notas.lapso3 as lapso3,
										CAST((notas.lapso1 + notas.lapso2 + notas.lapso3) / 3 as DECIMAL(4, 2) ) as promedio
									FROM estudiantes INNER JOIN cursos
										ON estudiantes.id_e = cursos.id_e       INNER JOIN docente_materia
										ON cursos.id_dm = docente_materia.id_dm INNER JOIN docentes
										ON docente_materia.id_d = docentes.id_d INNER JOIN materias
										ON docente_materia.id_m = materias.id_m INNER JOIN notas
										ON cursos.id_c = notas.id_c             INNER JOIN anio
										ON notas.id_anio = anio.id_anio
									WHERE 
										UPPER(docentes.${req.query.type}_d) LIKE UPPER(?)
										AND (SELECT count(*) FROM anio) = notas.id_anio
									ORDER BY 
										nombres_e;
								`;
							values = [
								`%${req.query.data}%`
							];
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
		}, // Listo
		"post": (req, res) => {
			let tokenDecoded = req.data;
			let values = [
				tokenDecoded.id
			];
			switch( tokenDecoded.flag ) {
				// Si somos admin o moderador, modificamos las nota del alumno que nos pasaron
				case "a":
				case "b": {
					query = `
							SELECT
								estudiantes.nombres_e nombres,
								estudiantes.apellidos_e apellidos,
								materias.nombre_m as materia,
								notas.lapso1 as lapso1,
								notas.lapso2 as lapso2,
								notas.lapso3 as lapso3,
								CAST((notas.lapso1 + notas.lapso2 + notas.lapso3) / 3 as DECIMAL(4, 2) ) as promedio,
								anio.anio as anio
							FROM estudiantes INNER JOIN cursos
								ON estudiantes.id_e = cursos.id_e       INNER JOIN docente_materia
								ON cursos.id_dm = docente_materia.id_dm INNER JOIN docentes
								ON docente_materia.id_d = docentes.id_d INNER JOIN materias
								ON docente_materia.id_m = materias.id_m INNER JOIN notas
								ON cursos.id_c = notas.id_c             INNER JOIN anio
								ON notas.id_anio = anio.id_anio
							WHERE 
								UPPER(estudiantes.${req.query.type}_e) LIKE UPPER(?)
							ORDER BY 
								nombres_e;
						`;
					values = [
						`%${req.query.data}%`
					];
					break;

				}
				// Si somos docentes normales buscamos nuestros
				// estudiantes
				case "c":
				{
					query = `
						UPDATE notas 
						SET	
							lapso1 = ?,
							lapso2 = ?,
							lapso3 = ?
						WHERE id_c = ? AND id_anio = ?
					`;
					values = [
						req.body.lapso1,
						req.body.lapso2,
						req.body.lapso3,
						req.body.id_c,
						req.body.id_anio
					];
					break;
				}

				default:
				{
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
		},
		"put": (req, res) => {

		},
		"delete": (req, res) => {

		}
	}
};