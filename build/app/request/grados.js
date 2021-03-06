module.exports = mysql => {
	let query = ``;
	
	return {
		"get": (req, res) => {
			let tokenDecoded = req.data;
			let values = [];
			switch( tokenDecoded.type ) {
				// Si somos estudiantes nos retorna nuestros grupos,
				case "e": {
					query = `
							SELECT 
								grados.grado,
								grados.seccion
							FROM estudiantes INNER JOIN grados
								ON estudiantes.id_gra = grados.id_gra
							WHERE estudiantes.id_e = ?;
						`;
					values = [
						tokenDecoded.id
					];
					mysql.query(query, values)
						 .then( grado => {
							 if( grado.length >= 1 ) {
								 res.status(200).send(grado[0]);
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
						// Si somos admin o moderador hacemos una busqueda entre todos los grupos
						case "a":
						case "b": {
							query = `
								SELECT DISTINCT
								  grado
								FROM grados
							`;
							break;
						}

						// Si somos un docente normal retornamos los grados en los que damos clases
						case "c": {
							query = `
									SELECT DISTINCT 
										grado
									FROM docentes
									  INNER JOIN docente_materia
										ON docentes.id_d = docente_materia.id_d
									  INNER JOIN cursos 
									  	ON docente_materia.id_dm = cursos.id_dm
									  INNER JOIN estudiantes
									  	ON cursos.id_e = estudiantes.id_e
									  INNER JOIN grados
									  	ON estudiantes.id_gra = grados.id_gra
									  INNER JOIN notas
									  	ON cursos.id_c = notas.id_c
									WHERE 
										docentes.id_d = ? 
										AND (SELECT count(*) FROM anio) = notas.id_anio
									ORDER BY grado
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
				 .then( grupos => {
					 if( grupos.length >= 1 ) {
						 console.log(grupos);
						 res.status(200).send(grupos);
					 }
				 })
				 .catch(error => {
					 res.status(404).send(error);
				 });

		},	// Listo
		"post": (req, res) => {
			let values = [];
			query = `
		            INSERT INTO grupos VALUES ( 
			            null, 
			            ?, 
			            ? 
		            );
		        `;
			values = [
				req.body.nombre,
				req.body.descripcion
			];
			mysql.query(query)
				 .then( grupo => {
					 res.status(200).send(grupo);
				 })
				 .catch(error => {
					 res.status(404).send(error);
				 });
		}, // Listo
		"put": (req, res) => {
			let values = [];
			query = `
		            UPDATE grupos SET
			            nombre_gru = ?, 
			            descripcion_gru = ? 
		            ;
		        `;
			values = [
				req.query.nombre,
				req.query.descripcion
			];
			mysql.query(query, values)
				 .then( grupo => {
					 res.status(200).send(grupo);
				 })
				 .catch(error => {
					 res.status(404).send(error);
				 });
		}, // Listo
		"delete": (req, res) => {
			let values = [];
			query = `
		            DELETE FROM grupos
		            WHERE
		            	id_gru = ? 
		        `;
			values = [
				req.query.id
			];
			mysql.query(query, values)
				 .then( grupo => {
					 res.status(200).send(grupo);
				 })
				 .catch(error => {
					 res.status(404).send(error);
				 });
		} // Listo
	}
};