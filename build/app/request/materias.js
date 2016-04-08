module.exports = mysql => {
	let query = ``;
	
	return {
		"get": (req, res) => {
			let tokenDecoded = req.data;
			req.query.data = req.query.data || '';
			let values = [];
			switch( tokenDecoded.flag ) {
				case "a":
				case "b": {
					query = `
							SELECT
								id_m AS id,
								nombre_m AS nombre
							FROM
								materias
							WHERE
								UPPER(materias.nombre_m) LIKE UPPER(?) 
							ORDER BY
								nombre_m;
				        `;
					values = [
						`%${req.query.data}%`
					];
					break;
				}

				case "c": {
					query = `
							SELECT 
								materias.id_m,
								materias.nombre_m as materia
								FROM docentes INNER JOIN docente_materia
									ON docentes.id_d = docente_materia.id_d INNER JOIN cursos
									ON docente_materia.id_dm = cursos.id_dm INNER JOIN estudiantes
									ON cursos.id_e = estudiantes.id_e INNER JOIN notas
									ON cursos.id_c = notas.id_c INNER JOIN grados
									ON estudiantes.id_gra = grados.id_gra INNER JOIN materias
									ON docente_materia.id_m = materias.id_m
							WHERE 
								docentes.id_d = ? 
								AND grados.id_gra = ?
								AND (SELECT count(*) FROM anio) = notas.id_anio
							ORDER BY nombre_m;
				        `;
					values = [
						tokenDecoded.id,
						req.query.id_gra
					];
					break;
				}

				default:
					res.status(403).send("No tienes permiso");
					break;
			}
			mysql.query(query, values)
				 .then( materias => {
					 res.status(200).send(materias);
				 }).catch(error => {
				res.status(404).send(error);
			});
		}, // Listo
		"post": (req, res) => {
			let tokenDecoded = req.data;
			let values = [];
			switch( tokenDecoded.flag ) {
				case "a":
				case "b":
					query = `
							INSERT INTO
								materias
							VALUES(
								null,
								?
							)
				        `;
					values = [
						req.body.nombre
					];
					break;

				default:
					res.status(403).send("No tienes permiso");
					break;
			}
			mysql.query(query, values)
				 .then( grupo => {
					 res.status(200);
				 })
				 .catch(error => {
					 res.status(404).send(error);
				 });
		}, // Listo
		"put": (req, res) => {
			let tokenDecoded = req.data;
			var values = [];
			switch( tokenDecoded.flag ) {
				case "a":
				case "b":
					query = `
				            UPDATE materias SET
					            nombre_m = ?
				            WHERE id_m = ?
				        `;
					values = [
						req.body.nombre,
						req.body.id
					];
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
				        	DELETE FROM materias 
				        	WHERE id_m = ?
				    	`;
					values = [
						req.query.id_m
					];
					break;

				default:
					res.status(403).send("No tienes permiso");
					break;
			}
			mysql.query(query, values)
				 .then( materia => {
					 res.status(200);
				 }).catch(error => {
				res.status(404).send(error);
			});
		} // Listo
	}
};