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
								grupos.nombre_gru as nombre, 
								grupos.descripcion_gru as descripcion
							FROM estudiantes INNER JOIN miembros
								ON estudiantes.id_e = miembros.id_e INNER JOIN grupos
								ON miembros.id_gru = grupos.id_gru
							WHERE estudiantes.id_e = ?;
						`;
					values = [
						tokenDecoded.id
					];
					break;
				}

				// Si somos un docente verificamos que flag tenemos
				case "d": {
					switch( tokenDecoded.flag ) {
						// Si somos admin o moderador hacemos una busqueda entre todos los grupos
						case "a":
						case "b": {
							query = `
									SELECT 
										docentes.nombres_d as lider,
										grupos.nombre_gru as nombre, 
										grupos.descripcion_gru as descripcion
									FROM docentes INNER JOIN lideres
										ON docentes.id_d = lideres.id_d INNER JOIN grupos
										ON lideres.id_gru = grupos.id_gru
									WHERE upper(${req.query.type}_gru) LIKE upper(?) 
		            				ORDER BY nombre_gru;
								`;
							values = [
								`%${req.query.data}%`
							];
							break;
						}

						// Si somos un docente normal retornamos nuestro grupos
						case "c": {
							query = `
									SELECT 
										grupos.nombre_gru as nombre, 
										grupos.descripcion_gru as descripcion
									FROM docentes INNER JOIN lideres
										ON docentes.id_d = lideres.id_d INNER JOIN grupos
										ON lideres.id_gru = grupos.id_gru
									WHERE docentes.id_d = ?
		            				ORDER BY nombre_gru;
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